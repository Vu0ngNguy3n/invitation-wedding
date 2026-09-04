# Product Requirements

## PR-01 Opening / Cover

Purpose:
Create the first emotional impression.

Must contain:
- Bride and groom names
- Wedding date
- Main wedding image
- Optional phrase
- Botanical/decorative treatment

Acceptance:
- Immediately communicates whose wedding it is.
- Feels like an invitation, not a website template.
- Works on mobile without cropping important content.
- Entrance motion is subtle and premium.

## PR-02 Couple Introduction

Purpose:
Introduce the couple and establish personal context.

Must contain:
- Bride
- Groom
- Photos
- Names
- Optional short story/description

Acceptance:
- Clear visual relationship between both people.
- Editorial composition.
- No excessive card/dashboard styling.

## PR-03 Save the Date

Purpose:
Make the wedding date memorable and actionable.

Must contain:
- Date
- Calendar representation
- Wedding date highlighted
- Optional add-to-calendar capability

Acceptance:
- Date is derived from central wedding data.
- Timezone is explicit in technical configuration.
- Calendar interaction is usable on mobile.

## PR-04 Countdown

Purpose:
Create anticipation.

Must contain:
- Days
- Hours
- Minutes
- Seconds

Acceptance:
- Updates in real time.
- Uses the configured wedding date/timezone.
- Has a graceful expired state.
- Does not create hydration mismatch or timer leaks.

## PR-05 Bride/Groom Story

Purpose:
Provide individual personality and family context.

Each profile may contain:
- Photo
- Name
- Parents
- Short description
- Quote

Acceptance:
- Data-driven.
- Accessible.
- Responsive.
- Visual hierarchy remains editorial.

## PR-06 Wedding Events

Purpose:
Clearly communicate where and when each wedding event happens.

Each event may contain:
- Event title
- Date
- Time
- Venue
- Address
- Description
- Image
- Google Maps URL
- Dress code

Acceptance:
- Multiple events supported.
- No assumption that there are exactly two events.
- Maps CTA works.
- Event information remains legible on mobile.

## PR-07 Photo Album

Purpose:
Tell the couple's story visually.

Requirements:
- Responsive gallery
- Optimized images
- Lightbox
- Next/previous
- Close
- Keyboard accessibility on desktop
- Touch-friendly mobile behavior

Acceptance:
- Gallery data comes from `@/config/weddingData`.
- Images use Next.js optimization.
- Lightbox does not break page scroll permanently.

## PR-08 Guestbook

Purpose:
Allow guests to leave messages.

Requirements:
- Name
- Wish/message
- Persistent database
- Public list
- Validation
- Loading/success/error/empty states
- Abuse protection
- Secure server-side implementation

Acceptance:
- Reloading the page preserves wishes.
- Invalid submissions are rejected.
- Database failures are handled gracefully.
- Server-only secrets never reach client bundles.

## PR-09 Wedding Gifts

Purpose:
Provide a respectful way for guests to send digital gifts.

Requirements:
- Bride QR
- Groom QR
- Bank name
- Account name
- Account number
- Copy action

Acceptance:
- Sensitive bank/account data is centralized in configuration/data.
- Copy action gives clear feedback.
- QR is readable and appropriately sized.

## PR-10 Thank You

Purpose:
Close the invitation with warmth.

Requirements:
- Thank-you message
- Names
- Date
- Optional final image
- Decorative ending

Acceptance:
- Feels like the final page of a physical invitation.
