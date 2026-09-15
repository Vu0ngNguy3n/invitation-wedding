# Data Flow

## Static Wedding Data

`src/config/weddingData.ts`
→ page/feature component
→ presentation

Examples:
- couple
- wedding date
- events
- gallery
- dress code

## Guestbook

Client form
→ POST `/api/guestbook`
→ same-origin check, size limit, validation, rate limit
→ Supabase (server secret)
→ tagged cache revalidation
→ `router.refresh()` for the RSC list

For reading on the invitation page:
Server Component
→ tagged `unstable_cache` (30s) over approved wishes
→ render wishes

`GET /api/guestbook` remains available as an uncached JSON read path. The page UI does not call it.

## RSVP

Client form
→ POST `/api/rsvp`
→ same-origin check, size limit, validation, rate limit
→ Supabase (server secret)
→ in-context success state on the invitation (no public list)

RSVP rows are private planning data. They must not be written to `guestbook_wishes`.

## RSVP Admin

Authorized admin
→ `/admin/login` (server action, httpOnly HMAC cookie)
→ `/admin/rsvp` (session check, then privileged list)
→ optional `GET /admin/rsvp/export` (session check, then CSV)

Unauthenticated requests never receive RSVP rows.



## Security Boundary

Public browser:
- never receives secret Supabase key
- only receives data intended for public display

Server:
- owns privileged credentials
- validates and normalizes input
- controls access to database operations
