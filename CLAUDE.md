# Wedding Invitation Website — Cursor Project Rules

## 1. Project Mission

Build a premium online wedding invitation that feels like a physical luxury
wedding invitation transformed into an interactive digital experience.

The visual language must be:
- Vintage
- Elegant
- Romantic
- Artistic
- Premium
- Editorial
- Paper-like
- Botanical
- Handcrafted

Primary palette:
- Vintage green
- Ivory / cream
- Light gold
- Kraft / warm paper tones

The website MUST NOT look like:
- SaaS
- Dashboard
- Corporate website
- Generic landing page
- Generic wedding template
- Generic AI-generated website

## 2. Source of Truth

Before implementing a feature, read the relevant documentation:

- Product: `docs/01-product/`
- UX/UI: `docs/02-ux-ui/`
- Content/data: `docs/03-content/`
- Architecture: `docs/04-architecture/`
- Database/API: `docs/05-database/`
- Development/QA: `docs/06-development/`
- Deployment: `docs/07-deployment/`
- Phase prompts: `docs/08-prompts/`

If documentation conflicts with an existing implementation, stop and explain
the conflict before making a destructive change.

If a requirement is unclear, mark it as `[NEEDS_DECISION]` instead of silently
inventing business requirements.

## 3. Technical Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Supabase / PostgreSQL
- Vercel

Use Server Components by default.
Use Client Components only when interactivity, browser APIs, or client state
requires them.

## 4. Coding Rules

- TypeScript only.
- Strict typing.
- Do not use `any` unless there is a documented technical reason.
- Prefer small, single-responsibility components.
- Create reusable components instead of duplicating markup.
- Inspect existing components before creating alternatives.
- Keep wedding-specific content out of UI components.
- Avoid unnecessary dependencies.
- Avoid inline styles. Prefer Tailwind classes and shared design tokens.
- Use `next/image` for application images.
- Use semantic HTML.
- Keep accessibility in scope from the first implementation.
- Never expose server-only secrets to client code.

## 5. Responsive Rules

Mobile-first is mandatory.

Every feature must be checked at:
- Small mobile
- Large mobile
- Tablet
- Desktop
- Wide desktop

Avoid:
- Horizontal overflow
- Fixed-width layouts that break on mobile
- Desktop-only interaction patterns
- Hover-only essential functionality

## 6. Motion Rules

Use Framer Motion for:
- Hero entrance
- Scroll reveal
- Section transitions
- Image/lightbox transitions
- Meaningful micro-interactions

Motion must be:
- Elegant
- Subtle
- Fast enough to feel responsive
- Consistent

Respect `prefers-reduced-motion`.

Do not animate everything.

## 7. Icon Rules

Use `lucide-react` for interface icons.
Do not manually create SVG icons when a suitable Lucide icon exists.

## 8. Data Rules

Static wedding content belongs in `src/config/weddingData.ts`.

Components, layouts, and metadata must import wedding content only from
`@/config/weddingData`.

Do not hardcode bride/groom names, dates, events, locations, banking
information, QR codes, gallery images, or wedding copy in UI components.

Shared domain types belong in `src/types/`.

Database-backed guestbook wishes MUST NOT be stored in static data,
LocalStorage, mock JSON, or in-memory state.

## 9. Guestbook Rules

Architecture:

Browser
→ Next.js Route Handler
→ Server validation
→ Supabase
→ PostgreSQL

Requirements:
- Persistent database
- Validation
- Length limits
- Safe rendering
- Rate/abuse protection appropriate for the deployment
- RLS enabled
- Server-only secret never exposed to browser
- Loading, success, empty, and error states
- No mock persistence

## 10. Images

- Use `next/image`.
- Provide meaningful alt text.
- Avoid layout shift by defining image dimensions/aspect ratios.
- Lazy-load below-the-fold gallery images.
- Use appropriate image sizes.
- Do not use enormous source images when smaller optimized assets are enough.

## 11. SEO

Implement:
- Metadata
- Open Graph
- Twitter/X card metadata where appropriate
- Canonical URL when deployment domain is known
- Semantic heading hierarchy
- Meaningful page title and description

## 12. Cursor Workflow

For every task:

1. Read relevant documentation.
2. Inspect the existing repository.
3. Identify impacted files.
4. Explain a concise implementation plan.
5. Implement only the requested scope.
6. Run typecheck/lint/build when applicable.
7. Fix discovered issues.
8. Report changed files and validation results.
9. Do not silently expand scope.

## 13. Quality Gate

A feature is not complete until:
- TypeScript passes
- Lint passes
- Build passes
- Responsive behavior is considered
- Accessibility is considered
- No avoidable console errors
- No wedding-specific hardcoding in components
- No unnecessary duplicated logic
- Documentation/status is updated when the architecture or behavior changes

## 14. Priority

When requirements compete, prioritize:

1. Functional correctness
2. Security
3. Accessibility
4. Responsive UX
5. Performance
6. Maintainability
7. Visual fidelity
8. Decorative polish
