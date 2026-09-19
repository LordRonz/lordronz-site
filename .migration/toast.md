# toast

2026-09-19, engine (customized legacy default golden), migrated to Base UI's
manager-driven toast lifecycle.

## Changed

- `src/components/ui/toast/toast.tsx:3`: Base UI primitives, Portal/Content
  exports, required toast-object Root props, Base UI swipe/transition hooks,
  retained colors/variants, and accessible close-button label.
- `src/components/ui/toast/use-toast.tsx`: replaced the custom reducer,
  listeners, IDs, and removal timers with a typed Base UI manager and
  provider-scoped hook.
- `src/components/ui/toast/toaster.tsx`: Provider wraps its consumer, with
  Portal > Viewport > Root > Content anatomy. Preserved one-visible-toast limit
  and right swipe direction; manager data carries custom classes/variants and
  actionProps carries actions.
- `src/components/pages/QuotesPage.tsx`: sole application caller now uses
  `toastManager.add`, `timeout`, explicit high announcement priority, and custom
  data for styling.
- `src/__tests__/components/Toast.test.tsx`: manager add/update, hover/close,
  and timeout regression checks.
- `.migration/toast.md`: this report.
- `grep -n "radix-ui\|@radix-ui"` on toast component files is clean. Typecheck
  and both toast tests passed. Installed 1.8.0 declarations were consulted for
  manager options and Root props.

## Left alone

- Quotes fetching, alert, loading, and refresh behavior remain unchanged.
- Non-Radix notification libraries (e.g. sonner) are outside scope; none needed
  editing.

## Behavior changes

- Toast lifecycle is manager-owned: add returns an ID; close/update take an ID.
  Custom reducer and million-millisecond delayed removal are gone.
- Overflow toasts are limited/hidden by Base UI rather than immediately
  discarded by the old reducer.
- Viewport keyboard shortcut changes from F8 to F6; Title/Description render
  h2/p. Notifications portal to body.
- Close controls are hidden from accessibility announcements while collapsed,
  then available on hover/focus (Base UI behavior).
- `duration`, controlled `open`, `onOpenChange`, action `altText`, and the old
  `{ toast, dismiss }` hook shape are not retained. All existing callers were
  migrated.

## Verify by hand

- Force a quotes API error: confirm title, description, dark/light styling, and
  five-second dismissal.
- Hover/focus a toast to pause the timer; dismiss via close, right swipe, and
  Escape with focus in the viewport.
- Press F6 to enter the notification region; confirm announcements and
  close-button label with a screen reader.
- Trigger repeated errors and check one-visible-toast limiting and cleanup.
