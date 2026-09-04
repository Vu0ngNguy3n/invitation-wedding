# Coding Standards

## TypeScript

- Strict mode.
- Explicit domain types.
- Avoid `any`.
- Prefer discriminated unions when appropriate.
- Keep API request/response types explicit.

## React

- Server Components by default.
- Avoid unnecessary `useEffect`.
- Keep client boundaries small.
- Avoid prop drilling when a clean component boundary solves the problem.

## Tailwind

- Mobile-first.
- Prefer reusable classes/components over repeated arbitrary values.
- Avoid inline styles.
- Keep design values consistent with the design system.

## Naming

Components:
`PascalCase`

Functions:
`camelCase`

Constants:
`camelCase` for data exports unless a constant convention is clearer.

Files:
Use feature-oriented names.

## Error Handling

- Handle expected failures.
- Show friendly user messages.
- Log useful server-side details where appropriate.
- Never leak secrets.

## Dependencies

Before adding a dependency:
1. Check whether the existing stack already solves the problem.
2. Consider browser bundle impact.
3. Consider maintenance.
4. Add only when justified.
