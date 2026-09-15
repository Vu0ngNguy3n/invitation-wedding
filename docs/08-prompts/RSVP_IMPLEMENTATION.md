# Cursor Agent Task — Add RSVP / Attendance Confirmation Before Thank You

Recommended file location: `docs/08-prompts/RSVP_IMPLEMENTATION.md`

You are working on an EXISTING premium wedding invitation website.

Read `.cursorrules` and the RSVP docs before modifying code:

- `docs/01-product/RSVP_FEATURE_SPEC.md`
- `docs/02-ux-ui/RSVP_VISUAL_MAPPING.md`

This is an incremental implementation task.

DO NOT:
- rerun Master Refactor;
- rebuild the website;
- recreate Opening Experience;
- redesign unrelated sections;
- replace the current Fine-Art Botanical design system;
- add a new animation system;
- install dependencies unless clearly necessary;
- break Guestbook/Supabase, Wedding Gift, Gallery, or Thank You.

## Objective

Add a new RSVP / Attendance Confirmation section immediately BEFORE the final Thank You / Footer section.

The section is inspired structurally by the supplied wedding RSVP reference:

- bilingual invitation copy;
- guest name;
- message to Bride/Groom;
- attendance select;
- number of attendees;
- guest side;
- submit confirmation.

However, DO NOT clone the reference styling.

Translate it into the CURRENT project identity:

Fine-Art Botanical Wedding Invitation
→ Warm Ivory handmade paper
→ Deep/Vintage Forest Green
→ Botanical Sage
→ restrained Champagne Gold
→ Deep Ink
→ current premium serif typography
→ subtle botanical line art
→ refined organic motion

The RSVP section should feel like a physical reply card from the invitation suite.

## Step 1 — Audit before coding

Inspect:

1. `.cursorrules`
2. `package.json`
3. app/page composition and section order
4. current design tokens / CSS variables / Tailwind theme
5. current fonts
6. current centralized Motion/Framer Motion utilities
7. current wedding data/config source
8. existing form components/primitives
9. current Supabase setup
10. Guestbook/Wish schema and mutations
11. existing migrations/schema
12. Thank You component and the section immediately before it

Do not assume filenames.

Reuse current architecture.

Give a short implementation plan before editing.

## Step 2 — Create / integrate RSVP component

Add an RSVP section immediately before Thank You.

Use the existing component/section conventions.

Possible conceptual component name:
`RSVPSection`
or existing project naming convention.

Do not force this name if the architecture uses another pattern.

## Step 3 — Content hierarchy

Create a composition similar to:

subtle botanical ornament / monogram

XÁC NHẬN THAM DỰ
RSVP

Vietnamese intro:
"Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất.
Trân trọng!"

English intro:
"Please confirm your attendance so that we can prepare to welcome you.
Sincerely!"

Then the form.

If the project centralizes copy/data, move these strings to the current config/data source rather than hardcoding presentation data.

## Step 4 — Fields

Implement:

1. Guest name
   - required
   - text input
   - bilingual accessible label

2. Message to Bride/Groom
   - textarea
   - optional unless current product requirements say otherwise

3. Attendance
   - required
   - values should be stable internal values, e.g.:
     - `attending`
     - `declined`
   - labels may be bilingual

4. Number of attendees
   - conditional when attendance = attending
   - use project-appropriate options, typically 1–4
   - if declined, hide/disable or normalize to 0 cleanly

5. Guest side
   - bride / groom / optionally both if appropriate
   - use Bride/Groom names from current wedding data if displaying names
   - do NOT hardcode names

6. Submit button
   - bilingual wording such as:
     `SEND · XÁC NHẬN`
   - or the closest tone already used by project CTAs

## Step 5 — Backend behavior

RSVP is NOT automatically the same thing as Guestbook.

Inspect Supabase architecture first.

If RSVP persistence already exists:
- reuse it.

If it does not exist and the project expects persisted RSVP data:
- add the smallest clean schema/migration consistent with existing Supabase conventions;
- keep strict types;
- follow existing RLS/security approach;
- never expose privileged Supabase credentials;
- reuse existing server action/API mutation patterns when available.

Do not store RSVP records in a Guestbook table merely because it is convenient unless the current schema was intentionally designed for both.

Conceptual typed data:

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

Adapt types to existing project conventions.

## Step 6 — Success/error UX

Support:

- idle
- validation
- submitting
- success
- error

Prevent double submit.

For attending success, use a warm confirmation such as:

"Cảm ơn bạn đã xác nhận.
Chúng mình rất mong được gặp bạn trong ngày đặc biệt này."

For declined success, use different copy:

"Cảm ơn bạn đã phản hồi.
Chúng mình rất trân trọng tình cảm của bạn."

