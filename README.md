# Shahriar Mahmud — Portfolio

Personal site of Shahriar Mahmud, Senior Software Engineer. Live at
[portfolio-sm-ten.vercel.app](https://portfolio-sm-ten.vercel.app).

Built with Next.js 16 (App Router, server components by default), React 19,
TypeScript (strict) and Tailwind CSS. No UI or animation libraries; the only
runtime dependency beyond Next/React is `resend`, used server-side by the
contact form.

## Editing content

All copy lives in `content/` — components never hard-code facts.

| File                   | What it holds                                                               |
| ---------------------- | --------------------------------------------------------------------------- |
| `content/profile.ts`   | Name, headline, contact links, location, education, résumé path             |
| `content/projects.ts`  | Selected work and case studies (a project without `caseStudy` gets no page) |
| `content/approach.ts`  | Engineering principles, each tied to evidence                               |
| `content/expertise.ts` | Capability groups with where each was applied                               |
| `content/about.ts`     | About narrative, experience timeline, leadership themes                     |

Years of experience are calculated from `profile.careerStart`, so they stay
accurate without edits. The résumé is served from `public/resume.pdf`.

**Content integrity.** Every figure on the site comes from the résumé. Lines in
`content/projects.ts` marked `OWNER: verify` explain _why_ a stated fact mattered
and should be confirmed. Each case study's `ownerNotes` lists missing details;
they render as a dashed box in `yarn dev` only and never in production.

## Running locally

```bash
nvm use            # Node 24 (see .nvmrc); Node >= 20.9 works
yarn install
yarn dev           # http://localhost:3000
```

| Command          | Purpose                             |
| ---------------- | ----------------------------------- |
| `yarn build`     | Production build (also type-checks) |
| `yarn start`     | Serve the production build          |
| `yarn lint`      | ESLint + Prettier check             |
| `yarn typecheck` | TypeScript only                     |
| `yarn format`    | Prettier write                      |

## Environment variables

Copy `.env.example` to `.env.local` (git-ignored) for local development. In
production, set the same keys in Vercel → Project → Settings → Environment
Variables.

**Runtime, server-only**

- `RESEND_API_KEY` — secret key for [Resend](https://resend.com). The contact
  form posts to a Server Action (`app/actions/contact.ts`) that validates input,
  rate-limits (5 per client and 20 site-wide per 10 minutes, 50 per day —
  in memory, per server instance) and sends the email; replying to it answers
  the visitor. Without the key, visitors are told
  the message couldn't be sent and are shown the email address — the form
  never fakes success. Never prefix this key with `NEXT_PUBLIC_`.
- `CONTACT_TO_EMAIL` — optional; defaults to the email in `content/profile.ts`.
- `CONTACT_FROM_EMAIL` — optional; defaults to Resend's test sender
  `onboarding@resend.dev`, which only delivers to your own Resend account
  email. Verify a domain in Resend to send from your own address.

**Build-time (baked into the pages)**

- `NEXT_PUBLIC_SITE_URL` — canonical origin. Set this when a custom domain is
  added; canonical links, sitemap, robots and social cards all follow it.
- `GOOGLE_SITE_VERIFICATION` — Search Console HTML-tag token.

## Deploying (Vercel)

The repository is connected to Vercel; pushing to `master` deploys production
and any other branch gets a preview URL. No extra build settings are needed —
Vercel detects Next.js and Yarn from `yarn.lock`.

## Docker (self-hosting)

```bash
docker compose up --build -d   # http://localhost:8080
```

A multi-stage `Dockerfile` builds an image from Next.js standalone output
(~77 MB compressed) that runs as a non-root user with a health check. Secrets
such as `RESEND_API_KEY` are injected at runtime from `.env.local` via
Compose's `env_file`; no `.env*` file enters the image. Standalone output is
only enabled inside the Docker build, so Vercel is unaffected.

Step-by-step guide (Bangla + English): [docs/DOCKER.md](docs/DOCKER.md).

## Structure

```
app/                 routes, metadata, sitemap/robots/manifest, OG images, icons
  work/[slug]/       case-study template (statically generated)
components/
  home/              homepage sections
  work/              case-study building blocks
  diagrams/          architecture diagrams (HTML/CSS, so labels stay real text)
  site/              header, footer, theme toggle, mobile menu, scroll reveals
  contact/           contact form and small client widgets
content/             all site copy (see above)
lib/                 site URL, dates, structured data, contact config
styles/globals.css   design tokens (dark + light) and base styles
```

## Search visibility checklist

The code handles titles, descriptions, canonical URLs, Open Graph images,
`Person`/`ProfilePage`/`Article` structured data, sitemap and robots. Ranking
for a name also depends on things outside the code:

1. Verify the site in [Google Search Console](https://search.google.com/search-console)
   (set `GOOGLE_SITE_VERIFICATION`) and submit `/sitemap.xml`.
2. Link to the site from LinkedIn (Contact info → Website and Featured), the
   GitHub profile README and website field, and the résumé.
3. Consider a custom domain (for example `shahriarmahmud.dev`) and set
   `NEXT_PUBLIC_SITE_URL` to it.
