# Tighten button feedback

**Priority:** High  
**Scope:** `src/components/buttons/ButtonV2.tsx`, all shared button consumers  
**Dependency:** none

## Problem

The base button at `ButtonV2.tsx:8` uses `transition-all` for 500ms and scales
on every hover. Icons at lines 67 and 73 animate width and margin, which causes
layout work. A frequently used control should respond immediately and keep its
label stable.

## Change

- Replace `transition-all duration-500` with explicit color, background, border,
  shadow, and transform transitions lasting 160ms.
- Use `cubic-bezier(0.23, 1, 0.32, 1)` for the deceleration.
- Keep press feedback at `scale(0.97)`; only apply hover lift on hover-capable
  pointers.
- Keep icon space reserved and animate only opacity/transform so the label never
  shifts.
- Under `prefers-reduced-motion: reduce`, keep color changes and remove
  transforms.

## Acceptance

- Button geometry does not change during hover.
- Press feedback is visible in under 200ms.
- Keyboard focus remains obvious.
- No `transition-all` remains in the shared button.
