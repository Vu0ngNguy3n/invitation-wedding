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
- gifts

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

## Security Boundary

Public browser:
- never receives secret Supabase key
- only receives data intended for public display

Server:
- owns privileged credentials
- validates and normalizes input
- controls access to database operations
