# Settle the homepage shine

**Priority:** Medium  
**Scope:** `src/components/pages/HomePage.tsx`,
`src/components/buttons/ShinyButton.tsx`, `src/components/Accent.tsx`,
`src/styles/globals.css`  
**Dependency:** plan 001 for consistent button timing

## Problem

The hero rule and secondary CTA use `animate-bg-shine` indefinitely. `Accent`
also runs a perpetual background-position animation wherever it appears.
Constant decorative motion competes with reading and makes the effects feel
cheaper over time.

## Change

- Add a homepage light-rail animation that runs once for 900ms with
  `cubic-bezier(0.23, 1, 0.32, 1)`.
- Trigger the secondary CTA shine only on hover or keyboard focus; keep its
  resting state static.
- Stop `Accent` from animating continuously; its gradient remains the visual
  treatment.
- Disable the rail, shine, wave, and transforms under reduced motion while
  preserving color/focus feedback.

## Acceptance

- Nothing on the idle hero loops forever.
- The title and paragraph render at their final position immediately.
- CTA shine can be discovered by mouse and keyboard.
- Reduced-motion mode has no positional or perpetual decorative motion.
