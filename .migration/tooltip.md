# tooltip

2026-09-19, engine (customized legacy default golden), migrated with existing
200ms delay and outside-press behavior preserved.

## Changed

- `src/components/ui/tooltip.tsx:3`: Base UI Portal > Positioner > Popup,
  explicit forwarding of all declared positioning props, transitions with
  reduced-motion support. Kept the original arrowless design.
- `src/components/Tooltip.tsx`: `delayDuration` -> `delay`, `asChild` ->
  `render`, outside-press cancellation moved to Root event details, and
  `avoidCollisions={false}` mapped to Positioner collision avoidance.
- `src/__tests__/components/Tooltip.test.tsx`: focus opening, accessible
  description, portal, Escape, and retained focus check.
- `.migration/tooltip.md`: this report.
- Gap verified against installed 1.8.0 declarations/implementation: tooltip
  primitives do not automatically emit role/description linkage. Explicit
  `role='tooltip'`, generated ID and `aria-describedby` retain accessible
  descriptions.
- `grep -n "radix-ui\|@radix-ui"` on both component files is clean. Typecheck
  and 10 tests across tooltip/footer/now-playing/copy-email passed.

## Left alone

- Tooltip consumers in Footer/NowPlaying/CopyEmail retain the same public
  wrapper API.
- Native-only shadcn components and non-Radix libraries are unchanged.

## Behavior changes

- Popup now portals to the document body instead of remaining inline; check
  stacking/clipping around positioned ancestors.
- Entrance/exit uses CSS transitions rather than Radix keyframe state hooks;
  200ms application delay is retained.

## Verify by hand

- Hover footer icons and copy-email content; check the 200ms delay and
  positioning.
- Tab to an interactive trigger; verify its description with a screen reader,
  press Escape, and confirm focus remains on the trigger.
- Check light/dark colors, viewport edges (collision avoidance remains
  intentionally disabled), and reduced motion.
