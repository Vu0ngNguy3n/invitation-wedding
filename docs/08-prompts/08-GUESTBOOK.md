# Cursor Prompt — Phase 08: Production Guestbook

Read:
- `CLAUDE.md`
- `docs/05-database/DATABASE_DESIGN.md`
- `docs/05-database/DATABASE_SCHEMA.sql`
- `docs/05-database/RLS_POLICIES.sql`
- `docs/05-database/API_SPECIFICATION.md`
- `docs/06-development/CODING_STANDARDS.md`

Implement:
Browser
→ Next.js Route Handler
→ server validation
→ Supabase
→ PostgreSQL

Requirements:
- persistent database
- POST /api/guestbook
- GET /api/guestbook
- strict server validation
- safe text rendering
- loading state
- success state
- empty state
- error state
- abuse/rate protection appropriate to the project
- RLS enabled
- server-only Supabase secret
- no LocalStorage
- no mock JSON
- no in-memory persistence

Never expose server secrets to client code.

Inspect existing code before implementation.
Run typecheck, lint, build.
