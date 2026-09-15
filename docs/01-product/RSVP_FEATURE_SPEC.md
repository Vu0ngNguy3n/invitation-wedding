# RSVP / Attendance Confirmation — Product & UI Specification

## 1. Purpose

Add an RSVP / attendance-confirmation section immediately BEFORE the final Thank You / Footer section.

This is an incremental addition to the existing premium wedding invitation website.

Do NOT rebuild the website.
Do NOT redesign unrelated sections.
Do NOT replace the current Fine-Art Botanical design system.

The RSVP section should feel like a printed reply card inserted into a premium physical wedding invitation suite.

Reference feeling:
- refined
- intimate
- bilingual
- calm
- paper-like
- elegant
- editorial
- easy to complete on mobile

The reference screenshot is only a visual/interaction reference. Do not clone its exact colors, dimensions, fonts, or page-builder styling.

---

## 2. Placement

Page flow:

... existing section
→ Wedding Gift / current penultimate content
→ RSVP / Xác nhận tham dự
→ Thank You / Footer

The final Thank You section remains the emotional closing of the website.

RSVP must NOT replace Guestbook.

Guestbook and RSVP have different purposes:

- Guestbook = public/private wedding wishes / congratulations
- RSVP = structured attendance confirmation for planning

Do not merge the two data models unless the existing backend architecture intentionally does so and the semantics remain clean.

---

## 3. Content Hierarchy

Recommended structure:

small botanical ornament or monogram

XÁC NHẬN THAM DỰ
RSVP

short Vietnamese message

short English message

form

submit CTA

small privacy / confirmation note if useful

The intro copy should remain concise.

Suggested copy:

Vietnamese:
"Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất.
Trân trọng!"

English:
"Please confirm your attendance so that we can prepare to welcome you.
Sincerely!"

If the project already stores copy in a central wedding-data/config file, put these strings there instead of hardcoding them inside JSX.

---

## 4. Form Fields

Minimum fields, based on the reference:

### Guest name
Required.

Suggested label:
"Tên khách mời / Guest name"

Input:
text

---

### Attendance
Required.

Suggested label:
"Bạn sẽ tham dự chứ? / Will you join us?"

Options:
- "Mình chắc chắn sẽ đến / Accept with pleasure"
- "Xin lỗi, mình không thể tham dự / Decline with regret"

Use stable internal values such as:
- `attending`
- `declined`

Do not store UI labels as business-logic values if a typed enum/union is more appropriate.

---

### Number of attendees
Conditionally required when attendance = attending.

Suggested label:
"Số người tham dự / Number of attendees"

Options should come from current project requirements.

Typical values:
1
2
3
4

If declined:
- hide/disable this field, or
- automatically set it to 0

Choose the solution that best fits the existing form architecture.

---

### Guest side
Optional or required according to actual wedding-planning needs.

Suggested label:
"Bạn là khách mời của ai? / Are you a guest of the bride or groom?"

Possible stable values:
- `bride`
- `groom`
- optionally `both`

Use Bride/Groom names from the existing wedding data source if names are displayed in the options.

---

### Message
Optional unless the product owner explicitly wants it required.

Suggested label:
"Lời nhắn đến cô dâu chú rể / Message to the bride and groom"

Textarea.

This can be stored with RSVP, but it must not automatically become a public Guestbook wish unless that behavior already exists and is explicitly intended.

---

## 5. Submit States

The form must support:

- idle
- validating
- submitting
- success
- error

Prevent duplicate submissions while submitting.

After success:

Preferred behavior:
- keep the visitor in context;
- replace or soften the form with a graceful confirmation state;
- optionally show a small botanical ornament / monogram;
- do not use a loud SaaS toast as the only success feedback.

Suggested confirmation:

"Cảm ơn bạn đã xác nhận.
Chúng mình rất mong được gặp bạn trong ngày đặc biệt này."

If declined, use copy that remains warm and appropriate:
"Cảm ơn bạn đã phản hồi.
Chúng mình rất trân trọng tình cảm của bạn."

Do not falsely show "hẹn gặp bạn" to declined guests.

---

## 6. Validation

Requirements:

