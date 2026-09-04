# Testing Strategy

## Static Checks

Run:
- TypeScript
- ESLint
- production build

## Functional Checks

### Hero
- content renders
- image loads
- mobile composition works

### Countdown
- correct target
- updates
- expired state
- no timer leak

### Events
- multiple events
- maps links

### Gallery
- open
- close
- next
- previous
- keyboard controls
- mobile usability

### Guestbook
- empty state
- valid submission
- invalid name
- invalid message
- API failure
- database failure
- rate limit behavior
- refresh persistence

### Gift
- QR renders
- copy works
- feedback works

## Responsive QA

Check:
320, 375, 430, 768, 1024, 1280, 1440+

## Accessibility QA

Check:
- keyboard
- focus
- labels
- headings
- alt text
- contrast
- reduced motion

## Visual QA

Compare against the documented design system.
Look specifically for generic SaaS patterns that accidentally entered the UI.
