# Non-Functional Requirements

## Performance

- Optimize above-the-fold images.
- Lazy-load gallery images.
- Avoid unnecessary client-side JavaScript.
- Prefer Server Components.
- Avoid unnecessary animation work.
- Avoid layout shift.

## Security

- Never expose Supabase secret/server key to the browser.
- Validate guestbook input on the server.
- Enable RLS.
- Do not render user messages as raw HTML.
- Do not trust client-side validation alone.

## Accessibility

Target a strong WCAG-aligned implementation:
- semantic HTML
- visible focus
- sufficient contrast
- keyboard operation
- descriptive labels
- reduced-motion support

## Maintainability

- typed domain models
- reusable components
- isolated feature folders where useful
- centralized content/data
- documented architectural decisions

## Reliability

- graceful API failures
- no unhandled promise rejections
- no broken loading states
- no hydration mismatch

## Compatibility

Support modern mobile and desktop browsers.

## Visual Quality

The result should resemble a premium editorial invitation rather than a
generic component-library website.
