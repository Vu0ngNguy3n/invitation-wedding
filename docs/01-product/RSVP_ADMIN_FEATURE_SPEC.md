# RSVP Admin / Guest Attendance Manager — Feature Specification

## 1. Purpose

Create a private management area for the Bride/Groom or authorized administrator to review RSVP submissions.

This is NOT a public wedding section.

The public website flow remains:

Guest visits invitation
→ completes RSVP
→ RSVP is persisted
→ visitor sees confirmation
→ Thank You remains the public emotional ending

The admin area is a separate private route used to manage attendance data.

Recommended route:

```text
/admin/rsvp
```

If the existing project already has an admin route convention, follow it instead.

---

## 2. Primary Users

Authorized wedding administrators only, typically:

- Bride
- Groom
- trusted wedding organizer

Do not expose RSVP management publicly.

Do not place this page in the main wedding navigation.

---

## 3. Core Dashboard

The RSVP dashboard should show a concise summary:

- Total responses
- Attending
- Declined
- Total expected attendees
- Bride-side responses
- Groom-side responses
- Optional: responses with messages

Do not style these like flashy SaaS KPI cards.

Use a restrained admin interface that remains visually related to the wedding project but prioritizes clarity and utility.

---

## 4. RSVP Table / List

Display at minimum:

- Guest name
- Attendance status
- Number of attendees
- Guest side
- Message indicator / message
- Submitted date/time
- Optional updated date/time if the schema supports edits

Recommended columns:

```text
Guest
Status
Guests
Side
Message
Submitted
```

On mobile, do not squeeze all columns into a tiny horizontal table.

Use either:

- responsive stacked rows
- expandable row details
- horizontal scroll only if it remains usable

Desktop can use a normal data table.

---

## 5. Filters

Provide practical filters:

### Attendance
- All
- Attending
- Declined

### Guest side
- All
- Bride
- Groom
- Both if supported

### Search
Search by guest name.

Optional:
- has message
- submitted date range

Do not overbuild advanced filtering unless needed.

---

## 6. Sorting

Default:

```text
Newest submission first
```

Useful optional sorts:

- Guest name A–Z
- Oldest/newest
- Attendee count

---

## 7. Counts / Summary Logic

Example summary values:

```text
totalResponses
attendingResponses
declinedResponses
totalAttendees
brideSideResponses
groomSideResponses
```

Important:

`totalResponses` and `totalAttendees` are not the same.

Example:

3 RSVP records:
- guest A: attending, 2 people
- guest B: attending, 3 people
- guest C: declined, 0 people

Then:

```text
totalResponses = 3
attendingResponses = 2
declinedResponses = 1
totalAttendees = 5
```

---

## 8. Messages

If RSVP contains a message:

- admin must be able to read the full message;
- long text should not break the table;
- use expandable/detail view when appropriate.

Do not automatically publish RSVP messages into Guestbook.

---

## 9. Export

Recommended feature:

```text
Export CSV
```

CSV should include:

- guest name
- attendance
- attendee count
- guest side
- message
- submitted timestamp

CSV export should be generated from authorized server-side data.

Avoid exposing service credentials in the browser.

Suggested filename:

```text
wedding-rsvp-YYYY-MM-DD.csv
```

Excel/XLSX is not required unless explicitly requested later.

---

## 10. Editing / Deleting

Initial implementation should prioritize safe read access.

Editing/deleting RSVP records is OPTIONAL.

If implementing edits:

- use explicit edit action;
- validate server-side;
- preserve audit-relevant timestamps where practical;
- prevent accidental changes.

If implementing delete:

- require explicit confirmation;
- avoid one-click destructive actions;
- follow existing security patterns.

Do not add edit/delete unless the current product owner wants it or the existing architecture already supports it.

---

## 11. Loading / Empty / Error States

Admin UI must support:

- loading
- empty state
- error state
- retry if appropriate

Example empty state:

```text
Chưa có phản hồi RSVP.
Các xác nhận mới sẽ xuất hiện tại đây.
```

---

## 12. Responsive Requirements

Test:

- 320
- 375
- 390
- 414
- 768
- 1024
- 1280
- 1440+

Desktop:
- summary + table layout
- readable columns
- efficient scanning

Mobile:
- summary remains readable
- filters do not overflow
- rows become stacked/expandable if needed
- no unusable compressed table

---

## 13. Visual Direction

This is an admin interface, so usability has higher priority than decorative presentation.

Still reuse current palette:

- Warm Ivory
- Paper Cream
- Deep Forest
- Vintage Green
- Botanical Sage
- Champagne Gold
- Deep Ink

Use restrained styling.

Avoid:

- neon dashboards
- glassmorphism
- excessive shadows
- large decorative botanical art behind data
- flashy motion
- startup analytics aesthetic

The interface should feel:

```text
quiet
private
elegant
clear
practical
```

---

## 14. Accessibility

Requirements:

- semantic headings
- accessible form controls
- keyboard navigation
- visible focus
- clear status labels
- sufficient contrast
- table headers associated correctly
- accessible dialogs if edit/delete/export confirmation uses dialogs

Do not rely on color alone to distinguish attending vs declined.

Use text labels.

---

## 15. Security Requirement

This route MUST be private.

No RSVP management data should be accessible without authorization.

See:

```text
docs/04-architecture/RSVP_ADMIN_ARCHITECTURE.md
docs/05-database/RSVP_ADMIN_DATA_ACCESS.md
```

Do not implement a cosmetic client-only "admin password" that merely hides UI while leaving data publicly queryable.

Security must be enforced server-side.
