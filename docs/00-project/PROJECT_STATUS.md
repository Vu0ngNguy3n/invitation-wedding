# Project Status

Update this file after every meaningful phase.

## Current Phase

Phase 12 — QA

## Completed

- [x] Project foundation
- [x] Design system
- [x] Hero
- [x] Couple
- [x] Save the Date
- [x] Countdown
- [x] Events
- [x] Gallery
- [x] Guestbook
- [x] Gift / QR
- [x] Thank You
- [x] Animation audit (shared motion tokens, reduced-motion, one reveal per section)
- [x] SEO
- [x] Performance audit (hero art-direction, font subset, guestbook cache/RSC list, gallery code-split)
- [ ] QA
- [x] Production deployment docs and build gate (`docs/07-deployment/`)

## Known Issues

- Wedding content in `src/config/weddingData.ts` is still placeholder-only, so Hero and Couple currently show ornamentation and empty image frames without names, parents, stories, or quotes.
- Save the Date / countdown do not render until `wedding.date.iso` or day/month/year is filled.
- Events section does not render until `weddingData.events` has at least one item.
- Gallery section does not render until `weddingData.gallery` has at least one item whose file exists in `public/`.
- Gift section does not render until `weddingData.gifts` has at least one entry with displayable fields.
- Thank You names and date stay hidden until couple names and wedding date are filled; the optional closing photo renders only when `copy.thankYou.image` points to a file that exists.
- Referenced images (`/images/hero/*`, `/images/couple/*`, `/images/og-image.webp`) are not in the repo yet. Missing files no longer 404; frames stay empty until assets are added.
- SEO metadata is generated from `weddingData.seo` (with couple/wedding fallbacks). Absolute Open Graph URLs, indexing, and the sitemap require `seo.canonicalUrl` to be set to the production domain. Until then the site is `noindex`.
- The guestbook server client reads `SUPABASE_SECRET_KEY` and `NEXT_PUBLIC_SUPABASE_URL` only. Publishable/anon keys in env files are unused.
- `.env.example` must stay empty. Live keys belong only in `.env.local` / Vercel.
- `PROJECT_SPEC.md` still contains an illustrative data sample; live data is only `src/config/weddingData.ts`.
- ICS event length is `wedding.calendarDurationHours` in `weddingData` (currently 2). [NEEDS_DECISION] if ceremony length should differ.
- Guestbook POST rate limiting is in-memory per server instance. In production, requests without a client IP are rejected (429).
- Guestbook SQL is in `supabase/migrations/`; apply it once per Supabase project (already applied on the current project).

## Open Decisions

- [ ] Final wedding content
- [ ] Final wedding date/timezone
- [ ] Final venue
- [ ] Final images
- [ ] Final bank/QR data
- [ ] Production domain
- [x] Whether guestbook moderation is required — default: publish immediately (`is_approved` defaults to true); GET still returns approved rows only
- [ ] Calendar event duration for ICS export

## Architecture Decisions

- Next.js App Router (Next.js 16)
- TypeScript
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- Framer Motion
- lucide-react
- Supabase
- Vercel
- Single static wedding content source: `src/config/weddingData.ts`
- UI must import wedding content only from `@/config/weddingData`
- Domain types live in `src/types/`
- Guestbook wishes persist in Supabase PostgreSQL via `/api/guestbook`
- Browser never receives `SUPABASE_SECRET_KEY`; no browser Supabase client is created for Guestbook
- Hero is a Server Component; entrance and scroll motion share one client primitive (`MotionReveal`) with tokens in `src/utils/motion.ts`
- Couple introduction uses a shared `CoupleProfile` with an editorial mirrored layout on desktop
- Countdown is an isolated Client Component; it receives a UTC timestamp and does not import wedding content
- Calendar math uses `wedding.timezone` (`Asia/Ho_Chi_Minh` by default)
- Gallery grid markup and `next/image` thumbnails are composed in a Server Component; lightbox state is an isolated Client Component
- Missing `public/` image files are skipped (empty frames) instead of requesting 404 URLs
- Until `seo.canonicalUrl` is set, metadata and `robots.txt` stay `noindex`
- Guestbook wishes are server-rendered from a tagged 30s cache; `GET /api/guestbook` uses the same cache; the form POSTs and revalidates the tag
- Invitation UI chrome (guestbook/gift/events/gallery/countdown labels) lives in `weddingData.copy`
- Gift / QR content is read only from `@/config/weddingData`; the copy-account control is an isolated Client Component
- Thank You is a server-rendered closing page: copy, names, and date from `@/config/weddingData`; optional photo; no site-footer navigation
- The page follows the invitation journey; `InvitationNav` only links to sections that currently render; Events occupy the slot after Save the Date
- Document metadata, Open Graph, Twitter cards, robots, and sitemap are built from `weddingData` in `src/lib/metadata.ts` and `src/utils/seo.ts`; no SEO library
