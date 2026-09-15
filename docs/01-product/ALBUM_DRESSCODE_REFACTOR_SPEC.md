# Album Slider + Dress Code + Remove Wedding Gift — Feature Specification

## Scope
Update exactly three areas:
1. Refactor Wedding Album into a premium slideshow.
2. Add Dress Code immediately after / visually adjacent to Album.
3. Remove Wedding Gift / Mừng cưới completely from the public website.

Do not rebuild the site, rerun Master Refactor, recreate Opening Experience, or redesign unrelated sections.

## Album
Required interaction:
- one large active image
- previous/next buttons
- thumbnail strip below
- active thumbnail state
- loop navigation preferred
- keyboard accessible
- mobile responsive
- reuse existing album data
- preserve current Lightbox if useful
- no duplicate gallery arrays

Desktop:
- large editorial focal image
- balanced thumbnail row

Mobile:
- large image remains prominent
- thumbnails can horizontally scroll/snap
- controls remain easy to tap
- no horizontal page overflow

Use `next/image` appropriately and avoid distortion.

## Dress Code
Place immediately after / visually connected to Album.

Heading:
`DRESS CODE`

Copy:
- `Nam: Xin vui lòng mặc vest`
- `Gentlemen: Kindly wear a suit`

Palette:
- Beige `#E9D8C6`
- Pastel Pink `#F1CDD3`
- Pastel Blue `#CFE1E8`

These colors are LOCAL to Dress Code and do not replace the global Fine-Art Botanical palette.

Display three elegant circular swatches, optionally with slight overlap. They are informational, not interactive.

Static content should live in the project's existing wedding data/config source when appropriate.

## Remove Wedding Gift
Remove all public Wedding Gift / Mừng cưới references, including where applicable:
- section/component
- public navigation item
- section anchor
- QR/bank UI
- copy-account controls
- CTA/buttons
- gift-specific public copy
- page imports/composition references

After removal, audit gift-specific components, types, data, assets, hooks and imports. Delete only items confirmed unused. Preserve shared utilities.

## Motion
Reuse centralized Motion/Framer Motion.

Album:
- crossfade or subtle opacity/scale transition
- about 300–500ms
- no dramatic full-width slide, bounce, or aggressive spring

Dress Code:
- soft title reveal
- grouped/small stagger for swatches
- soft copy reveal
- no bouncing/floating circles

Respect reduced motion.

## Accessibility
Album:
- real buttons
- aria labels
- visible focus
- meaningful alt text
- accessible active thumbnail state

Dress Code:
- include text equivalents for colors
- do not rely on color alone

## Preservation
Do not break:
Opening Experience, Hero, Couple Story, Save The Date, Wedding Events, Timeline, Guestbook, RSVP, RSVP Admin, Supabase, Thank You, SEO, OpenGraph, responsiveness, reduced motion.

Wedding Gift is the only existing feature explicitly requested for complete removal.

## QA
Test at:
320, 375, 390, 414, 768, 1024, 1280, 1440+.

Verify album navigation, thumbnails, mobile overflow, Dress Code balance, no remaining gift references, RSVP/Thank You intact, lint/typecheck/build.
