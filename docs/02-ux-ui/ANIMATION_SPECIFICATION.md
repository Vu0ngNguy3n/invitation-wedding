# Animation Specification

## Principles

Motion should feel:
- slow enough to feel luxurious
- fast enough to feel responsive
- subtle
- purposeful

## Hero

Possible:
- fade
- gentle upward movement
- botanical reveal
- paper layer reveal
- image fade/scale

## Invitation opening

The first visit shows a sealed envelope overlay before the Hero.

Choreography:
- wax seal release
- paper flap fold
- invitation insert rising from inside the envelope
- overlay fade into the current Hero

Use the shared motion tokens in `src/lib/motion/`. Do not add another animation engine.

Idle seal motion must stay subtle. Reduced motion skips the flap/card sequence and enters the Hero immediately.

## Scroll

Use Framer Motion for:
- section reveal
- image reveal
- ornamental transitions

Avoid constant looping animation.

## Gallery

Use:
- soft image transition
- lightbox entrance/exit
- restrained next/previous transitions

## Buttons

Use subtle:
- opacity
- scale
- border/position feedback

## Countdown

Do not animate each number excessively.
The information must remain easy to read.

## Reduced Motion

Respect `prefers-reduced-motion`.
Essential information must remain available without motion.
