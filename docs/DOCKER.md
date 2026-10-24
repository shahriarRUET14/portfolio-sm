# Docker দিয়ে Portfolio Containerize করা — Step-by-step Guide (বাংলা + English)

এই guide-এ আমরা এই Next.js portfolio-টাকে একটা **Docker image** বানাবো, সেটাকে **container** হিসেবে চালাবো, আর পথে পথে প্রতিটা line কেন লেখা হয়েছে সেটা বুঝবো। শেষে আপনি নিজে যেকোনো Node/Next.js project containerize করতে পারবেন।

> এই guide-এর সব সংখ্যা (build time, image size ইত্যাদি) এই project-এ, একটা Apple Silicon Mac-এ, Docker 29.7 দিয়ে আসলেই চালিয়ে মাপা। আপনার machine-এ একটু কম-বেশি হতে পারে।

---

## সূচিপত্র

- [0. আগে concept-গুলো বুঝি](#0-আগে-concept-গুলো-বুঝি)
- [1. Docker install ও verify](#1-docker-install-ও-verify)
- [2. কোন কোন file যোগ হয়েছে](#2-কোন-কোন-file-যোগ-হয়েছে)
- [3. Step 1 — standalone output](#3-step-1--standalone-output)
- [4. Step 2 — .dockerignore](#4-step-2--dockerignore)
- [5. Step 3 — Dockerfile line by line](#5-step-3--dockerfile-line-by-line)
- [6. Step 4 — Image build করা](#6-step-4--image-build-করা)
- [7. Step 5 — Container চালানো](#7-step-5--container-চালানো)
- [8. Step 6 — Environment variable: build-time বনাম runtime](#8-step-6--environment-variable-build-time-বনাম-runtime)
- [9. Step 7 — Docker Compose](#9-step-7--docker-compose)
- [10. Step 8 — যাচাই করা](#10-step-8--যাচাই-করা)
- [11. Step 9 — Apple Silicon বনাম server: multi-platform](#11-step-9--apple-silicon-বনাম-server-multi-platform)
- [12. Step 10 — Registry-তে push](#12-step-10--registry-তে-push)
- [13. Step 11 — একটা server-এ deploy](#13-step-11--একটা-server-এ-deploy)
- [14. Troubleshooting](#14-troubleshooting)
- [15. Cheatsheet](#15-cheatsheet)
- [16. নিজে চেষ্টা করুন](#16-নিজে-চেষ্টা-করুন)

---

## 0. আগে concept-গুলো বুঝি

### Docker কেন?

"আমার machine-এ তো চলে!" — এই সমস্যার সমাধান Docker। আপনার app চালাতে যা যা লাগে (Node version, OS library, `node_modules`, build output) সব একটা package-এ বন্দি করে ফেলা হয়। সেই package যেকোনো জায়গায় — আপনার Mac, একটা Linux VPS, AWS, Kubernetes — **হুবহু একইভাবে** চলে।

### মূল শব্দগুলো

| Term              | সহজ ভাষায়                                                                  | Analogy                          |
| ----------------- | --------------------------------------------------------------------------- | -------------------------------- |
| **Dockerfile**    | Image কীভাবে বানাতে হবে তার step-by-step instruction                        | রান্নার recipe                   |
| **Image**         | Build হয়ে যাওয়া, read-only একটা package (OS + Node + app)                 | রান্না করা খাবার, box-এ pack করা |
| **Container**     | Image থেকে চালু হওয়া একটা running process                                  | Box খুলে খাবার পরিবেশন           |
| **Layer**         | Dockerfile-এর প্রায় প্রতিটা instruction একটা layer বানায়; layer cache হয় | খাবারের প্রতিটা স্তর             |
| **Build context** | `docker build`-এর সময় Docker-কে যে folder পাঠানো হয় (এখানে `.`)           | রান্নাঘরে আনা উপকরণ              |
| **Registry**      | Image রাখার জায়গা (Docker Hub, GitHub Container Registry)                  | Warehouse                        |
| **Tag**           | Image-এর নাম + version, যেমন `shahriar-portfolio:local`                     | Label                            |

একটা Image থেকে অনেকগুলো Container চালানো যায় — যেমন একটা class থেকে অনেক object।

```
 Dockerfile ──docker build──▶ Image ──docker run──▶ Container (running app)
                               │
                               └──docker push──▶ Registry ──docker pull──▶ অন্য server
```

### Container আর Virtual Machine-এর পার্থক্য

VM পুরো একটা OS (kernel সহ) চালায় — ভারী, boot হতে সময় লাগে। Container host-এর kernel share করে, শুধু app আর তার library আলাদা রাখে — হালকা, এক সেকেন্ডের কম সময়ে চালু হয়। (Mac-এ Docker Desktop ভিতরে একটা ছোট Linux VM চালায়, কারণ container-এর জন্য Linux kernel লাগে।)

---

## 1. Docker install ও verify

**কী করছি:** Docker Desktop install করে নিশ্চিত হচ্ছি যে সব ঠিক আছে।

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/) download করে install করুন (Mac-এ Apple Silicon version)।
2. Docker Desktop app খুলুন — উপরের menu bar-এ তিমি (🐳) icon দেখা যাবে।
3. Terminal-এ check করুন:

```bash
docker version
docker compose version
docker run --rm hello-world
```

**যা দেখবেন:** `docker version`-এ **Client** আর **Server** দুটো অংশই থাকবে। `hello-world` চালালে "Hello from Docker!" message আসবে।

**ভুল হলে:** `Cannot connect to the Docker daemon` দেখালে Docker Desktop চালু নেই — app টা খুলে কয়েক সেকেন্ড অপেক্ষা করুন।

---

## 2. কোন কোন file যোগ হয়েছে

| File             | কাজ                                                                    |
| ---------------- | ---------------------------------------------------------------------- |
| `Dockerfile`     | Image বানানোর recipe (৪টা stage)                                       |
| `.dockerignore`  | কোন file build-এ পাঠানো হবে **না**                                     |
| `compose.yaml`   | এক command-এ build + run করার config                                   |
| `next.config.ts` | Docker build-এর সময় `standalone` output চালু করে                      |
| `.env.local`     | আপনার secret (যেমন `RESEND_API_KEY`) — git-এ যায় না, image-এও যায় না |
| `.env.example`   | কোন কোন variable লাগে তার তালিকা (value ছাড়া) — git-এ থাকে            |

Vercel deploy আগের মতোই চলবে — Docker-এর পরিবর্তনগুলো শুধু Docker build-এর সময় কাজ করে।

---

## 3. Step 1 — standalone output

`next.config.ts`-এ এই line:

```ts
output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
```

**কী করছে:** সাধারণ `next build`-এর output ধরে নেয় যে চালানোর সময় পুরো `node_modules` পাশে থাকবে। `output: 'standalone'` দিলে Next.js হিসাব করে দেখে (**output file tracing**) app চালাতে আসলে কোন কোন file লাগে, আর শুধু সেগুলো `.next/standalone/` folder-এ copy করে — সাথে একটা ছোট `server.js`। ফলে image অনেক ছোট হয়।

**কেন condition দিয়ে?** Vercel আর আপনার local `yarn start` আগের মতো default output-এই থাকুক। Dockerfile-এ আমরা `NEXT_OUTPUT=standalone` set করি, তাই শুধু Docker build-এ standalone হয়।

**নিজে দেখুন (optional):**

```bash
NEXT_OUTPUT=standalone yarn build
ls -a .next/standalone     # .  ..  .next  node_modules  package.json  server.js
```

> ⚠️ Standalone build `public/` আর `.next/static/` folder নিজে থেকে `.next/standalone/`-এ copy করে না (Next.js ধরে নেয় এগুলো CDN থেকে serve হবে)। ঠিক জায়গায় copy করে দিলে `server.js` নিজেই এগুলো serve করে — আলাদা web server (nginx) লাগে না। Dockerfile-এ আমরা ঠিক এটাই করবো।

> 🔒 লক্ষ্য করার মতো: project-এ `.env` বা `.env.production` নামের file থাকলে Next নিজেই সেটা standalone-এ copy করে। এজন্যই এই project-এ secret থাকে `.env.local`-এ (এটা copy হয় না), আর `.dockerignore` সব `.env*` file build থেকে বাদ রাখে।

Test শেষে সাধারণ build-এ ফিরে যেতে আবার `yarn build` চালান।

---

## 4. Step 2 — .dockerignore

**কী করছে:** `docker build .` চালালে পুরো folder (build context) Docker-এর কাছে পাঠানো হয়। `.dockerignore` বলে দেয় কোনগুলো পাঠানো হবে না।

**কেন জরুরি:**

1. **Speed:** `node_modules` (শত শত MB) আর `.git` না পাঠালে build দ্রুত হয়। এই project-এ context মাত্র **~456 KB**।
2. **Security:** `.env.local`-এ আপনার Resend API key আছে। Build context-এ গেলে সেটা image layer-এ ঢুকে যেতে পারে, আর image share করলে key-ও share হয়ে যায়।
3. **সঠিক build:** Local `node_modules` macOS-এর জন্য install করা; container Linux। Image-এর ভিতরে নতুন করে install করাই ঠিক।

গুরুত্বপূর্ণ line-গুলো (আসল file-এর মতোই, প্রতিটা comment আলাদা line-এ):

```gitignore
# container-এর ভিতরে নতুন করে install হবে
node_modules
# container-এর ভিতরে নতুন করে build হবে
.next
# secret কখনো image-এ নয়
.env
.env.*
# "!" মানে exception — example file রাখা যাবে
!.env.example
.git
# শুধু root-এর PDF; public/resume.pdf বাদ যায় না
*.pdf
```

> ⚠️ `.dockerignore`-এ comment লিখতে হয় আলাদা line-এ, line-এর একদম শুরুতে `#` দিয়ে। Pattern-এর পাশে `.env   # secret` লিখলে `# secret` অংশটাও pattern হয়ে যায় — তখন `.env` আর match করে না, আর secret image-এ ঢুকে যায়!

> 💡 `.dockerignore`-এ `*.pdf` শুধু root folder-এর file match করে। সব folder-এর জন্য লিখতে হতো `**/*.pdf`।

---

## 5. Step 3 — Dockerfile line by line

আমরা **multi-stage build** ব্যবহার করছি। প্রতিটা stage একটা কাজ করে, আর **শুধু শেষ stage**-টা final image হয়। Build tool, source code, dev dependency — কিছুই final image-এ যায় না।

```
┌──────────┐   ┌──────────┐   ┌───────────┐   ┌──────────┐
│   base   │──▶│   deps   │──▶│  builder  │──▶│  runner  │ ◀── এটাই final image
│ node:24  │   │ yarn     │   │ yarn build│   │ server.js│
│ alpine   │   │ install  │   │           │   │ (ছোট)    │
└──────────┘   └──────────┘   └───────────┘   └──────────┘
```

### 5.1 শুরু

```dockerfile
# syntax=docker/dockerfile:1
ARG NODE_VERSION=24-alpine
```

- `# syntax=...` — Dockerfile-এর সর্বশেষ stable syntax ব্যবহার করতে বলে (যেমন `RUN --mount` feature)।
- `ARG NODE_VERSION` — একটা variable। `FROM`-এর আগে declare করলে `FROM`-এ ব্যবহার করা যায়। পরে Node version বদলাতে শুধু এখানে বদলালেই হবে।

### 5.2 base stage

```dockerfile
FROM node:${NODE_VERSION} AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
```

- `FROM node:24-alpine` — Official Node.js image, **Alpine Linux**-এর উপর (খুব ছোট Linux distro)। এতে Node 24 আর Yarn 1.22.22 আগে থেকেই আছে — আমাদের `yarn.lock`-এর সাথে মেলে।
- `AS base` — stage-টার নাম। পরের stage-গুলো `FROM base` লিখে এখান থেকে শুরু করে।
- `WORKDIR /app` — এর পরের সব command `/app` folder-এ চলবে (folder না থাকলে তৈরি হবে)।
- `ENV NEXT_TELEMETRY_DISABLED=1` — Next.js-এর anonymous usage data পাঠানো বন্ধ।

### 5.3 deps stage — dependency install

```dockerfile
FROM base AS deps
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --non-interactive
```

- **`COPY package.json yarn.lock ./` আগে, বাকি code পরে — এটাই layer caching-এর মূল কৌশল।** Docker প্রতিটা layer cache করে। কোনো layer-এর input না বদলালে Docker সেটা আবার চালায় না। শুধু dependency file আগে copy করলে, আপনি যতক্ষণ dependency না বদলাচ্ছেন ততক্ষণ `yarn install` (সবচেয়ে ধীর step) cache থেকে আসে।
- `--mount=type=cache,...` — Yarn-এর download cache এক build থেকে পরের build-এ মনে রাখে, কিন্তু image-এ ঢোকায় না। Dependency বদলালেও সব package নতুন করে download হয় না।
- `--frozen-lockfile` — `yarn.lock` হুবহু মানবে; lockfile আর `package.json` না মিললে build fail করবে (চুপচাপ version বদলাবে না)। Production build-এ এটাই চাই।

> 💡 **`libc6-compat` কেন নেই?** অনেক Next.js Dockerfile-এ `RUN apk add libc6-compat` দেখবেন। Alpine `glibc` না, `musl` C library ব্যবহার করে। কিন্তু Yarn native package-গুলোর (যেমন image library `sharp`) musl version-ও install করে, আর Alpine-এ Node শুধু musl version load করে। তাই এই project-এ কোনো glibc shim লাগে না — আমরা line-টা সরিয়ে `--no-cache` build দিয়ে নিশ্চিত হয়েছি যে সব ঠিক চলে।

### 5.4 builder stage — production build

```dockerfile
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL
ARG GOOGLE_SITE_VERIFICATION
ENV NEXT_OUTPUT=standalone
RUN yarn build \
 && rm -rf .next/standalone/node_modules/@img/sharp-libvips-linux-* \
           .next/standalone/node_modules/@img/sharp-linux-*
```

- `COPY --from=deps` — আগের stage থেকে শুধু `node_modules` নিয়ে আসা।
- `COPY . .` — বাকি source code (`.dockerignore`-এ যা বাদ দেওয়া, তা ছাড়া)।
- `ARG NEXT_PUBLIC_SITE_URL`, `ARG GOOGLE_SITE_VERIFICATION` — **build argument**। `docker build --build-arg ...` দিয়ে value দেওয়া যায়, আর `RUN` command চলার সময় এগুলো environment variable হিসেবে পাওয়া যায়। এগুলো public value, build-এর সময় page-এ বসে যায়। দুটোই optional — না দিলে default ব্যবহার হয়। Secret (`RESEND_API_KEY`) এখানে **কখনো** দেওয়া হয় না — কেন, [Step 6](#8-step-6--environment-variable-build-time-বনাম-runtime)-এ দেখবেন।
- `ENV NEXT_OUTPUT=standalone` — Step 1-এর condition চালু করে।
- `rm -rf ...sharp-linux-*` — Image optimization-এর library `sharp`-এর দুটো version (glibc আর musl) Yarn 1 install করে, কারণ Yarn 1 package-এর `libc` field দেখে না। Alpine শুধু musl version ব্যবহার করে, তাই glibc version মুছে দিই — unpacked হিসেবে **~18 MB বাঁচে**।

> 💡 **কেন এই stage-এ মুছছি, runner-এ না?** Docker layer যোগ হয় (additive)। একটা layer-এ file রেখে পরের layer-এ মুছলে image ছোট হয় না — পুরনো layer-এ file থেকেই যায়। তাই final image-এ copy করার **আগেই** মুছতে হয়।

### 5.5 runner stage — final image

```dockerfile
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
```

- `NODE_ENV=production` — production mode।
- `PORT=3000` — `server.js` কোন port-এ শুনবে। Runtime-এ `-e PORT=...` দিয়ে বদলানো যায়।
- `HOSTNAME=0.0.0.0` — **খুব গুরুত্বপূর্ণ।** Container-এর ভিতরে `localhost` মানে শুধু container নিজে। `0.0.0.0` মানে "সব network interface-এ শোনো" — তাহলেই container-এর বাইরে থেকে (আপনার browser থেকে) connect করা যায়।

```dockerfile
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs
```

- **Non-root user** তৈরি। Default-এ container `root` হিসেবে চলে। App-এ কোনো security hole থাকলে attacker root access পেয়ে যায়। আলাদা কম-ক্ষমতার user দিয়ে চালালে ক্ষতির পরিধি কমে (**principle of least privilege**)।

```dockerfile
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache
```

- Standalone server আর তার সাথে `public/` ও `.next/static/` copy (Step 1-এর ⚠️ মনে আছে?)।
- File-গুলোর owner `root` থাকে — তাই app user এগুলো **পড়তে পারে, বদলাতে পারে না**।
- শুধু `.next/cache` folder `nextjs` user-কে দেওয়া হয়েছে, কারণ `next/image` optimize করা ছবি এখানে cache করে। এটাই একমাত্র জায়গা যেখানে app লেখে।

```dockerfile
USER nextjs
EXPOSE 3000
```

- `USER nextjs` — এর পর থেকে container-এর app এই user হিসেবে চলবে।
- `EXPOSE 3000` — **শুধু documentation।** এটা port খোলে না! Port খোলে `docker run -p` (Step 5)। অনেকে এখানে ভুল বোঝেন।

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD \
  wget -q --spider "http://127.0.0.1:${PORT}/" || exit 1
```

- Docker প্রতি ৩০ সেকেন্ডে home page request করে দেখে app সত্যিই সাড়া দিচ্ছে কিনা। টানা ৩ বার fail করলে container **unhealthy** হয়। `--start-period=10s` মানে চালুর প্রথম ১০ সেকেন্ডের fail গোনা হয় না।
- **Shell form** (`CMD wget ...`, JSON array না) ব্যবহার করেছি যাতে `${PORT}` check চলার সময় পড়া হয়। `-e PORT=4000` দিলেও healthcheck ঠিক port-এ যায়। (আমরা প্রথমে `3000` hard-code করেছিলাম — `PORT=4000` দিয়ে test করতেই bug-টা ধরা পড়ে। এজন্যই test করা জরুরি!)
- `wget` Alpine-এ আগে থেকেই আছে (BusyBox), তাই `curl` install করতে হয়নি।

```dockerfile
CMD ["node", "server.js"]
```

- Container চালু হলে এই command চলে। **Exec form** (JSON array) ব্যবহার করেছি — তাহলে `node` কোনো shell-এর ভিতরে wrap হয় না, আর `docker stop`-এর signal (`SIGTERM`) সরাসরি `node`-এর কাছে পৌঁছায়। (Base image-এর ছোট `docker-entrypoint.sh` script প্রথমে চলে, কিন্তু সে `exec` দিয়ে নিজেকে `node` দিয়ে replace করে — তাই container-এ `node`-ই PID 1 হয়।)

---

## 6. Step 4 — Image build করা

**কী করছি:** Dockerfile থেকে image তৈরি।

```bash
cd ~/IdeaProjects/portfolio-sm
docker build -t shahriar-portfolio:local .
```

- `-t shahriar-portfolio:local` — image-এর নাম (`repository:tag`)।
- `.` — build context (বর্তমান folder)।

**যা দেখবেন:** প্রতিটা step `[deps 2/2]`, `[builder 3/3]` এভাবে দেখাবে। শেষে `naming to docker.io/library/shahriar-portfolio:local`।

| Build                   | সময় (এই Mac-এ) | কেন                               |
| ----------------------- | --------------- | --------------------------------- |
| প্রথমবার / `--no-cache` | ~100 সেকেন্ড    | `yarn install` একাই ~74 সেকেন্ড   |
| শুধু code বদলে আবার     | ~9 সেকেন্ড      | `deps` stage-এর সব layer `CACHED` |

দ্বিতীয়বার build-এ output-এ `CACHED` লেখা দেখবেন — এটাই [5.3 অংশে](#53-deps-stage--dependency-install) বলা layer caching কাজ করছে।

**Image দেখুন:**

```bash
docker image ls shahriar-portfolio
# IMAGE                      ID             DISK USAGE   CONTENT SIZE
# shahriar-portfolio:local   e3def7de70dc        301MB         76.7MB
```

দুটো সংখ্যা কেন?

- **CONTENT SIZE (~77 MB)** — compressed layer-গুলো। Registry-তে push/pull-এ ঠিক এটুকু data যায়।
- **DISK USAGE (301 MB)** — compressed copy + unpacked file মিলিয়ে আপনার Mac-এর disk-এ মোট জায়গা।
- Container-এর ভিতরে আসল (unpacked) file: base `node:24-alpine` ~176 MB + আমাদের app মাত্র ~48 MB। `docker history shahriar-portfolio:local` চালালে প্রতিটা layer-এর size দেখতে পাবেন — সবচেয়ে বড় app layer হলো `COPY /app/.next/standalone` (~47 MB)।

**Optional build-time value দিয়ে build:**

```bash
docker build -t shahriar-portfolio:local \
  --build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  .
```

> Contact form-এর জন্য build-এর সময় কিছু দিতে হয় না — Resend key runtime-এ দেওয়া হয় (Step 5 আর 6)।

---

## 7. Step 5 — Container চালানো

```bash
docker run -d --name portfolio --env-file .env.local -p 8080:3000 shahriar-portfolio:local
```

| Flag                    | মানে                                                                               |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `-d`                    | detached — background-এ চালাও, terminal আটকে রাখবে না                              |
| `--name portfolio`      | container-এর একটা সহজ নাম                                                          |
| `--env-file .env.local` | `.env.local`-এর variable (যেমন `RESEND_API_KEY`) **চালানোর সময়** container-কে দাও |
| `-p 8080:3000`          | **host:container** — আপনার Mac-এর port 8080 → container-এর port 3000               |

> ⚠️ `docker run --env-file` quote বা line-এর শেষের `# comment` বোঝে না — সব কিছু value-এর অংশ হয়ে যায়। তাই `.env.local`-এ লিখুন `KEY=value` (quote ছাড়া), আর comment আলাদা line-এ। (Compose-এর `env_file` আর Next quote সরিয়ে দেয়, `docker run` দেয় না — তাই একই file এক জায়গায় কাজ করে, আরেক জায়গায় ভুল key পাঠায়।)

এখন browser-এ খুলুন: **http://localhost:8080** 🎉

> 💡 8080 কেন, 3000 না? আপনার `yarn dev` সাধারণত 3000-এ চলে। আলাদা host port দিলে দুটো একসাথে চলতে পারে। Container-এর ভিতরে app তবুও 3000-এই শোনে।

> `--env-file` ছাড়া চালালেও site চলবে, কিন্তু contact form-এ message পাঠালে "couldn’t be sent — email me directly" দেখাবে, কারণ server-এর কাছে Resend key নেই। Form কখনো ভুয়া "sent" দেখায় না।

### দরকারি command

```bash
docker ps                       # চলমান container-এর list (STATUS-এ health দেখাবে)
docker logs -f portfolio        # app-এর log দেখুন (Ctrl+C দিয়ে বের হন — container চলতে থাকবে)
docker exec -it portfolio sh    # container-এর ভিতরে shell খুলুন
docker stop portfolio           # বন্ধ করুন
docker start portfolio          # আবার চালু করুন
docker rm -f portfolio          # একদম মুছে ফেলুন
```

ভিতরে shell খুলে দেখুন:

```bash
docker exec -it portfolio sh
whoami          # nextjs   ← root না!
ls -a /app      # .next  node_modules  package.json  public  server.js — কোনো .env বা .git নেই
touch /app/x    # Permission denied ← app code বদলানো যায় না
test -n "$RESEND_API_KEY" && echo "key আছে (runtime-এ)"   # value print না করে শুধু আছে কিনা দেখা
exit
```

> ⚠️ **Container immutable।** Code বদলালে চলমান container-এ সেটা আসবে না। নতুন image build করে নতুন container চালাতে হবে (Compose-এ: `docker compose up --build`)।

---

## 8. Step 6 — Environment variable: build-time বনাম runtime

এটা Next.js + Docker-এর সবচেয়ে বেশি ভুল বোঝার জায়গা। এই project-এ তিন রকম variable আছে:

| ধরন                               | কখন value পড়া হয়                                                         | উদাহরণ                                       | কীভাবে দেবেন                    |
| --------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_*`                   | **Build-এর সময়** — value সরাসরি browser-এর JavaScript-এ বসে যায় (inline) | `NEXT_PUBLIC_SITE_URL`                       | `--build-arg`                   |
| Static page-এ ব্যবহার হওয়া value | Build-এর সময় (page আগে থেকেই HTML হয়ে যায়)                              | `GOOGLE_SITE_VERIFICATION`                   | `--build-arg`                   |
| **Runtime secret / setting**      | Container চালুর পর, server যখন দরকার পড়ে তখন                              | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `PORT` | `--env-file .env.local` বা `-e` |

### কেন `NEXT_PUBLIC_*` runtime-এ বদলানো যায় না?

`next build` code-এর `process.env.NEXT_PUBLIC_X`-কে আক্ষরিক string দিয়ে replace করে দেয়। Build শেষে browser-এর JS file-এ value hard-code হয়ে যায়। তাই `docker run -e NEXT_PUBLIC_X=...` দিলে কিছুই হবে না — নতুন value-এর জন্য নতুন build লাগবে।

### কেন `RESEND_API_KEY` runtime-এ?

Contact form submit করলে browser একটা **Server Action** call করে — code-টা শুধু server-এ চলে (`app/actions/contact.ts`), আর সেখানে `process.env.RESEND_API_KEY` পড়া হয়। এই key:

- **`NEXT_PUBLIC_` দিয়ে শুরু হয় না** — তাই কখনো browser-এ যায় না। (`NEXT_PUBLIC_` দিলে যে কেউ browser-এ আপনার key দেখে আপনার নামে email পাঠাতে পারতো!)
- **`--build-arg` দিয়েও দেওয়া হয় না** — build arg build cache বা image metadata-য় থেকে যেতে পারে, আর image share করলে secret-ও share হয়ে যায়।
- **Runtime-এ দেওয়া হয়** (`--env-file` বা `-e`) — image-এ থাকে না, কিন্তু container-এর config-এ থাকে (container মুছে না ফেলা পর্যন্ত, বন্ধ থাকলেও)। তাই filter ছাড়া `docker inspect <container>`, `docker exec <container> env` বা `docker compose config` key print করে দেয় — এগুলোর output কোথাও (issue, chat) paste করবেন না। Key আছে কিনা দেখতে Step 5-এর `test -n "$RESEND_API_KEY"` check ব্যবহার করুন।

আমরা test করে দেখেছি: image-এর কোনো file-এ, config-এ বা history-তে key নেই, কিন্তু `--env-file .env.local` দিয়ে চালালে container থেকে Resend দিয়ে email পাঠানো যায়।

**Runtime variable-এর আরেকটা উদাহরণ:**

```bash
docker run -d --name portfolio4000 -e PORT=4000 -p 8082:4000 shahriar-portfolio:local
# http://localhost:8082 — app ভিতরে 4000-এ চলছে, আর healthcheck-ও ঠিক থাকে
```

---

## 9. Step 7 — Docker Compose

প্রতিবার লম্বা `docker build` + `docker run` command লেখার বদলে সব config একটা file-এ — `compose.yaml`।

```yaml
services:
  web:
    build:
      context: .
      args:
        NEXT_PUBLIC_SITE_URL: ${NEXT_PUBLIC_SITE_URL:-}
        GOOGLE_SITE_VERIFICATION: ${GOOGLE_SITE_VERIFICATION:-}
    image: shahriar-portfolio:local
    container_name: shahriar-portfolio
    env_file:
      - path: .env.local
        required: false
    init: true
    ports:
      - '8080:3000' # host:container
    restart: unless-stopped
```

| Line                      | মানে                                                                                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `build.args`              | Build-time value। `${VAR:-}` মানে: আপনার **shell** (বা project folder-এর `.env` file) থেকে `VAR` পড়ো, না থাকলে খালি string। দুটোই optional।                           |
| `env_file`                | **Runtime**-এ `.env.local`-এর সব variable container-কে দাও — এভাবেই `RESEND_API_KEY` server-এ পৌঁছায়, image-এ না। `required: false` মানে file না থাকলেও error হবে না। |
| `image`                   | Build হওয়া image-এর নাম                                                                                                                                               |
| `init: true`              | Container-এ PID 1 হিসেবে একটা ছোট init process চালায়, যে stop signal পৌঁছে দেয় আর মরে যাওয়া child process পরিষ্কার করে (zombie reaping)                             |
| `ports`                   | `docker run -p`-এর মতোই                                                                                                                                                |
| `restart: unless-stopped` | Crash করলে বা Docker restart হলে আবার চালু হবে — যদি না আপনি নিজে stop করেন                                                                                            |

> ⚠️ **দুই রকম file পড়া — গুলিয়ে ফেলবেন না।** `env_file:` (runtime) `.env.local` পড়ে। কিন্তু `${...}` interpolation (build args) Compose শুধু shell আর `.env` থেকে পড়ে — `.env.local` থেকে না। Build-time value-ও `.env.local`-এ রাখতে চাইলে চালান: `docker compose --env-file .env.local up --build`।

> 💡 **`init: true` নিয়ে সৎ কথা:** অনেক Node app `SIGTERM` handle করে না। Container-এর PID 1 হিসেবে চললে সেগুলো `docker stop`-এ সাড়া দেয় না, আর Docker ১০ সেকেন্ড অপেক্ষা করে জোর করে kill করে। আমরা test করে দেখেছি **Next.js-এর `server.js` নিজেই `SIGTERM` handle করে** — `init` থাকুক বা না থাকুক, এক সেকেন্ডের কম সময়ে বন্ধ হয় (exit code 143 = SIGTERM-এ বন্ধ)। তবুও `init: true` একটা ভালো অভ্যাস, অন্য app-এর জন্য।

### Commands

> ⚠️ Step 5-এর `portfolio` container চালু থাকলে আগে মুছে ফেলুন (`docker rm -f portfolio`), নাহলে দুজনেই port 8080 চাইবে আর `port is already allocated` error আসবে।

```bash
docker compose up --build        # build + run, log সামনে দেখাবে (Ctrl+C = stop)
docker compose up --build -d     # background-এ
docker compose ps                # status (health সহ)
docker compose logs -f           # log
docker compose down              # container + network মুছে ফেলুন (image থাকে)
```

---

## 10. Step 8 — যাচাই করা

Compose দিয়ে container চালু থাকা অবস্থায় (নাম `shahriar-portfolio`) এগুলো check করুন। প্রতিটা আমরা এই project-এ চালিয়ে দেখেছি:

```bash
# 1. Health — কয়েক সেকেন্ড পর "healthy" হওয়া উচিত
docker inspect -f '{{.State.Health.Status}}' shahriar-portfolio

# 2. Page আর route
curl -I http://localhost:8080/                                        # 200
curl -I http://localhost:8080/work/mobile-financial-services-platform # 200
curl -I http://localhost:8080/does-not-exist                          # 404

# 3. Image optimization (sharp কাজ করছে কিনা)
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' -H 'Accept: image/webp' \
  'http://localhost:8080/_next/image?url=%2Fimages%2Fshahriar-mahmud.jpg&w=256&q=75'
# 200 image/webp

# 4. Non-root
docker exec shahriar-portfolio whoami                                 # nextjs

# 5. Secret image-এ নেই — config-এ শুধু PORT, NODE_ENV-এর মতো সাধারণ value
docker image inspect shahriar-portfolio:local --format '{{json .Config.Env}}'

# 6. Layer-গুলো দেখুন — কোন instruction কত বড় layer বানিয়েছে
docker history shahriar-portfolio:local

# 7. Dockerfile lint (Docker-এর নিজস্ব checker)
docker build --check .                                                # "no warnings found"
```

---

## 11. Step 9 — Apple Silicon বনাম server: multi-platform

আপনার Mac (M-series) **`arm64`** CPU। বেশিরভাগ VPS/cloud server **`amd64`** (x86_64)। Mac-এ সাধারণ `docker build` শুধু arm64 image বানায়। সেটা registry থেকে amd64 server-এ নামাতে গেলে error আসবে:

```
no matching manifest for linux/amd64 in the manifest list entries
```

(Image অন্যভাবে, যেমন `docker save`/`docker load` দিয়ে server-এ নিয়ে চালালে আসে `exec format error`।)

**সমাধান — target platform বলে build করুন।** প্রথমে শুধু amd64 build করে local-এ test:

```bash
docker buildx build --platform linux/amd64 -t shahriar-portfolio:amd64 --load .
docker image inspect shahriar-portfolio:amd64 --format '{{.Architecture}}'   # amd64
```

- `buildx` — Docker-এর advanced builder।
- `--platform linux/amd64` — অন্য CPU-র জন্য build। Mac-এ এটা emulation (QEMU) দিয়ে চলে, তাই একই অবস্থায় native build-এর চেয়ে ধীর। এই project-এ ~৭০ সেকেন্ড লেগেছিল — Step 4-এর প্রথম build-এর চেয়েও কম, কারণ ততক্ষণে Yarn-এর download cache ভরা ছিল। তাই দুটো সংখ্যা সরাসরি তুলনা করবেন না। বড় project-এ কয়েক মিনিটও লাগতে পারে।
- `--load` — build হওয়া image local Docker-এ রাখো। (Emulation-এ amd64 image চালিয়েও আমরা দেখেছি page ঠিকঠাক load হয়।)

> 💡 Dockerfile-এর `sharp` cleanup line দুই platform-এই কাজ করে — amd64-এ package-এর নাম `...-linux-x64`, যেটা `sharp-linux-*` pattern-এ match করে।

আসল deploy-এর জন্য দুই platform একসাথে build করে registry-তে push করবেন — সেটা পরের step-এ, `docker login`-এর পরে।

---

## 12. Step 10 — Registry-তে push

Image অন্য machine-এ নিতে হলে registry-তে রাখতে হয়। এখানে GitHub Container Registry (GHCR) ব্যবহার করছি।

> ⚠️ **Image-এর নামে username অবশ্যই lowercase।** আপনার GitHub username `shahriarRUET14`, কিন্তু image name হবে `ghcr.io/shahriarruet14/portfolio`। Capital letter দিলে `invalid reference format` error আসে। (`docker login`-এ capital letter চলে।)

```bash
# 1. GitHub → Settings → Developer settings → Personal access tokens
#    → Tokens (classic) → Generate new token (classic)। GHCR শুধু classic token নেয়।
#    শুধু write:packages রাখুন — "repo" নিজে থেকে tick হলে তুলে দিন।
#    (সরাসরি: https://github.com/settings/tokens/new?scopes=write:packages)

# 2. Login — password চাইলে token টা paste করুন, command-এ লিখবেন না
docker login ghcr.io -u shahriarRUET14

# 3. Server (amd64) আর Mac (arm64) দুটোর জন্যই build করে সরাসরি push
docker buildx build --platform linux/amd64,linux/arm64 \
  -t ghcr.io/shahriarruet14/portfolio:1.0.0 --push .
```

- এক command-এ দুই platform-এর image বানিয়ে একটা নামে push হয়; যে machine `pull` করবে, Docker নিজেই তার CPU-র version নামাবে।
- Custom domain থাকলে যোগ করুন: `--build-arg NEXT_PUBLIC_SITE_URL=https://your-domain.com`। মনে রাখবেন, `buildx` নিজে কোনো `.env` file পড়ে না — যা দরকার `--build-arg` দিয়ে দিতে হবে।
- `RESEND_API_KEY` এখানে দেবেন **না** — এটা server-এ runtime-এ দেওয়া হবে (Step 11)।

> ⚠️ `docker tag shahriar-portfolio:local ghcr.io/...` করে push করবেন না — `:local` image শুধু arm64, amd64 server-এ চলবে না।

> 💡 Production-এ `latest` tag-এর উপর নির্ভর না করে version tag (`1.0.0`) বা git commit SHA দিন — কোন image চলছে সবসময় জানা থাকবে, আর rollback সহজ হবে।

**Docker Hub** একই রকম: `docker login`, তারপর tag `<dockerhub-username-lowercase>/portfolio:1.0.0`।

---

## 13. Step 11 — একটা server-এ deploy

আপনার site এখন Vercel-এ চলছে, আর সেটাই চলতে থাকবে। Docker image থাকায় এখন যেকোনো Linux server-এও চালাতে পারবেন। একটা VPS-এ (Docker install করা আছে ধরে নিয়ে):

**১. Login (শুধু pull-এর permission দিয়ে):** Server-এর জন্য আলাদা একটা classic token বানান শুধু `read:packages` scope দিয়ে (https://github.com/settings/tokens/new?scopes=read:packages)। `write:packages` token server-এ রাখবেন না — Linux-এ `docker login` token-টা `~/.docker/config.json`-এ unencrypted রাখে। (অথবা GHCR-এ package-টা public করে দিন — তাহলে pull-এর জন্য login-ই লাগবে না।)

```bash
ssh user@your-server
docker login ghcr.io -u shahriarRUET14        # read:packages token দিন
```

**২. Secret রাখার file (শুধু server-এ):**

```bash
sudo install -d -o "$USER" -m 700 /opt/portfolio   # folder-এর owner আপনার user
nano /opt/portfolio/.env                           # লিখুন: RESEND_API_KEY=... (quote ছাড়া)
chmod 600 /opt/portfolio/.env                      # শুধু আপনি (owner) পড়তে পারবেন
```

`docker run --env-file`-এর file-টা Docker daemon না, **docker CLI** পড়ে — তাই যে user `docker run` চালায়, তাকে file-টা পড়তে পারতে হবে। (File root-এর হলে `permission denied` আসবে; সমাধান হিসেবে `chmod 644` করবেন না — তাতে সবাই secret পড়তে পারবে। আর মনে রাখবেন, `docker` group-এ থাকা মানে কার্যত root access।)

**৩. চালান:**

```bash
docker pull ghcr.io/shahriarruet14/portfolio:1.0.0
docker run -d --name portfolio --restart unless-stopped \
  --env-file /opt/portfolio/.env \
  -p 80:3000 ghcr.io/shahriarruet14/portfolio:1.0.0
```

এখন `http://<server-ip>` এ site দেখা যাবে।

**৪. HTTPS (reverse proxy):** সামনে একটা reverse proxy বসানো standard practice। Caddy সবচেয়ে সহজ — নিজে থেকেই Let's Encrypt certificate নিয়ে নেয়, আর সঠিক `Host`/`X-Forwarded-For` header পাঠায়। তখন port 80/443 Caddy-র লাগবে, তাই container-কে শুধু server-এর localhost-এ publish করুন — `-p 80:3000`-এর বদলে `-p 127.0.0.1:3000:3000` — আর Caddyfile-এ লিখুন:

```
your-domain.com {
  reverse_proxy 127.0.0.1:3000
}
```

Nginx ব্যবহার করলে এই header-গুলো দিতেই হবে। নাহলে Next contact form-এর Server Action reject করে (browser-এর `Origin` আর `Host` মেলে না — এটা Next-এর built-in CSRF protection), আর সব visitor একই rate-limit-এ পড়ে:

```nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $remote_addr;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

(`$proxy_add_x_forwarded_for` না, `$remote_addr` দিন — নাহলে visitor-এর পাঠানো ভুয়া value প্রথমে থেকে যায়।)

### বাড়তি নিরাপত্তা (hardening)

Root filesystem read-only করে দিন, শুধু cache folder-এ লেখার অনুমতি রাখুন। আগে আপনার Mac-এ test করুন:

```bash
docker run -d --name portfolio-ro --read-only \
  --tmpfs /app/.next/cache:uid=1001,gid=1001 --tmpfs /tmp \
  --env-file .env.local -p 8083:3000 shahriar-portfolio:local
```

- `--read-only` — container-এর পুরো filesystem read-only; app কোথাও লিখতে পারবে না।
- `--tmpfs <path>` — ওই path-এ memory-তে (RAM) একটা অস্থায়ী, লেখা যায় এমন folder mount করে; container বন্ধ হলে সব মুছে যায়। `uid=1001,gid=1001` দিয়ে folder-এর owner `nextjs` user করা হয়, যাতে app সেখানে লিখতে পারে।
- `--tmpfs /tmp` — Node বা কোনো library সাময়িক file লিখতে `/tmp` ব্যবহার করতে পারে, তাই সেটাও লেখার উপযোগী রাখা হয়েছে।
- (Volume হলো disk-এ থাকা স্থায়ী storage, যেটা container মুছলেও থাকে; tmpfs অস্থায়ী।)

আমরা test করেছি: page আর image optimization দুটোই কাজ করে, আর container-এর ভিতরে অন্য কোথাও লিখতে গেলে `Read-only file system` error আসে। Server-এ একই flag দিয়ে আগের container বদলে দিন:

```bash
docker rm -f portfolio
docker run -d --name portfolio --restart unless-stopped --read-only \
  --tmpfs /app/.next/cache:uid=1001,gid=1001 --tmpfs /tmp \
  --env-file /opt/portfolio/.env \
  -p 127.0.0.1:3000:3000 ghcr.io/shahriarruet14/portfolio:1.0.0
```

---

## 14. Troubleshooting

| সমস্যা / Error                                    | কারণ                                                                | সমাধান                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot connect to the Docker daemon`             | Docker Desktop চালু নেই                                             | Docker Desktop app খুলুন                                                                                                                                                                                                                                                                                                             |
| `port is already allocated`                       | ওই host port অন্য কিছু ব্যবহার করছে                                 | অন্য port দিন (`-p 8081:3000`) বা `docker ps` দেখে পুরনো container stop করুন                                                                                                                                                                                                                                                         |
| Browser-এ page খোলে না, কিন্তু container চলছে     | `-p` দেননি, বা app `localhost`-এ শুনছে                              | `-p 8080:3000` দিন; `HOSTNAME=0.0.0.0` আছে কিনা দেখুন                                                                                                                                                                                                                                                                                |
| `no matching manifest for linux/amd64`            | Image-এ server-এর CPU platform নেই (শুধু arm64)                     | Step 10-এর মতো `--platform linux/amd64,linux/arm64` দিয়ে build করে push                                                                                                                                                                                                                                                             |
| `exec format error`                               | ভুল CPU architecture-এর image চালানো হয়েছে                         | একই — সঠিক platform-এর জন্য build                                                                                                                                                                                                                                                                                                    |
| `invalid reference format`                        | Image name-এ capital letter                                         | Username lowercase করুন: `ghcr.io/shahriarruet14/...`                                                                                                                                                                                                                                                                                |
| Contact form: "couldn’t be sent"                  | `RESEND_API_KEY` নেই/ভুল, বা Resend message reject করেছে            | `docker logs <container>`-এ `[contact]` line দেখুন: `RESEND_API_KEY is not set` → `--env-file`/`env_file` দিন; `Resend rejected the message` → key ঠিক করুন (quote ছাড়া)। Default sender `onboarding@resend.dev` শুধু Resend account-এর নিজের email-এ পাঠাতে পারে — অন্য ঠিকানায় পাঠাতে domain verify করে `CONTACT_FROM_EMAIL` দিন |
| Contact form: "paused for now"                    | পুরো site-এর message limit (১০ মিনিটে ২০, দিনে ৫০) পূর্ণ            | Spam-এ Resend quota শেষ হওয়া ঠেকাতে ইচ্ছাকৃত; পরে আবার চেষ্টা করুন                                                                                                                                                                                                                                                                  |
| Contact form: "paused for a few minutes"          | একই network থেকে ১০ মিনিটে ৫টার বেশি message                        | ইচ্ছাকৃত spam-protection; কিছুক্ষণ পর আবার চেষ্টা করুন                                                                                                                                                                                                                                                                               |
| Code বদলেছি কিন্তু পরিবর্তন দেখছি না              | পুরনো image থেকে container চলছে                                     | `docker compose up --build`                                                                                                                                                                                                                                                                                                          |
| `yarn install` fail: lockfile needs to be updated | `package.json` বদলেছে কিন্তু `yarn.lock` না                         | Local-এ `yarn install` চালিয়ে `yarn.lock` commit করুন                                                                                                                                                                                                                                                                               |
| `EACCES: permission denied`                       | App non-root user হিসেবে এমন জায়গায় লিখতে চাইছে যেখানে অনুমতি নেই | ওই folder `chown nextjs:nodejs` করুন, বা tmpfs/volume দিন                                                                                                                                                                                                                                                                            |
| Disk ভরে যাচ্ছে                                   | পুরনো image/build cache জমেছে                                       | `docker system df` দিয়ে দেখুন; `docker image prune` / `docker builder prune` (সাবধানে — মুছে ফেলে)                                                                                                                                                                                                                                  |
| Container বারবার restart হচ্ছে                    | App crash করছে                                                      | `docker logs shahriar-portfolio` দেখুন                                                                                                                                                                                                                                                                                               |

---

## 15. Cheatsheet

```bash
# Build & run (Compose — সবচেয়ে সহজ)
docker compose up --build -d          # build + background run → http://localhost:8080
docker compose logs -f                # log
docker compose down                   # বন্ধ + মুছে ফেলা

# Image
docker build -t name:tag .            # build
docker image ls                       # list
docker history name:tag               # layers
docker rmi name:tag                   # delete

# Container
docker run -d --name c --env-file .env.local -p 8080:3000 name:tag
docker ps                             # চলমান container
docker ps -a                          # সব container (বন্ধগুলো সহ)
docker logs -f c                      # log
docker exec -it c sh                  # ভিতরে ঢুকুন
docker stop c                         # বন্ধ
docker start c                        # আবার চালু
docker rm -f c                        # মুছে ফেলুন

# Inspect & clean
docker inspect -f '{{.State.Health.Status}}' c
docker system df                      # কে কত জায়গা নিচ্ছে
docker builder prune                  # build cache মুছুন
```

---

## 16. নিজে চেষ্টা করুন

হাতে-কলমে করলেই শেখা পাকা হয়। প্রতিটার পর কী হলো আর কেন হলো, নিজেকে ব্যাখ্যা করুন।

1. **Layer cache ভেঙে দেখুন:** (ক) `deps` stage-এ `COPY package.json yarn.lock ./`-এর জায়গায় `COPY . .` দিন আর **একবার build করুন** — এবার `yarn install` চলবেই, কারণ instruction নিজেই বদলেছে। (খ) এখন `content/projects.ts`-এ একটা শব্দ বদলে **আবার** build করুন। `yarn install` কি আবার চললো? সময় কত লাগলো (আগে ~9 সেকেন্ড ছিল)? কেন? (শেষে Dockerfile আগের মতো ফিরিয়ে দিন।)
2. **`.dockerignore`-এর গুরুত্ব:** `mv .dockerignore .dockerignore.bak` করুন, তারপর **আলাদা tag দিয়ে** build শুরু করুন: `docker build -t ctx-test .`। `transferring context` line-এ কত MB দেখাচ্ছে দেখেই **Ctrl+C** চাপুন (আগে ছিল ~456 KB)। পুরো build হতে দেবেন না — তখন Mac-এর `node_modules` আর `.env.local`-এর secret image-এ ঢুকে যেতে পারে। শেষে `mv .dockerignore.bak .dockerignore` করুন (image তৈরি হয়ে গেলে `docker image rm ctx-test`)।
3. **Root বনাম non-root:** `docker run --rm --user root --entrypoint sh shahriar-portfolio:local -c 'whoami; touch /app/x && echo "root can write"'` চালান। তারপর `--user root` বাদ দিয়ে চালান। পার্থক্য কী, আর production-এ কোনটা চাই?
4. **Build-time বনাম runtime:** `-e PORT=5000 -p 8085:5000` দিয়ে চালান — health কি `healthy` হয়? এবার `-e NEXT_PUBLIC_SITE_URL=https://example.com` যোগ করে চালান, তারপর `curl -s http://localhost:8085 | grep -o 'rel="canonical" href="[^"]*"'` দেখুন — canonical URL কি বদলালো? কেন না? আর `RESEND_API_KEY` কেন runtime-এ কাজ করে? (Step 6)
5. **Healthcheck fail করিয়ে দেখুন:** ইচ্ছা করে ভুল port-এ health check দিন:
   ```bash
   docker run -d --name hc --health-interval=2s --health-retries=2 --health-start-period=1s \
     --health-cmd 'wget -q --spider http://127.0.0.1:9999/ || exit 1' \
     -p 8086:3000 shahriar-portfolio:local
   ```
   ~১০ সেকেন্ড পর `docker inspect -f '{{.State.Health.Status}}' hc` দেখুন — `unhealthy`। অথচ http://localhost:8086 ঠিকই খুলছে! শিক্ষা: health status ততটুকুই সত্য, যতটুকু ভালো check আপনি লিখেছেন। (শেষে `docker rm -f hc`)
6. **Secret কোথায় থাকে:** `docker run --rm --entrypoint sh shahriar-portfolio:local -c 'test -n "$RESEND_API_KEY" && echo আছে || echo নেই'` চালান, তারপর `--env-file .env.local` যোগ করে আবার চালান। কোনটায় key আছে, আর কেন image-এর ভিতরে key রাখা বিপজ্জনক?
7. **amd64 image:** Step 9-এর command দিয়ে amd64 image build করে `docker image inspect` দিয়ে architecture যাচাই করুন।
8. **Bonus — image আরও ছোট:** base image `node:24-alpine`-এর বদলে `gcr.io/distroless/nodejs24-debian12` (Google-এর distroless image) নিয়ে পড়াশোনা করুন। কী লাভ (কম file, কম attack surface), কী সমস্যা (shell বা `wget` নেই — healthcheck কীভাবে দেবেন)?

---

### শেষ কথা

আপনি এখন জানেন: Dockerfile-এর প্রতিটা line কেন আছে, multi-stage build কীভাবে image ছোট রাখে, layer cache কীভাবে build দ্রুত করে, build-time আর runtime variable-এর পার্থক্য, secret কীভাবে image-এর বাইরে রাখতে হয়, non-root আর read-only দিয়ে কীভাবে container নিরাপদ রাখা যায়, আর কীভাবে অন্য server-এর জন্য image বানিয়ে push করতে হয়। এই pattern যেকোনো Next.js বা Node.js project-এ প্রায় হুবহু কাজে লাগবে। 🚀
