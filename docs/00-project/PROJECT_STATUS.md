# Project Status

Update this file after every meaningful phase.

## Current Phase

POLISH / VISUAL QA / RESPONSIVE QA / incremental feature additions

## Completed

- [x] Project foundation
- [x] Design system
- [x] Invitation opening experience (sealed envelope overlay before Hero)
- [x] Hero
- [x] Couple
- [x] Save the Date
- [x] Countdown
- [x] Events
- [x] Gallery
- [x] Guestbook
- [x] RSVP / Attendance Confirmation (dedicated section before Thank You; private `rsvp_submissions` table)
- [x] RSVP Admin (`/admin/rsvp` — server-authorized guest list, summary, search, filters, CSV export)
- [x] Album slider + Dress Code; Wedding Gift / Mừng cưới removed from the public site
- [x] Thank You
- [x] Animation audit (shared motion tokens, reduced-motion, one reveal per section)
- [x] SEO
- [x] Performance audit (hero art-direction, font subset, guestbook cache/RSC list, gallery code-split)
- [ ] QA
- [x] Production deployment docs and build gate (`docs/07-deployment/`)
- [x] Fine-art botanical visual refactor (ivory-dominant section rhythm, shared motion system, Lenis desktop smooth scroll)
- [x] Botanical SVG decoration system and refined palette (Deep Forest / Ivory / Sage / Champagne Gold)

## Known Issues

