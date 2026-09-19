# tabs

2026-09-19, engine (customized legacy default golden), migrated while preserving
styling.

## Changed

- `src/components/ui/tabs.tsx:3`: Base UI Root/List/Tab/Panel; active selectors
  and aria-disabled styling updated, refs retained.
- `src/components/forms/Tab.tsx:29`: consumer active selectors updated; string
  value callback remains compatible.
- `src/__tests__/components/Tabs.test.tsx`: keyboard focus, manual activation,
  and panel regression check.
- `.migration/tabs.md`: this report.
- `grep -n "radix-ui\|@radix-ui"` on the component files is clean. Wrapper
  typecheck passed; consumer checked before commit.

## Left alone

- Native-only alert/card/input/skeleton wrappers: not Radix.
- No third-party cmdk/vaul/sonner wrappers needed changes.

## Behavior changes

- Arrow keys move focus without selecting; Enter/Space activates the focused tab
  (Base UI manual activation default).

## Verify by hand

- On a page with category tabs, press arrows then Enter/Space and check
  filtering, focus, and active colors.
- Check disabled tabs and panel visibility in the test fixture.
