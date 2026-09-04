# Production Checklist

Use with `docs/07-deployment/DEPLOYMENT.md`.

## Application
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Vercel env vars set for Production (and Preview)
- [ ] No `SUPABASE_SECRET_KEY` in the client bundle
- [ ] No secrets in Git (`.env.local` ignored; `.env.example` empty)

## Content
- [ ] Couple names, date, timezone, venue, parents filled in `weddingData`
- [ ] Event information correct
- [ ] Gallery images in `public/images/gallery/`
- [ ] Hero / couple photos in `public/images/`
- [ ] QR / account information correct
- [ ] No leftover placeholder-only sections you intend to show

## Guestbook
- [ ] Production Supabase project URL matches `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `guestbook_wishes` table exists
- [ ] RLS enabled; SELECT approved only; no public INSERT/UPDATE/DELETE
- [ ] POST from the live site works
- [ ] GET / list on the page works
- [ ] Invalid payload rejected
- [ ] Cross-origin POST rejected

## SEO
- [ ] `seo.title` and `seo.description` set
- [ ] `seo.canonicalUrl` set to the public HTTPS origin
- [ ] `public` file exists for `seo.ogImage`
- [ ] `/robots.txt` allows `/` and lists sitemap after canonical is set
- [ ] `/sitemap.xml` contains the canonical URL

## Responsive
- [ ] mobile
- [ ] tablet
- [ ] desktop
- [ ] wide desktop

## Final
- [ ] Custom domain (optional) on Vercel
- [ ] HTTPS
- [ ] Guestbook smoke test on the production origin
- [ ] Final visual review
