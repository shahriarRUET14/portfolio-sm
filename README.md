# Shahriar Mahmud — Portfolio

Personal site of Shahriar Mahmud, Senior Software Engineer. Live at
[portfolio-sm-ten.vercel.app](https://portfolio-sm-ten.vercel.app).

Built with Next.js 16 (App Router, server components by default), React 19,
TypeScript (strict) and Tailwind CSS. No UI or animation libraries; the only
runtime dependency beyond Next/React is `@emailjs/browser`, loaded on demand
when the contact form is submitted.

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

See `.env.example`. All are optional.

- `NEXT_PUBLIC_SITE_URL` — canonical origin. Set this when a custom domain is
  added; canonical links, sitemap, robots and social cards all follow it.
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`,
  `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` — contact form. The template receives
  `user_name`, `user_email` and `user_message`. If any are missing, the form is
  replaced by a direct email link (it never fakes a successful send).
- `GOOGLE_SITE_VERIFICATION` — Search Console HTML-tag token.

## Deploying (Vercel)

The repository is connected to Vercel; pushing to `master` deploys production
and any other branch gets a preview URL. No extra build settings are needed —
Vercel detects Next.js and Yarn from `yarn.lock`.

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