- Wedding content in `src/config/weddingData.ts` is still placeholder-only, so Hero and Couple currently show ornamentation and empty image frames without names, parents, stories, or quotes.
- Save the Date / countdown do not render until `wedding.date.iso` or day/month/year is filled.
- Events section does not render until `weddingData.events` has at least one item.
- Gallery section does not render until `weddingData.gallery` has at least one item whose file exists in `public/`.
- Dress Code does not render until `weddingData.dressCode` has a title, notes, or at least one named color.
- Thank You names and date stay hidden until couple names and wedding date are filled; the optional closing photo renders only when `copy.thankYou.image` points to a file that exists.
- Referenced images (`/images/hero/*`, `/images/couple/*`, `/images/og-image.webp`) are not in the repo yet. Missing files no longer 404; frames stay empty until assets are added.
- SEO metadata is generated from `weddingData.seo` (with couple/wedding fallbacks). Absolute Open Graph URLs, indexing, and the sitemap require `seo.canonicalUrl` to be set to the production domain. Until then the site is `noindex`.
- The guestbook and RSVP server clients read `SUPABASE_SECRET_KEY` and `NEXT_PUBLIC_SUPABASE_URL` only. Publishable/anon keys in env files are unused.
- `.env.example` must stay empty. Live keys belong only in `.env.local` / Vercel.
- `PROJECT_SPEC.md` still contains an illustrative data sample; live data is only `src/config/weddingData.ts`.
- ICS event length is `wedding.calendarDurationHours` in `weddingData` (currently 2). [NEEDS_DECISION] if ceremony length should differ.
- Guestbook and RSVP POST rate limiting is in-memory per server instance. In production, requests without a client IP are rejected (429).
- Guestbook SQL is in `supabase/migrations/20260904000000_guestbook_wishes.sql`; apply it once per Supabase project (already applied on the current project).
- RSVP SQL is in `supabase/migrations/20260915000000_rsvp_submissions.sql`; apply it once per Supabase project before the form can persist. Until applied, RSVP submissions return a server error.
- RSVP admin requires `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `.env.local` / Vercel. Until both are set, login fails closed and no guest list is returned.
- Native `<select>` closed-state labels may truncate on very narrow screens; chevrons keep right padding so bilingual options do not collide.

## Open Decisions

- [ ] Final wedding content
- [ ] Final wedding date/timezone
- [ ] Final venue
- [ ] Final images
- [ ] Production domain
- [x] Whether guestbook moderation is required — default: publish immediately (`is_approved` defaults to true); GET still returns approved rows only
- [ ] Calendar event duration for ICS export
- [x] RSVP guest-of is required (bride / groom / both) to support seating and hospitality planning
- [x] Private RSVP admin at `/admin/rsvp` using a server-only password and HMAC session cookie
- [ ] Whether the couple wants RSVP edit/delete from admin (not in this first version)

## Architecture Decisions

- Next.js App Router (Next.js 16)
- TypeScript
- Tailwind CSS v4 (`@theme` tokens in `globals.css`)
- Framer Motion with a shared motion system in `src/lib/motion/`
- Lenis for desktop/editorial smooth scrolling only (native touch on mobile; respects reduced motion)
- lucide-react
- Supabase
- Vercel
- Single static wedding content source: `src/config/weddingData.ts`
- UI must import wedding content only from `@/config/weddingData`
- Domain types live in `src/types/`
- Guestbook wishes persist in Supabase PostgreSQL via `/api/guestbook`
- RSVP submissions persist in Supabase PostgreSQL via `/api/rsvp` (`public.rsvp_submissions`); they are not stored in Guestbook
- RSVP admin lives at `/admin/rsvp` and is not linked from public navigation. Authorization is a server-only shared password (`ADMIN_PASSWORD`) plus an httpOnly HMAC session cookie (`ADMIN_SESSION_SECRET`). Middleware and server loaders both deny unauthenticated access before any privileged RSVP query.
- Browser never receives `SUPABASE_SECRET_KEY`; no browser Supabase client is created for Guestbook or RSVP
- Same-origin POST checks and in-memory rate limiting live in `src/lib/http/` and are reused by Guestbook and RSVP with namespaced keys
- Hero is a Server Component; sequential entrance lives in `HeroIdentity`, scroll motion uses `MotionReveal` with tokens in `src/lib/motion/`
- The invitation opening is a client overlay (`OpeningExperience`) that scroll-locks with the existing Lenis provider, then fades into the current Hero without routing
- Couple introduction uses a shared `CoupleProfile` with an editorial mirrored layout on desktop
- Countdown is an isolated Client Component; it receives a UTC timestamp and does not import wedding content
- Calendar math uses `wedding.timezone` (`Asia/Ho_Chi_Minh` by default)
- Gallery markup lives in a Server Component; the album slider and lightbox are isolated Client Components reusing `weddingData.gallery`
- Dress Code is a local attire insert after Album; pastel swatch hex values stay in `weddingData.dressCode` and do not enter the global palette
- Missing `public/` image files are skipped (empty frames) instead of requesting 404 URLs
- Until `seo.canonicalUrl` is set, metadata and `robots.txt` stay `noindex`
- Guestbook wishes are server-rendered from a tagged 30s cache; `GET /api/guestbook` uses the same cache; the form POSTs and revalidates the tag
- Invitation UI chrome (guestbook/events/gallery/countdown/rsvp labels) lives in `weddingData.copy`
- RSVP is a Warm Ivory stationery insert immediately before Thank You; form copy and guest-of labels come from `@/config/weddingData`; persistence is private (RLS on, no public SELECT/INSERT)
- Thank You is a server-rendered closing page: copy, names, and date from `@/config/weddingData`; optional photo; no site-footer navigation
- The page follows the invitation journey; `InvitationNav` only links to sections that currently render; Events occupy the slot after Save the Date; Dress Code sits after Album; RSVP occupies the slot after Guestbook
- Document metadata, Open Graph, Twitter cards, robots, and sitemap are built from `weddingData` in `src/lib/metadata.ts` and `src/utils/seo.ts`; no SEO library
- Wedding Gift / Mừng cưới is not part of the public invitation; gift components, QR assets, and public gift copy were removed

## RSVP implementation notes (2026-09-15)

- Placement: Guestbook → RSVP (`#rsvp`) → Thank You.
- Visual: Warm Ivory section, paper-cream reply-card insert, Champagne Gold hairline fields (`stationery-field`), Deep Forest headings, existing display/body/script fonts, monogram + botanical divider.
- Motion: `softReveal` / `fadeReveal` for the section; grouped form reveal; `fadeScale` success; existing `[0.16, 1, 0.3, 1]` easing.
- Persistence: `POST /api/rsvp` → server validation → Supabase `rsvp_submissions`. No LocalStorage. No Guestbook reuse.
- Migration: `supabase/migrations/20260915000000_rsvp_submissions.sql` must be applied once per Supabase project.
- Next recommended polish: apply the RSVP migration on the live Supabase project, then visually QA the bilingual selects at 320px and the attending/declined success copy on device.

## RSVP Admin implementation notes (2026-09-15)

- Route: `/admin/rsvp` (login at `/admin/login`). Not in public nav. `robots.txt` disallows `/admin/`.
- Auth: no existing user/auth system was present. Smallest secure fit: env password + HMAC httpOnly cookie. Password and session secret never go to the browser. Login is rate-limited.
- Data access: after authorization, the Next.js server lists `rsvp_submissions` with `SUPABASE_SECRET_KEY`. RLS is unchanged: public still has no SELECT/INSERT on RSVP.
- CSV: `GET /admin/rsvp/export` re-checks the session, then returns UTF-8 CSV (BOM for Excel) of the authorized (optionally filtered) list.
- No edit/delete in this version.
- Manual setup: set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (16+ chars) in `.env.local` and Vercel.

## Album slider + Dress Code notes (2026-09-15)

- Album: one large editorial image, previous/next buttons, looping thumbnail strip, existing lightbox on the main image. No carousel package.
- Dress Code: ivory insert immediately after Album (`#dress-code`). Local swatches Beige `#E9D8C6`, Pastel Pink `#F1CDD3`, Pastel Blue `#CFE1E8`.
- Public Wedding Gift / Mừng cưới removed (section, nav, QR, copy-account). Event-level `dressCode` strings on wedding events are unchanged.
