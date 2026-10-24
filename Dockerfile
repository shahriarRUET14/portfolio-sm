# syntax=docker/dockerfile:1

# Multi-stage build: each stage does one job, and only the last stage
# becomes the final image. Step-by-step guide: docs/DOCKER.md

ARG NODE_VERSION=24-alpine

# ---- base: settings shared by every stage ----
FROM node:${NODE_VERSION} AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---- deps: install node_modules exactly as pinned in yarn.lock ----
FROM base AS deps
# Copy only the manifests first so this layer is reused until they change.
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --non-interactive

# ---- builder: create the production build ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Values baked into the pages during the build (public, not secrets).
# Runtime secrets such as RESEND_API_KEY are never passed here.
ARG NEXT_PUBLIC_SITE_URL
ARG GOOGLE_SITE_VERIFICATION
ENV NEXT_OUTPUT=standalone
# Build, then drop sharp's glibc files: Yarn 1 installs both the glibc and
# musl variants, but Alpine only ever loads musl (saves ~18 MB).
RUN yarn build \
 && rm -rf .next/standalone/node_modules/@img/sharp-libvips-linux-* \
           .next/standalone/node_modules/@img/sharp-linux-*

# ---- runner: the small image that actually runs in production ----
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Run as an unprivileged user instead of root.
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# App files stay owned by root (read-only for the app user).
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# The only place the server writes to is its image-optimisation cache.
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache

USER nextjs
EXPOSE 3000

# Shell form, so $PORT is read when the check runs (it can be overridden).
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD \
  wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", "server.js"]
