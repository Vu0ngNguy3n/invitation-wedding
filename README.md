# Wedding Invitation — Cursor Specification Package

This package is the documentation/data foundation for implementing the
wedding invitation website with Cursor.

## 1. Source of truth

This repository is the wedding invitation Next.js app.

Keep these files as the source of truth:
- `CLAUDE.md`
- `docs/`
- `src/config/weddingData.ts`
- `.env.example`

## 2. Important rule

Do not ask Cursor to "build the entire website" in one prompt.

Use:
`docs/08-prompts/00-INIT.md`
then execute phases sequentially.

## 3. Recommended workflow

1. Repository audit
2. Foundation
3. Design system
4. Hero
5. Couple
6. Save the Date + Countdown
7. Events
8. Gallery
9. Guestbook
10. Gifts
11. Thank You
12. SEO/Performance
13. QA
14. Final review

## 4. Content

Replace placeholders in:
- `src/config/weddingData.ts`

Do not put wedding-specific data directly into components.
Import wedding content only from `@/config/weddingData`.

## 5. Supabase

Review:
- `supabase/migrations/20260904000000_guestbook_wishes.sql`
- `docs/05-database/API_SPECIFICATION.md`

Use `.env.local` for real credentials. On Vercel, set `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the project settings.

Do not commit `.env.local`.

## 6. Project state

Keep `docs/00-project/PROJECT_STATUS.md` updated after every phase.

## 7. Git

Recommended commit after each successful phase:

`phase-01: foundation`
`phase-02: design-system`
`phase-03: hero`
...

This makes it easy to revert a problematic AI-generated change.
