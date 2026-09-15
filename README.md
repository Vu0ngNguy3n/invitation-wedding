# Wedding Invitation — Project Guide

This repository is the existing **Wedding Invitation** website.

The project is no longer in greenfield / initial-build mode.

Current high-level state:

- Master Refactor: **COMPLETE**
- Fine-Art Botanical design system: **APPLIED**
- Invitation Opening Experience: **IMPLEMENTED**
- Core wedding features and business logic: **WORKING**
- Current phase: **POLISH / VISUAL QA / RESPONSIVE QA / incremental feature additions**

Do not ask Cursor to rebuild the entire website or rerun completed phases unless there is a specific reason.

---

## 1. Source of truth

Use these files and folders as the project source of truth:

- `.cursorrules`
- `CLAUDE.md`
- `docs/`
- `docs/00-project/PROJECT_STATUS.md`
- `src/config/weddingData.ts`
- `.env.example`
- current implementation in `src/`
- current Supabase migrations/schema

### Wedding content

`src/config/weddingData.ts` is the **Single Source of Truth** for static wedding-specific content.

Examples:

- bride and groom information
- parents
- initials / monogram data
- wedding date
- venue
- events
- wedding timeline
- gallery
- dress code
- navigation
- SEO content
- invitation copy

Do not hardcode wedding-specific content directly inside presentation components.

Components should consume wedding content from the current project config, typically:

```ts
@/config/weddingData
```

Do not create duplicate static data sources such as:

```text
timelineData.ts
eventsData.ts
galleryData.ts
wedding.json
mockWeddingData.ts
```

Dynamic user-generated or operational data is different:

- Guestbook wishes → persisted through Guestbook/Supabase flow
- RSVP submissions → persisted through an RSVP-specific flow when implemented

Do not store dynamic Guestbook or RSVP records in `weddingData.ts`.

---

## 2. Current Cursor workflow

For every substantial task, Cursor should:

1. Read `.cursorrules`.
2. Read `CLAUDE.md`.
3. Read `docs/00-project/PROJECT_STATUS.md`.
4. Read documentation relevant to the requested feature.
5. Inspect the existing implementation before modifying files.
6. Reuse existing components, tokens, motion presets, data sources, providers, and patterns.
7. Implement only the requested task.
8. Avoid silently redesigning unrelated sections.
9. Run the project's available validation commands.
10. Report files changed, validation results, dependencies added, and remaining risks.

Current working cycle:

```text
Read rules/docs
      ↓
Inspect existing code
      ↓
Plan the requested change
      ↓
Implement incrementally
      ↓
Visual / responsive QA
      ↓
Validate
      ↓
Review
      ↓
Commit
```

Do not use an old "build the whole website phase-by-phase from scratch" workflow for already-completed areas.

---

## 3. Current design direction

The website should feel like a **premium physical Fine-Art Botanical Wedding Invitation**.

Core qualities:

- elegant
- romantic
- editorial
- botanical
- timeless
- tactile
- handmade-paper feeling
- restrained luxury
- generous whitespace
- refined organic motion

The product must not drift toward:

- SaaS landing page
- dashboard
- startup website
- checkout/payment UI
- generic Tailwind component showcase
- futuristic/neon styling
- excessive animation effects

### Current canonical palette

Use semantic design tokens where available.

```text
Warm Ivory       #FAF8F3
Paper Cream      #F3EEE4
Soft White       #FFFEFB
Deep Forest      #18392F
Vintage Green    #234C3D
Botanical Green  #527261
Soft Sage        #B8C8B8
Champagne Gold   #C6A15B
Deep Ink         #26332D
```

Approximate visual balance:

```text
55–65%  Warm Ivory / Paper Cream / Soft White
20–30%  Deep / Vintage Forest Green
5–10%   Sage / Botanical Green
<=5%    Champagne Gold
```

Champagne Gold is an accent, not a dominant UI color.

Do not use cold pure white as the main page surface when a warm paper tone is more appropriate.

---

## 4. Reference website policy

Reference wedding websites may be used to learn:

