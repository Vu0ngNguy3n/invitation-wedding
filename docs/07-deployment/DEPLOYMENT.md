# Deployment

## Target

- **App:** Vercel (Next.js App Router)
- **Database:** Supabase PostgreSQL

Node.js **20.9+** is required (`package.json` `engines`).

## Workflow

1. Fill production content and image files (see `PRODUCTION_CHECKLIST.md`).
2. Set `seo.canonicalUrl` in `src/config/weddingData.ts` to the public HTTPS origin (for example `https://www.example.com`) when the domain is known. Until then the site stays `noindex`.
3. Apply the guestbook SQL on the **production** Supabase project (see below).
4. Push the repository to GitHub.
5. Import the project in Vercel → Framework Preset **Next.js** → Root Directory `.`
6. Add environment variables (Production, Preview, and Development).
7. Deploy (`git push` to the production branch, or Vercel Dashboard → Deploy).
8. Run post-deployment tests in the checklist at the bottom of this file.

Do not put secrets in source files. `.env.local` stays on the machine; Vercel env stays in the Vercel project.

## Environment variables required in Vercel

| Name | Scope | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Build + runtime | **Yes** |
| `SUPABASE_SECRET_KEY` | Runtime (server only) | **Yes** |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | — | No (unused by this app) |

Rules:

- `SUPABASE_SECRET_KEY` must **not** start with `NEXT_PUBLIC_`.
- Copy values from the Supabase project **Settings → API**.
- Set the same pair on **Production**, **Preview**, and **Development** in Vercel so guestbook works on preview URLs too.
- After changing `NEXT_PUBLIC_*` values, trigger a new build.

## Supabase setup required

1. Create or select a Supabase project (production should not share a throwaway project if guests will write real wishes).
2. Confirm the project URL matches `NEXT_PUBLIC_SUPABASE_URL`.
3. Use the **secret** key (`sb_secret_…` or the dashboard “service_role” / secret key). Never the publishable/anon key as `SUPABASE_SECRET_KEY`.
4. Run the SQL below in **SQL Editor** (once per project).

## SQL that must already be executed

Run the full file:

`supabase/migrations/20260904000000_guestbook_wishes.sql`

Equivalent copies exist in `docs/05-database/DATABASE_SCHEMA.sql` plus `docs/05-database/RLS_POLICIES.sql`. Prefer the migration file so schema and RLS stay in one apply.

Confirm in **Table Editor** that `public.guestbook_wishes` exists.

## RLS requirements

- RLS **enabled** on `public.guestbook_wishes`.
- Policy **SELECT** for `anon` / `authenticated` where `is_approved = true` only.
- **No** public INSERT / UPDATE / DELETE policies.
- Inserts go through Next.js `/api/guestbook` using `SUPABASE_SECRET_KEY` (bypasses RLS after server validation).

## Guestbook production architecture

```
Browser (same origin)
  → POST /api/guestbook
  → Origin must match the request host (Vercel `x-forwarded-host`)
  → body size + JSON validation
  → in-memory rate limit (per instance; 429 if Production and no client IP)
  → insert with server secret
  → revalidateTag("guestbook-wishes")
  → router.refresh()

Page / GET /api/guestbook
  → tagged cache (30s) of approved rows
```

The browser never receives `SUPABASE_SECRET_KEY`. Client code only `fetch("/api/guestbook")`.

## Static assets

Paths in `weddingData` are public URLs such as `/images/hero/hero-desktop.webp`. Files must exist under `public/` or the UI skips the image (empty frame, no 404 request).

Add production files before launch:

- `/public/images/hero/`
- `/public/images/couple/`
- `/public/images/gallery/`
- `/public/images/gift/` (QR)
- `/public/images/og-image.webp` if `seo.ogImage` is set

## Metadata and social preview

Configured in `src/lib/metadata.ts` from `weddingData.seo`:

| Field | When it appears |
|---|---|
| title / description | From `seo.*`, then couple/wedding fallbacks, else `Thiệp cưới` |
| canonical, `metadataBase`, sitemap, index | Only if `seo.canonicalUrl` is an absolute `http(s)` URL |
| Open Graph / Twitter image | Only if `seo.ogImage` exists on disk under `public/` |
| favicon / apple icon | Only if those files exist |

Until `canonicalUrl` is set: `robots.txt` disallows `/` and HTML is `noindex, nofollow`.

## Deployment command / workflow

Local production check:

```bash
npm run typecheck
npm run lint
npm run build
```

Vercel: connecting the Git repo deploys on push. Manual production deploy:

```bash
npx vercel --prod
```

(Requires Vercel CLI login; env vars must already exist in the Vercel project.)

## Post-deployment tests

- [ ] `https://<domain>/` loads over HTTPS
- [ ] Guestbook list loads (empty or existing wishes, not a hard failure)
- [ ] Submit a valid wish from the site; it appears after refresh
- [ ] Invalid payload (empty name) is rejected
- [ ] Direct POST from another origin is rejected (403)
- [ ] Images that exist render; missing files do not 404 in Network
- [ ] View source: title/description; after canonical is set, canonical + OG URL
- [ ] `/robots.txt` and `/sitemap.xml` match whether canonical is set
- [ ] Mobile and desktop layout
- [ ] No `SUPABASE_SECRET_KEY` in the browser bundle (search deployed JS)

## Production requirements

- HTTPS (Vercel default)
- Production env vars set before the first production build
- No secret in the client bundle
- Database reachable from the Vercel server region
- `npm run build` passes
- Guestbook tested on the live origin
- SEO metadata checked after `canonicalUrl` and OG image are set
