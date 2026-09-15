# RSVP Admin — Data Access & Database Specification

## 1. Purpose

Define how the private RSVP admin interface reads and optionally manages RSVP submissions.

This document complements the RSVP public form specification.

---

## 2. Inspect Current RSVP Schema

Before creating anything new, inspect the actual migration/schema used by RSVP.

Do not create a duplicate table if RSVP persistence already exists.

Expected conceptual fields may include:

```text
id
guest_name
attendance
attendee_count
guest_of
message
created_at
updated_at
```

Actual names must follow the current project schema.

---

## 3. Data Semantics

Attendance values should be stable internal values, e.g.:

```text
attending
declined
```

Guest side may be:

```text
bride
groom
both
```

Do not store translated UI strings as database enum/business values if the current schema can use stable values.

---

## 4. Admin Read Access

Public RSVP submission access and admin RSVP read access have different security requirements.

Public users may need permission to submit RSVP.

They should NOT automatically gain permission to list all RSVP records.

The database/RLS architecture must enforce this distinction.

---

## 5. RLS / Authorization

Inspect existing RLS policies before changes.

Target behavior:

### Public
May submit an RSVP if the product allows public RSVP submission.

### Public
Must NOT be able to list all RSVP submissions.

### Authorized Admin
May read RSVP submissions through the project's secure authenticated/server-side mechanism.

### Admin mutation
Edit/delete only if explicitly implemented and authorized.

Do not weaken RLS simply to make the admin page work.

---

## 6. Secret / Elevated Key Usage

If the project uses a server-only Supabase secret/service key:

- use it only in server-only code;
- check admin authorization before every privileged query;
- never expose it in Client Components;
- never prefix it with `NEXT_PUBLIC_`.

---

## 7. Admin Query Fields

Typical admin listing:

```text
id
guest_name
attendance
attendee_count
guest_of
message
created_at
```

Fetch only necessary fields.

---

## 8. Summary Calculations

The dashboard may calculate:

```ts
totalResponses
attendingResponses
declinedResponses
totalAttendees
brideSideResponses
groomSideResponses
```

These can be calculated server-side from the result set for a normal wedding-size dataset.

Do not create complex aggregate infrastructure unless necessary.

---

## 9. Search / Filter

For a modest dataset:

- filter by attendance
- filter by guest side
- search guest name
- order by newest first

Use database filtering when practical.

Do not load unrestricted data into a public client merely to filter it.

---

## 10. CSV Export

CSV export is an authorized administrative operation.

Recommended columns:

```text
Guest Name
Attendance
Attendee Count
Guest Side
Message
Submitted At
```

Escape CSV fields correctly.

Generate UTF-8 compatible output suitable for Vietnamese names/diacritics.

Prefer adding a UTF-8 BOM only if needed for Excel compatibility and consistent with project requirements.

---

## 11. Migration Policy

If RSVP table already exists:
→ do not recreate it.

If new columns/indexes are needed:
→ create a focused migration.

Potential useful indexes only if justified:

```text
created_at
attendance
guest_of
```

Do not add speculative indexes for a tiny dataset.

---

## 12. Data Privacy

RSVP data may contain guest names and personal messages.

Treat it as private event data.

Do not expose:

- full RSVP lists publicly
- messages publicly by default
- admin API responses to unauthenticated clients

Do not send RSVP admin data to analytics tools unnecessarily.