- composition rhythm
- typography hierarchy
- editorial spacing
- mobile-first storytelling
- image-led layout
- section sequencing
- restrained reveal motion
- countdown presentation
- timeline sequencing
- gallery interaction
- RSVP information hierarchy

Do not clone:

- names
- dates
- addresses
- QR/banking data
- wedding content
- copyrighted photography
- exact coordinates/layout
- proprietary assets
- page-builder code
- exact visual identity

When a reference conflicts with the current Fine-Art Botanical design system, preserve the current project identity and adapt only the useful design principle.

---

## 5. Technical stack

Primary stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Motion / Framer Motion
- lucide-react
- Supabase
- Vercel

General rules:

- Mobile-first.
- Prefer Server Components.
- Use Client Components only when interactivity requires them.
- Keep client boundaries small.
- Use `next/image` where appropriate.
- Reuse the existing Motion architecture.
- Reuse the existing Lenis provider if present; never create a second instance.
- Use `lucide-react` for functional icons only.
- Use custom SVG/image assets for botanical decoration.
- Do not install another package without a clear UX/architecture benefit.

---

## 6. Completed / preserved areas

The following should be treated as existing working systems unless a task explicitly targets them:

- Master Refactor
- Fine-Art Botanical design system
- Opening Experience
- Hero
- Bride & Groom / Couple Story
- Save The Date / Countdown
- Wedding Events
- Wedding Timeline
- Gallery / Lightbox / Album slider
- Dress Code
- Guestbook / Supabase / Wishes
- Thank You / Footer
- SEO / Metadata / Open Graph
- Responsive layout
- centralized motion system

Do not recreate these features blindly during polish work.

---

## 7. RSVP / Attendance Confirmation

The project may include a structured RSVP section immediately before the final Thank You / Footer.

RSVP is different from Guestbook:

```text
Guestbook
→ wedding wishes / messages

RSVP
→ structured attendance confirmation for planning
```

Recommended page placement:

```text
... existing content
      ↓
RSVP / Xác nhận tham dự
      ↓
Thank You / Footer
```

Thank You remains the final emotional closing section.

For RSVP implementation, read:

```text
docs/01-product/RSVP_FEATURE_SPEC.md
docs/02-ux-ui/RSVP_VISUAL_MAPPING.md
```

If a task-specific Cursor prompt exists, use it only for the RSVP implementation task; do not convert it into permanent global rules.

RSVP visual direction:

- physical reply-card feeling
- Warm Ivory / Paper Cream
- Deep Ink / Forest text
- restrained Champagne Gold hairline borders
- current serif typography
- subtle botanical identity
- no SaaS / checkout / banking appearance

Before adding RSVP persistence:

1. inspect current Supabase schema and migrations;
2. inspect Guestbook architecture;
3. check whether RSVP persistence already exists;
4. keep RSVP data semantically separate from Guestbook unless the current schema intentionally models both.

---


## 8. RSVP Admin / Guest Management

RSVP submissions are private planning data.

The project may expose a private authorized management route, recommended:

```text
/admin/rsvp
```

This route must NOT appear in public wedding navigation.

Read:

```text
docs/01-product/RSVP_ADMIN_FEATURE_SPEC.md
docs/04-architecture/RSVP_ADMIN_ARCHITECTURE.md
docs/05-database/RSVP_ADMIN_DATA_ACCESS.md
docs/08-prompts/RSVP_ADMIN_IMPLEMENTATION.md
```

Core admin capabilities:

- total RSVP summary
- attending / declined counts
- expected attendee total
- guest-side summary
- RSVP list
- search
- filters
- CSV export

Security is mandatory.

Do not use client-only hiding, localStorage admin flags, hardcoded browser passwords, or unrestricted public RSVP reads.

Authorization must be enforced server-side and must follow the project's existing auth/Supabase architecture.

## 9. Wedding Timeline

The project includes a dedicated **Wedding Timeline** feature.

Existing timeline documentation may include:

