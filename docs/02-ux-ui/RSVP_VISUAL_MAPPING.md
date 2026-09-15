# RSVP Visual Mapping — Reference Screenshot → Current Fine-Art Botanical System

## Goal

Use the supplied RSVP screenshot as a structural reference, but map its visual language into the CURRENT project palette and typography.

Do NOT clone the screenshot's cold light-gray background or brown/gold text exactly.

The current project must remain:

Warm Ivory
× Vintage Forest Green
× Botanical Sage
× Champagne Gold
× Deep Ink

---

## 1. Color Mapping

### Section background

Reference:
very light gray/white textured surface

Current project mapping:

Primary:
- `Warm Ivory #FAF8F3`

Alternative paper band:
- `Paper Cream #F3EEE4`

Use whichever semantic background token already exists.

Do NOT use cold `#FFFFFF` as the dominant RSVP section.

---

### Form surface

Preferred:
- transparent over the section paper surface, OR
- `Soft White #FFFEFB` at subtle tonal contrast if the form needs a paper insert

Avoid a generic white card floating on the page.

If a separate form insert is used:
- very subtle paper texture
- almost-flat contact shadow
- restrained border
- no obvious card UI

---

### Primary body text

Reference:
warm brown/gold serif

Current mapping:

Primary text:
- `Deep Ink #26332D`

Secondary/refined copy:
- `Vintage Green #234C3D`

Do not render all paragraphs in gold.

---

### Heading / RSVP title

Preferred:
- `Deep Forest #18392F`
or
- `Vintage Green #234C3D`

Small decorative accent:
- `Champagne Gold #C6A15B`

---

### Input text

- `Deep Ink #26332D`

Placeholder:
- use current muted text token;
- if absent, derive from Deep Ink/Vintage Green with lower opacity;
- maintain readable contrast.

---

### Input border

Reference:
warm gold/brown outline

Current mapping:
- `Champagne Gold #C6A15B`

But use it as a restrained hairline.

Recommended visual strength:
- normal: roughly 55–75% perceived strength, depending on background
- hover: slightly stronger
- focus: clear but elegant, optionally paired with Botanical Green/Forest focus treatment

Do not make every control look metallic.

---

### Select chevron

- Champagne Gold or Vintage Green
- small and functional
- enough right padding so long bilingual labels never collide

---

### Submit button

Recommended default:

Option A — outlined stationery style:
- background: transparent / paper
- border: Champagne Gold
- text: Deep Forest
- hover/focus: Vintage Green background + Warm Ivory text
- small Champagne Gold detail may remain

Option B — forest seal style, if this matches current project better:
- background: Vintage Green
- text: Warm Ivory
- restrained Champagne Gold border/accent

Prefer whichever is already closer to current CTA primitives.

Do not create a brand-new button system only for RSVP.

---

### Error color

Use the project's existing semantic destructive/error token.

Do not force wedding palette colors onto validation errors if contrast or clarity suffers.

---

## 2. Typography Mapping

Reference:
classic serif form styling

Current mapping:
- section display / title: current premium display serif, typically Cormorant Garamond if already configured
- intro/body copy: current body serif, typically Lora if already configured
- input/control text: current readable body font
- script: only optional decorative "RSVP", "&", signature, or small accent — never form labels/fields

Button:
- serif or current CTA type style
- modest uppercase/tracking if already part of design system
- avoid overly bold weight

Do NOT import new fonts for this section.

---

## 3. Shape Mapping

Reference controls:
rounded/pill outline

Current adaptation:

Single-line inputs/selects:
- elegant rounded rectangle
- enough height for touch accessibility
- radius consistent with current project
- avoid exaggerated modern SaaS pill if it clashes with existing stationery language

Textarea:
- same border language
- slightly larger radius
- minimum useful height on mobile

Button:
- can use a refined pill/rounded shape if the current project CTA system supports it

---

## 4. Spacing Mapping

The screenshot is visually dense.

Current project should breathe more.

Increase:
- space between intro copy and form
- form field group spacing
- spacing around submit CTA
- top/bottom section padding

Preserve a calm paper-insert rhythm.

Avoid:
- giant gaps that disconnect labels and controls
- identical spacing between every element if hierarchy calls for grouping

---

## 5. Botanical / Ornament Mapping

Reference screenshot is mostly typographic.

For the current project, add only subtle identity cues:

Possible:
- small botanical divider above title
- low-opacity corner botanical SVG
- tiny monogram above RSVP heading
- hairline Champagne Gold divider

Use existing botanical assets.

Do not add multiple decorative corners around every input.

---

## 6. Suggested Visual Composition

```text
[ subtle botanical ornament / monogram ]

        XÁC NHẬN THAM DỰ
                RSVP

Vietnamese invitation copy
English invitation copy

[ Guest name                              ]

[ Message                                 ]
[                                         ]

[ Attendance                         ▾    ]

[ Number of attendees                ▾    ]

[ Guest of                           ▾    ]

[          SEND / XÁC NHẬN               ]

[ optional discreet privacy/note ]
```

On desktop, keep this as a centered stationery insert with a refined max width.

On mobile, preserve full-width usability with generous page gutters.

---

## 7. Motion Mapping

Reference page uses simple reveal motion.

Current project adaptation:

- title/ornament: existing `softReveal` / equivalent
- intro copy: existing `fadeReveal`
- form: reveal as a grouped unit, or tiny stagger
- success confirmation: `fadeScale` / equivalent if already available

Use the existing easing:
`[0.16, 1, 0.3, 1]`

No bounce.
No large translate.
No dramatic zoom.
No animated borders.
No pulse on form fields.

---

## 8. Desired Final Feeling

The visitor should feel:

"I am filling out the reply card that came with their wedding invitation."

Not:

"I am submitting a web form."

This distinction should guide typography, spacing, surfaces, borders, motion, and success feedback.
