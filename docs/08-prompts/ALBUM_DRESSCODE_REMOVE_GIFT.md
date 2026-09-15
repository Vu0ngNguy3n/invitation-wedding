# Cursor Agent Task — Album Slider + Dress Code + Remove Wedding Gift

Read and treat these as authoritative context:

- `.cursorrules`
- `README.md`
- `CLAUDE.md` if it exists
- `docs/00-project/PROJECT_STATUS.md`
- `docs/01-product/ALBUM_DRESSCODE_REFACTOR_SPEC.md`
- `docs/02-ux-ui/ALBUM_DRESSCODE_VISUAL_SPEC.md`
- `docs/03-content/DRESSCODE_CONTENT_SPEC.md`

Do not code until you inspect the current Album/Gallery, Lightbox, Wedding Gift, navigation, weddingData/config, motion utilities, and page composition.

This is an existing project in POLISH / incremental-refinement phase.

Do NOT:
- rebuild the site
- rerun Master Refactor
- recreate Opening Experience
- redesign unrelated sections
- duplicate album data
- replace the global design system
- add a carousel dependency unless clearly justified
- break RSVP, RSVP Admin, Guestbook, Timeline, Thank You, SEO, or Supabase

## Task

Make exactly these changes:

1. Refactor Wedding Album to:
   - one large active image
   - previous/next arrows
   - thumbnail strip below
   - active thumbnail state
   - loop navigation preferred
   - keyboard accessibility
   - mobile-responsive thumbnail behavior
   - preserve existing album data and useful Lightbox behavior

2. Add Dress Code immediately after / visually adjacent to Album:
   - `DRESS CODE`
   - Beige `#E9D8C6`
   - Pastel Pink `#F1CDD3`
   - Pastel Blue `#CFE1E8`
   - `Nam: Xin vui lòng mặc vest`
   - `Gentlemen: Kindly wear a suit`
   - three elegant circular swatches
   - local palette only; do not replace global palette

3. Remove Wedding Gift / Mừng cưới entirely from the public website:
   - section
   - navigation/anchor
   - gift CTA
   - QR/bank UI specific to gift
   - copy-account UI specific to gift
   - public gift copy
   - dead imports/data/assets after confirming they are truly unused

## Audit first

Before editing, report:
1. current album architecture
2. whether Embla/carousel dependency already exists
3. slider implementation approach
4. whether Lightbox will be preserved
5. Dress Code insertion point
6. weddingData/config changes
7. all Wedding Gift references found
8. expected files to modify/delete
9. whether any dependency is needed

Then proceed.

## Album details

Reuse the existing gallery data source. Do not hardcode images or duplicate arrays.

Main image:
- premium editorial focal point
- correct `next/image` usage
- no distortion
- audit sizes/fill/object-fit/loading/CLS

Arrows:
- real buttons
- aria-labels
- visible focus
- ~44px hit area
- Lucide ChevronLeft/ChevronRight if already available

Thumbnails:
- desktop horizontal row
- mobile horizontal scroll/snap
- subtle active state using existing tokens / Champagne Gold hairline
- no ecommerce styling

Motion:
- reuse existing centralized Motion system
- crossfade preferred
- optional tiny scale
- ~300–500ms
- no bounce or dramatic movement
- reduced-motion safe

Lightbox:
- preserve if working and useful
- do not rewrite unnecessarily

## Dress Code details

Store static Dress Code content in current central config when appropriate.

Global palette remains:
Warm Ivory, Paper Cream, Soft White, Deep Forest, Vintage Green, Botanical Green, Soft Sage, Champagne Gold, Deep Ink.

Dress Code local swatches only:
- Beige `#E9D8C6`
- Pastel Pink `#F1CDD3`
- Pastel Blue `#CFE1E8`

Composition:
Album
→ thumbnails
→ breathing space
→ Dress Code title
→ three circles
→ attire copy
→ next section

Swatches:
- informational, not interactive
- responsive size
- slight overlap allowed
- no glossy gradients
- no thick borders
- no hover selection behavior

Accessibility:
- provide text equivalents for all colors
- do not communicate palette through color alone

## Remove Wedding Gift safely

Audit:
- component
- QRCard
- bank info
- copy-account utilities
- types
- gift data
- gift assets
- nav
- section anchors
- imports
- SEO/public copy

Remove only gift-specific dead code after checking references.
Keep shared utilities used elsewhere.

Do not break:
Opening, Hero, Couple Story, Save The Date, Events, Timeline, Guestbook, RSVP, RSVP Admin, Supabase, Thank You, SEO/OpenGraph, responsive behavior, reduced motion.

## Responsive QA

Test:
320, 375, 390, 414, 768, 1024, 1280, 1440+.

Verify:
- main image prominent
- arrows usable
- thumbnails work and do not overflow page
- active thumbnail visible
- Dress Code circles balanced
- Dress Code copy readable
- no Wedding Gift remains
- no broken nav/anchor/import
- RSVP still works
- Thank You still correct

## Validation

Run:
- typecheck if configured
- `npm run lint`
- `npm run build`

Fix errors introduced by this task.
Do not hide errors with `any`, `@ts-ignore`, `@ts-nocheck`, or broad eslint disables.

Update `docs/00-project/PROJECT_STATUS.md`.

## Final report

Report:
1. files created
2. files modified
3. files deleted
4. Album architecture before/after
5. carousel dependency usage
6. Lightbox status
7. Dress Code data/config changes
8. Dress Code colors
9. Wedding Gift cleanup
10. navigation changes
11. responsive changes
12. accessibility changes
13. motion changes
14. dependencies added/removed
15. lint result
16. typecheck result
17. build result
18. remaining manual visual-review items

Final design test:
Album should feel like browsing a curated wedding photo set.
Dress Code should feel like a printed attire card.
Wedding Gift / Mừng cưới must no longer appear anywhere in the public experience.
