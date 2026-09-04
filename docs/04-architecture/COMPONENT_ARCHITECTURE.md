# Component Architecture

## Suggested Structure

src/components/
├── layout/
├── ui/
├── decorative/
├── hero/
├── couple/
├── save-the-date/
├── countdown/
├── events/
├── gallery/
├── guestbook/
├── gifts/
└── thank-you/

## Rules

Feature components own feature-specific presentation and interaction.

Shared UI belongs in `ui/`.

Decorative reusable elements belong in `decorative/`.

Do not create a giant component containing the entire page.

## Component API

Prefer typed props.

Avoid components that accept huge unstructured objects unless the domain
object itself is meaningful.

## Reuse

Before creating a new component:
1. Search existing components.
2. Determine whether an existing component can be reused.
3. Extend only when the abstraction remains clean.