- trim text inputs;
- validate required fields;
- validate party size;
- conditional validation based on attendance;
- preserve accessible inline error messages;
- do not rely only on color to show an error;
- focus/announce relevant errors accessibly when practical.

Do not use `any`, `@ts-ignore`, `@ts-nocheck`, or blanket ESLint disables.

---

## 7. Backend / Supabase

Before implementation:

1. inspect the current Supabase client setup;
2. inspect existing migrations/schema;
3. inspect Guestbook/Wishes tables and data flow;
4. determine whether an RSVP table/function already exists.

Do NOT silently overload the Guestbook table just because Supabase is already available.

Preferred conceptual RSVP record:

```ts
type RSVPAttendance = "attending" | "declined";
type RSVPGuestOf = "bride" | "groom" | "both";

interface RSVPSubmission {
  guestName: string;
  attendance: RSVPAttendance;
  attendeeCount: number;
  guestOf?: RSVPGuestOf;
  message?: string;
}
```

If no RSVP persistence exists and persistence is required:
- add the smallest clean Supabase schema/migration consistent with the current project;
- follow existing RLS/security conventions;
- do not expose service-role keys to the browser;
- do not introduce another backend;
- document the migration.

If the project already has a server action/API route pattern for mutations, reuse it.

Keep Client Component boundaries small.

---

## 8. Responsive Layout

Mobile first.

Recommended form width:
- narrow/mobile: full width minus page gutters
- tablet/desktop: centered paper-insert composition with readable max width, roughly 560–720px depending on current layout system

Do not stretch form controls across a huge desktop viewport.

At 320px:
- no horizontal overflow
- labels remain readable
- long bilingual select text does not collide with chevrons
- tap targets are >= ~44px
- textarea remains comfortable to use
- submit button is fully visible

Desktop:
- maintain generous whitespace
- form should look intentional, not tiny/lost
- avoid making it look like a checkout form

---

## 9. Form Shape Language

Reference screenshot uses thin rounded outlines.

Translate that into the current project as:

- thin Champagne Gold hairline borders
- modest rounded/pill treatment for single-line controls if consistent with current system
- larger but restrained radius for textarea
- no heavy shadows
- no glass effect
- no thick gold stroke
- no pure-white generic form card

The section itself may be a paper surface rather than a floating card.

Preferred:
Warm Ivory / Paper Cream background
+ faint paper grain
+ thin ornamental accents
+ generous vertical rhythm

---

## 10. Motion

Use the current centralized Motion / Framer Motion system.

Recommended motion personality:
- section ornament/title: soft reveal
- intro copy: soft fade/reveal
- form group: one restrained reveal or very small stagger
- success state: gentle fade/scale

Avoid animating every input independently with obvious movement.

If stagger is used:
- around 40–80ms between groups
- small travel distance
- no bounce
- no springy form controls

Respect `prefers-reduced-motion`.

---

## 11. Accessibility

Use semantic form markup.

Requirements:
- real `<form>`
- `<label>` / accessible naming
- `<input>`
- `<textarea>`
- accessible select implementation
- submit `<button>`
- keyboard usable
- visible focus states
- sufficient contrast
- errors associated with relevant fields
- success/error states announced appropriately where practical

Native `<select>` is acceptable and often preferable unless the project already has an accessible select primitive.

Do not introduce a component library just for selects.

---

## 12. Functional Boundaries

The implementation must NOT break:

- Opening Experience
- Hero
- countdown/calendar
- existing events/map links
- Album/Lightbox
- Guestbook/Supabase
- Wedding Gift/QR
- metadata/SEO
- Thank You
- smooth scrolling
- reduced motion
- responsive behavior

---

## 13. QA

Test at minimum:

- 320
- 375
- 390
- 414
- 768
- 1024
- 1280
- 1440+

Verify:

- section appears immediately before Thank You;
- no content overlap;
- bilingual labels wrap correctly;
- select chevrons have enough space;
- textarea does not overflow;
- conditional attendee-count logic works;
- submission cannot duplicate accidentally;
- loading/success/error states work;
- keyboard navigation works;
- focus state is visible;
- form persists through real backend flow if persistence is implemented;
- Guestbook behavior is unchanged.

At completion run the project's configured validation, including at minimum when available:

```bash
npm run lint
npm run build
```

Run typecheck too if the project has a separate command.
