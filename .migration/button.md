# button

2026-09-19, engine (customized legacy default golden), migrated to the real Base
UI Button.

## Changed

- `src/components/buttons/ButtonV2.tsx:3`: replaced Slot/Slottable with Base UI
  Button and its `render`/`nativeButton` props; preserved variants, sizes,
  icons, motion, and refs.
- `src/__tests__/components/ButtonV2.test.tsx`: runnable disabled/icon/render
  regression check.
- `package.json`, `bun.lock`: added `@base-ui/react` 1.8 alongside Radix for
  incremental migration.
- `.migration/button.md`: this report.
- Consumer sweep found no `asChild` button callers.
  `grep -n "radix-ui\|@radix-ui"` on the component is clean. Typecheck passed.

## Left alone

- `ShinyButton.tsx`, `ShimmerButton.tsx`: existing props forwarding works
  unchanged.
- Other button implementations and native-only shadcn wrappers: not Radix.

## Behavior changes

- Polymorphism uses `render` rather than `asChild`. For anchor rendering, pass
  `nativeButton={false}` and an explicit `role='link'` to retain link semantics;
  Base UI otherwise supplies button semantics. No current app callers use this
  path.

## Verify by hand

- Tab to a button and activate with Enter/Space; check disabled buttons do not
  fire.
- Check both icon placements and light/dark variants, then a rendered anchor's
  navigation.
