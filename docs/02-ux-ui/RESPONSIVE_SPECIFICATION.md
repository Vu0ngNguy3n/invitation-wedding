# Responsive Specification

## Breakpoint Strategy

Use Tailwind's mobile-first breakpoint system.

Do not design desktop first and shrink it down.

## Mobile

Priorities:
1. readable content
2. touch interaction
3. image composition
4. vertical rhythm
5. performance

## Tablet

Use additional horizontal space to improve composition without turning the
experience into a dense grid.

## Desktop

Allow:
- editorial two-column compositions
- larger decorative framing
- more sophisticated gallery arrangements
- controlled whitespace

## Wide Desktop

Do not simply stretch content indefinitely.
Use max-width containers and deliberate composition.

## Mandatory Checks

At minimum inspect:
- 320px
- 375px
- 430px
- 768px
- 1024px
- 1280px
- 1440px+

## Anti-patterns

- fixed pixel widths for major sections
- absolute positioning that breaks at other sizes
- hover-only actions
- horizontal page overflow
