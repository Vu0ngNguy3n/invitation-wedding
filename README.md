# Wedding Invitation — Cursor Specification Package

This repository contains the documentation, project rules, data model, and implementation prompts for building the **Wedding Invitation** website with Cursor.

The project should be developed **phase by phase**. Do not ask Cursor to generate or redesign the entire website in a single prompt.

## 1. Source of truth

This repository is the wedding invitation Next.js application.

Keep these files and folders as the project source of truth:

- `.cursorrules`
- `CLAUDE.md`
- `docs/`
- `src/config/weddingData.ts`
- `.env.example`

### Wedding content

`src/config/weddingData.ts` is the **Single Source of Truth** for static wedding-specific content.

Examples:

- bride and groom information
- wedding date
- venue
- events
- wedding timeline
- gallery
- gift / bank / QR information
- navigation
- SEO content
- invitation copy

Do not hardcode wedding-specific content directly inside React components.

Components should consume wedding content from:

```ts
@/config/weddingData
```

Do not create duplicate data sources such as:

```text
timelineData.ts
eventsData.ts
galleryData.ts
wedding.json
mockWeddingData.ts
```

Guestbook wishes are different: they are dynamic user-generated data and must be persisted through the Guestbook API / Supabase, not stored in `weddingData.ts`.

## 2. Cursor workflow rule

Do not ask Cursor to:

```text
Build the entire website.
```

Instead, start with:

```text
docs/08-prompts/00-INIT.md
```

Then execute the implementation prompts sequentially.

Before each phase, Cursor should:

1. Read `.cursorrules`.
2. Read `CLAUDE.md`.
3. Read the documentation relevant to the feature.
4. Inspect the existing implementation before modifying files.
5. Reuse existing components and patterns where appropriate.
6. Implement only the requested feature.
7. Run TypeScript / ESLint validation.
8. Report files created and modified.

Do not let one phase silently redesign unrelated sections.

## 3. Recommended implementation workflow

Recommended order:

1. Repository Audit
2. Foundation / Data Architecture
3. Design System
4. Hero / Opening Invitation
5. Bride & Groom
6. Save the Date + Countdown
7. Wedding Events
8. **Wedding Timeline**
9. Gallery
10. Supabase / Guestbook Backend
11. Guestbook UI
12. Wedding Gift / QR
13. Thank You
14. Page Integration
15. Responsive Review
16. Animation Review
17. SEO / Metadata
18. Performance Audit
19. Accessibility Review
20. Final Code Review
21. Production / Vercel

Each feature should be completed and reviewed before continuing to the next one.

## 4. Wedding Timeline

The project includes a dedicated **Wedding Timeline** feature inspired by a premium printed wedding schedule.

Timeline documentation:

```text
docs/09-timeline/TIMELINE_FEATURE_SPEC.md
docs/09-timeline/TIMELINE_DATA_MODEL.md
docs/09-timeline/TIMELINE_COMPONENT_SPEC.md
docs/09-timeline/TIMELINE_QA_CHECKLIST.md
```

Cursor implementation prompt:

```text
docs/08-prompts/14-TIMELINE.md
```

Recommended page placement:

```text
Wedding Events
      ↓
Wedding Timeline
      ↓
Gallery
```

The Events section answers **where and when the wedding events happen**.

The Timeline section answers **what happens throughout the wedding day and in what order**.

### Timeline responsive behavior

Mobile-first behavior is required:

```text
Mobile
→ vertical timeline

Desktop
→ horizontal timeline
```

Do not squeeze all timeline milestones into one horizontal row on small screens.

### Timeline asset

Add the Timeline background image at:

```text
public/images/timeline/timeline-bg.webp
```

Timeline-specific content must still be stored inside:

```text
src/config/weddingData.ts
```

Do not create a separate Timeline data file.

## 5. Design direction

The website should feel like a **premium physical wedding invitation**, not a generic web template or SaaS landing page.

Core visual direction:

- vintage
- elegant
- romantic
- editorial
- botanical
- premium paper invitation feeling

Core palette:

```text
Forest Green  #1B3B34
Gold          #E0C068
Warm Cream    #F5F0E6
```

Avoid:

- SaaS-style cards
- dashboard layouts
- excessive rounded corners
- heavy shadows
- neon colors
- excessive animation

## 6. Technical stack

Primary stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Supabase
- Vercel

General rules:

- Mobile-first.
- Prefer Server Components.
- Use Client Components only when interactivity requires them.
- Use `next/image` for website imagery where appropriate.
- Use `lucide-react` for icons.
- Do not install another icon package without a strong reason.
- Avoid inline styles; use Tailwind CSS classes.
- Keep components modular and reusable without over-engineering.

## 7. Supabase / Guestbook

Guestbook wishes are persistent data and must not be stored in LocalStorage, static JSON, or `weddingData.ts`.

Review:

```text
supabase/migrations/20260904000000_guestbook_wishes.sql
docs/05-database/DATABASE_DESIGN.md
docs/05-database/API_SPECIFICATION.md
docs/05-database/RLS_POLICIES.sql
```

Preferred architecture:

```text
Browser
   ↓
Next.js Route Handler
   ↓
Server-side validation
   ↓
Supabase
   ↓
PostgreSQL
```

Use `.env.local` for local credentials.

Expected environment variables:

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

Configure the required environment variables in Vercel before production deployment.

## 8. Project state

Keep this file updated after every completed phase:

```text
docs/00-project/PROJECT_STATUS.md
```

Record at minimum:

- completed phase;
- important architecture decisions;
- files/features added;
- known issues;
- next recommended phase.

This helps Cursor understand the current state instead of re-implementing completed work.

## 9. Validation

At the end of each implementation phase, validate the affected feature.

At minimum:

```text
TypeScript
ESLint
Responsive behavior
Accessibility basics
```

Before production, additionally validate:

```text
Production build
SEO / metadata
Performance
Accessibility
Environment variables
Supabase security
Guestbook API
Image paths
```

For responsive features, review at least:

```text
375px
390px
430px
768px
1024px
1440px
```

## 10. Git workflow

Create a Git commit after each successful feature or phase.

Examples:

```bash
git add .
git commit -m "feat: implement wedding hero"

git add .
git commit -m "feat: add wedding events"

git add .
git commit -m "feat: add wedding timeline section"

git add .
git commit -m "feat: add wedding gallery"

git add .
git commit -m "feat: implement guestbook"
```

Small phase-based commits make it much easier to review or revert problematic AI-generated changes.

## 11. Current development principle

When working with Cursor Agent, use this cycle:

```text
Read rules/docs
      ↓
Inspect existing code
      ↓
Plan the requested feature
      ↓
Implement only that feature
      ↓
Validate
      ↓
Review result
      ↓
Commit
      ↓
Continue to next phase
```

The goal is not to generate the website as quickly as possible.

The goal is to keep the project **consistent, maintainable, responsive, visually coherent, and easy to update through `weddingData.ts`**.