Do not show an attending-specific message to declined guests.

Success state should feel like stationery, not a SaaS toast.

Existing toast infrastructure may still be used for secondary technical feedback, but the section itself should visibly confirm success.

## Step 7 — Visual mapping

Use semantic project tokens whenever they exist.

Target mapping:

Section:
- Warm Ivory `#FAF8F3` or Paper Cream `#F3EEE4`

Optional insert:
- Soft White `#FFFEFB`

Primary text:
- Deep Ink `#26332D`

Heading / strong text:
- Deep Forest `#18392F`
- Vintage Green `#234C3D`

Borders / small luxury details:
- Champagne Gold `#C6A15B`

Botanical support:
- Botanical Green `#527261`
- Soft Sage `#B8C8B8`

Do NOT scatter these raw hex values through JSX if semantic tokens already exist.

Use Champagne Gold as a restrained hairline accent, not as dominant body text.

### Controls

Inputs/selects:
- paper/transparent surface
- elegant thin Champagne Gold border
- Deep Ink text
- readable muted placeholder
- sufficient right padding for select chevron
- accessible minimum height

Textarea:
- same stationery language
- useful mobile height
- restrained radius

CTA:
Prefer reusing the current button primitive.

Desired style:
- outline/paper default with Champagne Gold hairline + Deep Forest text;
- hover/focus may transition to Vintage Green background + Warm Ivory text;
OR reuse an existing Forest CTA if already visually stronger and consistent.

Do not create a new conflicting button language.

## Step 8 — Typography

Reuse current font setup only.

Preferred roles if already present:

- display: Cormorant Garamond
- body: Lora
- script accent: Great Vibes

Do not import a new font for RSVP.

No script font in form labels or input values.

Use typography hierarchy, whitespace, and border detail to create elegance.

## Step 9 — Botanical identity

Use existing botanical SVG/monogram assets.

Possible:
- one small botanical divider above title;
- one low-opacity ornament;
- thin gold divider.

Do not decorate each form control.

Lucide icons are functional only, not botanical decoration.

## Step 10 — Motion

Reuse the current centralized Motion system.

RSVP motion personality:

ornament/title
→ soft reveal

intro copy
→ restrained fade/reveal

form
→ grouped reveal or subtle stagger

success state
→ gentle fade/scale

Use global easing:
`[0.16, 1, 0.3, 1]`

If staggering form groups:
roughly 40–80ms.

Avoid:
- bounce
- large translations
- dramatic scale
- pulsing inputs
- animated borders
- new motion libraries

Respect `prefers-reduced-motion`.

## Step 11 — Responsive behavior

Test:

320
375
390
414
768
1024
1280
1440+

Mobile:
- no overflow;
- bilingual copy wraps cleanly;
- controls remain >= ~44px touch height;
- long select labels do not collide with chevrons;
- form has comfortable gutters;
- textarea is easy to type in.

Desktop:
- form does not stretch too wide;
- use a refined centered paper-insert max width;
- enough whitespace before Thank You;
- section must not feel like checkout/payment UI.

## Step 12 — Accessibility

Use:
- semantic `<form>`
- accessible labels
- native controls or existing accessible primitives
- visible focus states
- linked error messages
- keyboard support
- appropriate status announcement for success/error

Native `<select>` is acceptable.

Do not add shadcn/Radix/another component library just for this feature unless it is already in the project and actually used.

## Step 13 — Preserve existing features

Do not break:

- Opening Experience
- Hero
- countdown/calendar
- Wedding Events/map links
- Album/Lightbox
- Guestbook/Supabase
- Wedding Gift/QR/copy
- Lenis/smooth scrolling
- metadata/SEO/OpenGraph
- Thank You
- reduced motion
- mobile responsiveness

Thank You must remain after RSVP and remain the final emotional closing section.

## Step 14 — QA and validation

Verify real form behavior, not only appearance.

Run available project checks.

At minimum, if configured:

```bash
npm run lint
npm run build
```

Run typecheck if there is a separate command.

Fix errors introduced by this task.

Do not hide errors with:
- `any`
- `@ts-ignore`
- `@ts-nocheck`
- blanket ESLint disables

## Final report

After implementation, report:

1. files changed/created;
2. where RSVP was inserted;
3. whether RSVP persistence already existed or what backend change was made;
4. database/migration changes if any;
5. visual/token mapping used;
6. validation rules;
7. responsive fixes;
8. accessibility work;
9. motion changes;
10. dependencies added (expected: none unless justified);
11. lint result;
12. typecheck result if applicable;
13. build result;
14. anything that still requires manual visual review.

The final visual test:

It should feel like the guest is filling out the physical RSVP reply card included in a premium Fine-Art Botanical wedding invitation suite — not like filling out a generic website form.
