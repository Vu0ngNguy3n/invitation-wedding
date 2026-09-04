# Cursor Agent Prompt — Wedding Timeline

```text
Read and follow:

- .cursorrules
- CLAUDE.md
- docs/02-ux-ui/*
- docs/09-timeline/TIMELINE_FEATURE_SPEC.md
- docs/09-timeline/TIMELINE_DATA_MODEL.md
- docs/09-timeline/TIMELINE_COMPONENT_SPEC.md
- docs/09-timeline/TIMELINE_QA_CHECKLIST.md
- src/config/weddingData.ts
- the existing WeddingData type definitions

VISUAL REFERENCE

Use the provided Wedding Timeline screenshot as visual inspiration.

The reference shows:
- a large elegant "TIMELINE" heading;
- a wedding/detail photo background;
- dark overlay;
- a thin timeline line;
- circular milestone markers;
- one icon for each activity;
- time + activity title + short description;
- 4 milestones: 15:00, 17:00, 18:00, 19:00.

Do NOT copy the screenshot pixel-for-pixel.
Adapt it to the existing project Design System and responsive architecture.

TASK

Implement ONLY the Wedding Timeline feature.
Do not redesign unrelated sections.

PHASE 1 — INSPECT BEFORE CODING

Before modifying files:

1. Read .cursorrules.
2. Inspect the current project folder structure.
3. Inspect src/config/weddingData.ts.
4. Inspect the WeddingData TypeScript definitions.
5. Inspect the existing page section order.
6. Inspect current reusable SectionContainer / SectionHeading / motion primitives.
7. Inspect typography, colors and spacing.
8. Check whether timeline code/data already exists.

Reuse existing primitives where appropriate.
Do not create duplicate abstractions.

PHASE 2 — DATA MODEL

src/config/weddingData.ts is the SINGLE SOURCE OF TRUTH for static wedding content.

Add a strongly typed Timeline model only if it does not already exist.

Recommended shape:

timeline: {
  title
  subtitle?
  backgroundImage?
  backgroundAlt?
  items[]
}

Each item:
- id
- time
- title
- description?
- icon

Use serializable icon keys:
- church
- camera
- utensils
- party

Do NOT store React components in weddingData.ts.

Add this mock timeline data:

15:00
Title: Thánh lễ
Description: Thánh lễ hôn phối
Icon: church

17:00
Title: Đón tiếp khách mời
Description: Welcome guests
Icon: camera

18:00
Title: Chung vui khai tiệc
Description: Wedding dinner
Icon: utensils

19:00
Title: Mini game & khiêu vũ
Description: Mini game & dance party
Icon: party

Timeline config:

title:
"Timeline"

subtitle:
"Cùng chúng mình tận hưởng từng khoảnh khắc trong ngày đặc biệt"

backgroundImage:
"/images/timeline/timeline-bg.webp"

backgroundAlt:
"Không gian tiệc cưới với hoa và thiệp cưới"

If navigation supports section links, add:

{ id: "timeline", label: "Timeline", href: "#timeline" }

Place after Events and before Gallery.
Do not add it if it conflicts with current navigation UX.

PHASE 3 — COMPONENT

Implement WeddingTimeline.

Requirements:
- semantic <section id="timeline">
- heading from weddingData
- optional subtitle
- ordered list <ol>
- timeline.items.map(...)
- no hardcoded timeline content in JSX
- image background
- dark/forest-green overlay
- thin elegant timeline line
- circular milestone markers
- lucide-react icons
- prominent time
- title
- optional description

Icon mapping stays in UI layer:

church -> Church
camera -> Camera
utensils -> UtensilsCrossed
party -> PartyPopper

Fallback: Heart.

Do not install another icon library.

PHASE 4 — RESPONSIVE DESIGN

MOBILE FIRST.

375–430px:
- vertical timeline;
- do NOT squeeze four items into one horizontal row;
- vertical line;
- stacked items;
- readable typography;
- no horizontal overflow.

Tablet:
- choose vertical/transitional layout based on readability.

Desktop:
- horizontal timeline inspired by reference;
- evenly distributed milestones;
- horizontal line through markers;
- consistent icons;
- labels do not overlap;
- premium editorial spacing.

Do not use JS viewport detection if CSS/Tailwind can handle it.

PHASE 5 — VISUAL

Follow existing project Design System.

Direction:
- premium vintage wedding invitation
- romantic
- elegant
- editorial
- forest green
- warm cream
- subtle gold
- botanical feeling

Palette:
Forest Green: #1B3B34
Gold: #E0C068
Warm Cream: #F5F0E6

Do NOT create:
- SaaS cards
- dashboard UI
- thick borders
- large generic rounded cards
- heavy shadows
- neon colors

Background:
`/images/timeline/timeline-bg.webp`

Prefer:
background image
→ dark overlay
→ content

Use next/image where appropriate.
No inline styles.

PHASE 6 — ANIMATION

Use Framer Motion only if it improves the experience.

Recommended:
- title fade-in;
- subtle line reveal;
- stagger milestones;
- slight translateY + fade.

Avoid bounce, aggressive spring, large zoom.
Respect prefers-reduced-motion.

Keep Client Component boundaries small.
Do NOT add "use client" to the whole page.

PHASE 7 — ACCESSIBILITY

Check:
- heading hierarchy;
- semantic ordered timeline;
- decorative icons aria-hidden;
- sufficient contrast;
- readable text over image;
- timeline understandable without icons;
- reduced motion support.

PHASE 8 — INTEGRATION

Add WeddingTimeline after Wedding Events and before Gallery,
unless existing architecture clearly requires another nearby placement.

Do not restructure unrelated sections.

PHASE 9 — VALIDATE

After implementation:

1. Run TypeScript check.
2. Run ESLint.
3. Fix only issues related to this feature.
4. Review at:
   - 375px
   - 390px
   - 430px
   - 768px
   - 1024px
   - 1440px
5. Check horizontal overflow.
6. Check image loading.
7. Check empty timeline items.
8. Check reduced-motion behavior.

FINAL REPORT

Report:
1. Files created.
2. Files modified.
3. Timeline data model added/changed.
4. Component architecture.
5. Responsive behavior.
6. Animation behavior.
7. Image asset still required.
8. TypeScript/ESLint result.

Do NOT continue redesigning other parts of the website.
```
