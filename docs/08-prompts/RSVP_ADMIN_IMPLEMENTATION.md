# Cursor Agent Task — Implement Private RSVP Guest Management

Read and treat the following files as authoritative implementation context for this task:

- `.cursorrules`
- `README.md`
- `CLAUDE.md` if it exists
- `docs/00-project/PROJECT_STATUS.md`
- `docs/01-product/RSVP_FEATURE_SPEC.md`
- `docs/02-ux-ui/RSVP_VISUAL_MAPPING.md`
- `docs/01-product/RSVP_ADMIN_FEATURE_SPEC.md`
- `docs/04-architecture/RSVP_ADMIN_ARCHITECTURE.md`
- `docs/05-database/RSVP_ADMIN_DATA_ACCESS.md`

Also inspect the current RSVP implementation, current Supabase schema/migrations, and any existing authentication/private-route architecture.

Do not begin implementation until you understand the current codebase.

This is an EXISTING wedding invitation project.
Do NOT rebuild the public website.
Do NOT redesign unrelated public sections.

## Objective

Create a PRIVATE RSVP management area for authorized wedding administrators.

Recommended route:

```text
/admin/rsvp
```

If the current project already has an admin route convention, follow it.

The page must allow authorized users to review RSVP submissions safely.

## Critical Security Rule

This is NOT just a hidden page.

Administrative RSVP data must be protected server-side.

Do NOT implement:

- client-only hardcoded password checks
- localStorage admin flags
- secret query parameters
- public unrestricted RSVP selects
- service/secret Supabase credentials in browser code

Audit existing auth first.

If secure auth already exists:
→ reuse it.

If Supabase Auth already exists:
→ reuse it.

If no auth exists at all:
→ before implementing a brand-new auth architecture, inspect the project and choose the smallest secure approach compatible with the current stack. Prefer Supabase Auth when it fits the existing Supabase architecture.

Do not add a heavy authentication/admin framework without a clear reason.

## Step 1 — Audit

Inspect:

- current RSVP form implementation
- RSVP table/schema
- Supabase migrations
- Supabase client/server utilities
- RLS policies
- existing auth/session code
- middleware
- private layouts/routes
- current environment variables
- current design tokens
- existing shared form/table/button components
- current project status docs

Before editing, give me a concise implementation plan describing:

1. existing RSVP persistence location
2. current auth situation
3. proposed secure admin authorization strategy
4. route/files to add
5. whether database/RLS changes are required
6. whether any new dependency is required

Then proceed.

## Step 2 — Private Admin Route

Implement an authorized RSVP management page.

Recommended:

```text
/admin/rsvp
```

Do not add it to public wedding navigation.

Unauthorized users must not see RSVP data.

Use server-side authorization.

Prefer Server Components for initial protected data fetching when compatible with the existing architecture.

Keep Client Components limited to interactive UI.

## Step 3 — Dashboard Summary

Show:

- Total responses
- Attending responses
- Declined responses
- Total expected attendees
- Bride-side responses
- Groom-side responses
- optionally responses with messages

Important:

`totalResponses != totalAttendees`

Calculate correctly.

Do not over-style this as a flashy SaaS dashboard.

Use restrained cards/summary blocks or a simple editorial admin summary.

## Step 4 — RSVP List

Display at minimum:

- Guest name
- Attendance status
- Number of attendees
- Guest side
- Message
- Submitted date/time

Default sort:

Newest first.

Desktop:
→ readable table/list

Mobile:
→ responsive stacked/expandable row design when needed

Do not compress a six-column table into an unusable 320px viewport.

## Step 5 — Filters/Search

Implement:

Attendance filter:
- All
- Attending
- Declined

Guest side filter:
- All
- Bride
- Groom
- Both if schema supports it

Search:
- guest name

Keep it simple.

Do not add a large data-grid library.

## Step 6 — CSV Export

Add an authorized:

```text
Export CSV
```

CSV should contain:

- Guest Name
- Attendance
- Attendee Count
- Guest Side
- Message
- Submitted At

Generate/fetch the export through an authorized server boundary.

Ensure Vietnamese names/diacritics export correctly.

Do not expose unrestricted RSVP data through a public client endpoint.

## Step 7 — Visual Direction

This is a private admin utility, not another public wedding section.

Prioritize clarity.

Still reuse the project palette:

Warm Ivory
Paper Cream
Soft White
Deep Forest
Vintage Green
Botanical Green
Soft Sage
Champagne Gold
Deep Ink

Use restrained styling.

Avoid:

- neon
- glassmorphism
- heavy shadow
- analytics-startup visual style
- excessive botanical decoration
- flashy animation

The page should feel:

private
quiet
elegant
clear
practical

## Step 8 — Status Styling

Attendance status must include text:

- Attending / Tham dự
- Declined / Không tham dự

Do not rely on green/red color alone.

Use accessible text badges/labels consistent with project styling.

## Step 9 — Security/Data Access

Inspect current RLS.

Public RSVP users may be allowed to submit.

Public users must NOT gain list/read access to all RSVP records.

Do not weaken RLS to make admin work.

If elevated server credentials are necessary:
- use server-only code;
- authorize admin first;
- never expose secret/service credentials to client.

If current project uses authenticated Supabase users:
- implement/adjust policies according to the existing architecture.

## Step 10 — Editing/Deleting

Do NOT implement edit/delete by default unless:
- it already exists,
- or there is a clear product requirement in current code/docs.

Initial admin feature should prioritize:
- secure viewing
- searching/filtering
- summary
- CSV export

If edit/delete is already architected, preserve and secure it.

## Step 11 — Responsive QA

Test at least:

320
375
390
414
768
1024
1280
1440+

Verify:

- filters do not overflow
- guest names wrap safely
- long messages are readable
- table/list remains usable
- summary does not become cramped
- export control remains accessible

## Step 12 — Accessibility

Maintain:

- semantic headings
- proper table headers when table markup is used
- labels for filter/search controls
- visible focus
- keyboard navigation
- accessible status labels
- accessible dialog if any dialog exists

## Step 13 — Preserve Existing Systems

Do not break:

- public RSVP form
- Guestbook
- Supabase Guestbook flow
- Opening Experience
- public wedding page
- Wedding Gift
- QR
- Gallery/Lightbox
- SEO/metadata
- public navigation
- Thank You
- responsive layout
- reduced motion

## Step 14 — Documentation

Update:

```text
docs/00-project/PROJECT_STATUS.md
```

Record:

- RSVP admin implemented
- route
- authorization strategy
- database/RLS changes
- CSV export
- files changed
- known issues
- next step

If a migration or RLS policy changes:
document it clearly.

## Step 15 — Validation

Run available checks.

At minimum when configured:

```bash
npm run lint
npm run build
```

Run typecheck if separate.

Also verify manually:

- unauthorized access is blocked
- authorized admin can load RSVP list
- filters work
- search works
- totals are correct
- CSV export works
- public RSVP submission still works
- public users cannot list RSVP records

Do not hide errors using:

- any
- @ts-ignore
- @ts-nocheck
- blanket eslint-disable

## Final Report

Report:

1. files created
2. files modified
3. admin route
4. authorization strategy
5. database/RLS changes
6. summary metrics implemented
7. filters/search
8. CSV export
9. responsive behavior
10. accessibility
11. dependencies added
12. lint result
13. typecheck result
14. build result
15. security checks performed
16. any remaining manual setup, especially auth account/environment configuration

Final security test:

An unauthenticated visitor must NOT be able to retrieve the RSVP guest list merely by discovering `/admin/rsvp` or calling a public browser endpoint.
