# select

2026-09-19, engine (customized legacy default golden), migrated; no application
consumers currently exist.

## Changed

- `src/components/ui/select.tsx:3`: Base UI import, Portal > Positioner >
  Popup > List, GroupLabel, scroll arrows, rendered icon/indicator, and
  highlighted/transition selectors.
- Positioner explicitly receives every declared positioning prop. Replaced Radix
  sizing variables with available-height/anchor-width; kept original colors,
  spacing, and left-hand selection indicator.
- `src/__tests__/components/Select.test.tsx`: keyboard selection, disabled-item
  semantics, label mapping, and focus return check.
- `.migration/select.md`: this report.
- `grep -n "radix-ui\|@radix-ui"` on the wrapper is clean. Typecheck and batch
  production build passed.

## Left alone

- No select consumer imports or call-site `position`/value callbacks were found
  to migrate.
- Native-only shadcn wrappers and non-Radix libraries remain unchanged.

## Behavior changes

- `alignItemWithTrigger` defaults to true, matching Base UI/shadcn. The previous
  wrapper defaulted to popper mode; use false for that layout.
- `onValueChange` can receive null and event details.
- Provide Root `items` labels when labels differ from values: Base UI Value
  otherwise displays the raw value rather than copying ItemText. Confirmed
  against installed 1.8.0 and covered by the test.
- Popup animation uses starting/ending transitions; highlighted items use Base
  UI's data attribute.

## Verify by hand

- In a select fixture, open with mouse and keyboard; test arrows, Home/End,
  typeahead, Enter, Escape, and focus return.
- Verify disabled items cannot be selected, selected labels display correctly,
  and long lists scroll.
- Check default item-alignment versus `alignItemWithTrigger={false}` and
  viewport-edge positioning.
