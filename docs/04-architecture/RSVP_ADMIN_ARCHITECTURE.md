# RSVP Admin — Architecture & Security Specification

## 1. Goal

Provide a secure private management interface for RSVP submissions without exposing administrative data or privileged Supabase access to public clients.

Recommended route:

```text
/admin/rsvp
```

Follow existing route conventions if the project already has an admin area.

---

## 2. Audit First

Before implementing auth/admin access, inspect:

- current authentication system
- current Supabase client utilities
- middleware
- server actions
- route handlers
- environment variables
- existing admin/private routes
- deployment environment
- Vercel configuration

Do NOT create a second authentication architecture if one already exists.

---

## 3. Authentication Strategy

Preferred order:

### A. Reuse existing authenticated admin system

If the project already uses Supabase Auth, Clerk, Auth.js, or another secure server-verified authentication layer:
→ reuse it.

### B. Supabase Auth

If the project already has Supabase but no admin auth and adding a private admin panel is required:
→ Supabase Auth is a reasonable fit.

Use a strict allowlist for authorized account(s), ideally based on stable user IDs or server-side authorization metadata.

Do not rely only on the email displayed in client state.

### C. Other existing secure project auth

If another secure auth pattern already exists:
→ use that.

---

## 4. Do Not Use Cosmetic Protection

Do NOT implement:

- a hardcoded password in client JavaScript
- localStorage-based "admin logged in" flags
- query-string secrets
- hidden routes without authentication
- public Supabase selects with UI-only hiding

A private-looking UI is not security.

Authorization must be enforced at the server/data layer.

---

## 5. Server Boundary

Preferred conceptual data flow:

```text
Authorized Admin Browser
        ↓
Next.js Server Component / Server Action / Route Handler
        ↓
server-side authorization check
        ↓
Supabase
        ↓
RSVP table
```

Do not expose `SUPABASE_SECRET_KEY` or service-role credentials to browser code.

If elevated server credentials are used:

- keep them server-only;
- authorize the requesting admin before every privileged action;
- never bundle them into Client Components.

---

## 6. Rendering

Prefer a Server Component for initial RSVP list/dashboard data when compatible with the auth architecture.

Use Client Components only for:

- interactive filters
- search UX
- dialogs
- export trigger
- edit controls
- client-side UI state

Keep the authorization/data access boundary server-side.

---

## 7. Route Protection

Protect `/admin/rsvp` using the existing project approach.

Possible mechanisms depending on current architecture:

- middleware
- server redirect
- authenticated layout
- server-side session check

Do not invent middleware if a private-layout pattern already exists.

Unauthorized users should be redirected or denied cleanly.

---

## 8. Admin Navigation

Do not expose `/admin/rsvp` in the public wedding navigation.

Optional admin-only navigation may exist inside a private admin layout.

---

## 9. Query Strategy

Initial dashboard should fetch only necessary fields.

Support:

- newest-first pagination/order
- attendance filter
- guest-side filter
- name search

For a small wedding guest list, server-side filtering without complex pagination may be sufficient.

Do not over-engineer virtualization or data-grid infrastructure unless real data size requires it.

---

## 10. Export Architecture

CSV export should happen through an authorized server boundary.

Recommended:

```text
Admin clicks Export
→ authorized server action/route handler
→ fetch RSVP data
→ generate CSV
→ return download response
```

Do not fetch unrestricted administrative data from the browser with a public Supabase key if RLS does not explicitly authorize it.

---

## 11. Mutation Strategy

If editing/deleting is added:

```text
Admin action
→ server-side authorization
→ validation
→ Supabase mutation
→ revalidate/update UI
```

Never trust client-supplied authorization.

---

## 12. Error Handling

Do not leak:

- SQL details
- secret keys
- stack traces
- internal authorization logic

Show safe user-facing errors and log technical details server-side when the current project has a logging approach.

---

## 13. Dependency Policy

Do not add a heavy admin framework or data-grid package for this feature.

Prefer:

- existing Next.js
- existing Tailwind
- current component primitives
- current Supabase utilities
- native table/forms
- Lucide for functional icons only

Add a dependency only if there is a clear architecture/UX benefit.