```text
docs/09-timeline/TIMELINE_FEATURE_SPEC.md
docs/09-timeline/TIMELINE_DATA_MODEL.md
docs/09-timeline/TIMELINE_COMPONENT_SPEC.md
docs/09-timeline/TIMELINE_QA_CHECKLIST.md
```

Timeline-specific static content must remain in:

```text
src/config/weddingData.ts
```

Do not create a separate Timeline data file.

Recommended responsive behavior remains:

```text
Mobile
→ vertical timeline

Desktop
→ horizontal / editorial timeline when the current design supports it
```

Do not squeeze all milestones into a single horizontal row on narrow screens.

---

## 10. Supabase / dynamic data

Guestbook wishes and RSVP submissions are dynamic data.

Preferred architecture when consistent with the current implementation:

```text
Browser
   ↓
Next.js Route Handler / Server Action
   ↓
Server-side validation
   ↓
Supabase
   ↓
PostgreSQL
```

Use `.env.local` for local credentials.

Typical environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SECRET_KEY=
```

`SUPABASE_SECRET_KEY` is server-only.

Never:

- expose the secret key to browser code;
- prefix the secret key with `NEXT_PUBLIC_`;
- hardcode credentials;
- commit `.env.local`.

Follow the current project's actual Supabase client and security architecture if it differs from these examples.

---

## 11. Project status

Keep this file updated after substantial completed work:

```text
docs/00-project/PROJECT_STATUS.md
```

Record at minimum:

- completed task/feature;
- important architecture decisions;
- files/features added;
- migrations/schema changes;
- known issues;
- next recommended task.

This prevents Cursor from re-implementing already-completed work.

---

## 12. Validation

After substantial changes, validate the affected feature.

At minimum:

```text
TypeScript / typecheck when configured
ESLint
Responsive behavior
Accessibility basics
```

At completion, run when configured:

```bash
npm run lint
npm run build
```

Also run the project's separate typecheck command if one exists.

For responsive work, review at least:

```text
320px
375px
390px
414px
768px
1024px
1280px
1440px+
```

Before production, additionally verify:

- production build
- SEO / metadata
- performance
- accessibility
- environment variables
- Supabase security
- Guestbook flow
- RSVP flow when implemented
- image paths
- reduced motion
- mobile scroll / Opening Experience

---

## 13. Git workflow

Create focused commits after successful features or polish tasks.

Examples:

```bash
git add .
git commit -m "fix: polish opening and global alignment"

git add .
git commit -m "feat: add RSVP attendance section"

git add .
git commit -m "fix: refine RSVP responsive layout"

git add .
git commit -m "chore: update project documentation"
```

Small focused commits make AI-assisted changes easier to review and revert.

---

## 14. Current development principle

The current priority is not speed or maximum visual effects.

The goal is to keep the project:

- consistent
- maintainable
- responsive
- accessible
- visually coherent
- data-driven
- easy to update
- faithful to the Fine-Art Botanical stationery direction

When refinement is needed, prioritize:

**Typography → Spacing → Composition → Photography → Color → Motion → Decoration**

Every major design decision should answer:

> Does this feel like premium physical wedding stationery?

rather than:

> Does this look like a cool React animation?


## Album Slider + Dress Code / Wedding Gift Removal

Current product direction:
- Wedding Album uses a large-image slideshow with previous/next controls and a thumbnail strip.
- Dress Code sits directly after / visually adjacent to Album.
- Dress Code local colors:
  - Beige `#E9D8C6`
  - Pastel Pink `#F1CDD3`
  - Pastel Blue `#CFE1E8`
- Wedding Gift / Mừng cưới is removed from the public website.

Read:
- `docs/01-product/ALBUM_DRESSCODE_REFACTOR_SPEC.md`
- `docs/02-ux-ui/ALBUM_DRESSCODE_VISUAL_SPEC.md`
- `docs/03-content/DRESSCODE_CONTENT_SPEC.md`
- `docs/08-prompts/ALBUM_DRESSCODE_REMOVE_GIFT.md`

The pastel Dress Code palette is local to that section and does not replace the global Fine-Art Botanical palette.
