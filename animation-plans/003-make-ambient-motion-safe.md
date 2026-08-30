# Make ambient motion safe

**Priority:** Medium  
**Scope:** `src/components/NowPlaying.tsx`, `src/styles/globals.css`,
`src/components/layout/Footer.tsx`  
**Dependency:** none

## Problem

`NowPlaying.tsx:14-62` starts three infinite selector-based animations without
retaining cleanup controls or checking reduced motion. The footer divider and
now-playing box also spin indefinitely. These effects continue offscreen and do
not communicate new information.

## Change

- Replace selector-driven JavaScript bars with scoped CSS keyframes on the three
  local spans.
- Run bar motion only while the song is playing and the component is visible.
- Disable bars and decorative border rotation under reduced motion.
- Make the footer divider static; reserve animation for the active playback
  indicator.
- Keep animation to transform/opacity only and avoid new dependencies.

## Acceptance

- No global element IDs or unmanaged animation controls remain.
- Offscreen/non-playing status performs no animation work.
- Reduced-motion mode is static but fully understandable.
- The active playback state is still visually distinct.
