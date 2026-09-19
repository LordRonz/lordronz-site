# Project migration

2026-09-19 — Whole-project migration completed on `migrate/base-ui`, one commit
per Radix component plus dependency/config cleanup.

## Scope and strategy

- Preflight: `bunx shadcn@latest info --json` identified Next.js 16.2.10,
  Tailwind 4, legacy `default` style, and UI path `src/components/ui`.
- Used Bun throughout. Added `@base-ui/react` 1.8.0 alongside Radix, migrated in
  component commits, then removed all five direct Radix dependencies and
  refreshed `bun.lock`.
- Classified wrappers against
  `https://ui.shadcn.com/r/styles/default/<component>.json`. All differed from
  the current golden; legacy style has no Base counterpart, so used the engine
  on the existing files rather than overwriting/restyling them.
- Migrated ButtonV2 (Slot), select, tabs, tooltip, and toast. Reports:
  `button.md`, `select.md`, `tabs.md`, `tooltip.md`, `toast.md` in this
  directory.
- Native-only alert, card, input, and skeleton need no primitive migration and
  remain unchanged. Spotlight/meteors and non-Radix libraries were intentionally
  untouched.

## Dependency and configuration cleanup

- `package.json`, `bun.lock`: removed `@radix-ui/react-select`, `react-slot`,
  `react-tabs`, `react-toast`, and `react-tooltip` direct dependencies.
- `tailwind.config.ts`: removed unused accordion keyframes/animation entries
  referencing Radix variables; source sweep confirmed no consumers.
- **Flag: `components.json` remains `style: "default"`.** No `base-default`
  registry exists. Future ordinary `shadcn add` commands will still select Radix
  components. Choose a modern Base preset (which can restyle the app) or add
  Base components manually; this migration deliberately does not change the
  visual preset.

## Application sweep

- Updated `components/Tooltip.tsx`: render composition, provider delay,
  collision configuration, root event cancellation, and explicit
  accessible-description wiring.
- Updated `components/forms/Tab.tsx`: Base UI active selectors; retained
  compatible callbacks.
- Updated `components/pages/QuotesPage.tsx`: manager add/timeout/data and
  retained urgent notification priority.
- No select application consumers or polymorphic ButtonV2 consumers existed.
- Tracked TS/TSX/JS/CSS sweep is clean for Radix imports, CSS variables,
  `asChild`, and obsolete delay/activation props after cleanup. No unresolved
  IconPlaceholder tokens.
- Important behavior changes: tabs activate manually; select defaults to
  item-aligned positioning and requires label mapping when labels differ from
  values; tooltips portal to body; toast uses manager-owned lifecycle, F6
  navigation, and Base UI limiting/announcement behavior. See per-component
  reports.

## Verification

- Before migration: `bun run tsc` and `bun run build` passed.
- After migration: `bun run tsc` passed; `bun run test` passed **84 tests in 25
  files**; batch and final `bun run build` passed, including after config
  cleanup.
- Component commits passed pre-commit ESLint/Prettier/typecheck. Config ESLint
  and `git diff --check` passed.
- Headless Chromium production smoke checks passed: forced quotes API failure
  renders/dismisses its toast; blog tabs retain selection on arrow navigation
  and activate on Enter; about-page tooltips show on hover and dismiss on
  Escape. No page errors in the final blog/about check.
- Browser tests used the actual about-page tooltip, not the homepage (which has
  none). High-priority toast headings are hidden from role queries until focused
  by Base UI; the successful browser check targeted visible viewport content
  instead.
- Select/button behavior is covered by component tests; complete screen-reader,
  touch/swipe, and responsive visual QA remain manual checklists in the
  component reports.
- Baseline Serwist/Turbopack and edge-runtime static-generation warnings remain
  unchanged. The test runner also prints a non-failing localstorage-file
  warning; ESLint prints a baseline-browser-mapping age warning. No pre-existing
  typecheck/build failures.

## User changes

- `.serena/project.yml` was stashed before work. At completion its working copy
  already exactly matched the stashed version; it is preserved, unstaged, and
  excluded from migration commits.
- Generated `next-env.d.ts` build drift is restored rather than committed.

0 wrappers remain on Radix (derived from imports in `src/components/ui`;
ButtonV2 is also clean).
