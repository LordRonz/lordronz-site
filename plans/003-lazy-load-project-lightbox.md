# Plan 003: Load the project lightbox only when a visitor opens it

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report —
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer told you they maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat deebe5b..HEAD -- src/components/pages/ProjectsPage.tsx src/__tests__/components/ProjectsPage.test.tsx`
> If the page changed since this plan was written, compare it with the excerpt
> below. A mismatch is a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: working Vitest and ESLint gates (audit finding 1; no plan file
  yet)
- **Category**: perf
- **Planned at**: commit `deebe5b`, 2026-08-15

## Why this matters

`/projects` statically imports and mounts a lightbox that registers nine
plugins, even when the visitor only reads project cards. Move that existing
component behind Next.js dynamic loading and the existing open-state branch so
its JavaScript and plugin CSS are requested only after an image is opened. No
plugin redesign is needed.

## Current state

- `src/components/pages/ProjectsPage.tsx` is already a client component and
  statically imports the lightbox:

  ```tsx
  // src/components/pages/ProjectsPage.tsx:1-6,137-141
  'use client';
  import CustomLightbox from '@/components/images/CustomLightbox';

  <CustomLightbox
    open={isLightboxOpen}
    close={closeLightbox}
    slides={slides}
  />;
  ```

- `src/components/images/CustomLightbox.tsx` imports the base package, four CSS
  files, and nine plugins (`Captions`, `Counter`, `Fullscreen`, `Slideshow`,
  `Share`, `Thumbnails`, `Video`, `Download`, and `Zoom`). Preserve that module
  unchanged.
- Existing component tests use Testing Library and Vitest mocks under
  `src/__tests__/components/`; model the interaction style after
  `CopyEmail.test.tsx`.
- The application already uses `next/dynamic` in `HomePage.tsx` and
  `ComponentsPage.tsx`; match that native project pattern rather than adding a
  loading library.

## Commands you will need

| Purpose        | Command                                                                                                      | Expected on success                   |
| -------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| Baseline gate  | `bun run vitest -- run src/__tests__/components/CopyEmail.test.tsx`                                          | Vitest starts and existing tests pass |
| Targeted tests | `bun run vitest -- run src/__tests__/components/ProjectsPage.test.tsx`                                       | new interaction test passes           |
| Typecheck      | `bun run tsc`                                                                                                | exit 0, no errors                     |
| Targeted lint  | `bunx eslint src/components/pages/ProjectsPage.tsx src/__tests__/components/ProjectsPage.test.tsx`           | exit 0                                |
| Formatting     | `bunx prettier --check src/components/pages/ProjectsPage.tsx src/__tests__/components/ProjectsPage.test.tsx` | exit 0                                |
| Static build   | `bun run build-ci`                                                                                           | exit 0; `/projects` builds            |

Run the baseline gate before editing. If the known Vite/plugin startup failure
remains, stop and report the prerequisite instead of editing dependencies.

## Scope

**In scope**:

- `src/components/pages/ProjectsPage.tsx`
- `src/__tests__/components/ProjectsPage.test.tsx` (create)
- `plans/README.md` for status only

**Out of scope**:

- `src/components/images/CustomLightbox.tsx`; do not remove or reconfigure
  plugins.
- Project data, card markup, image assets, or lightbox styling.
- Loading spinners, prefetch heuristics, hover preloads, or a generalized
  lazy-component helper.
- Dependencies, lockfiles, bundle-analyzer configuration, and test
  configuration.

## Git workflow

- Branch: `codex/003-lazy-project-lightbox`
- Commit once after all gates pass; example message:
  `perf: lazy load project lightbox`.
- Do not push or open a PR unless explicitly requested.

## Steps

### Step 1: Add a regression test for conditional mounting

Create `src/__tests__/components/ProjectsPage.test.tsx` using Testing Library.

Mock `@/components/ProjectCard` as a simple button that renders the project
title and calls its received `onImgClick`. Mock
`@/components/images/CustomLightbox` as a component rendering
`data-testid='project-lightbox'`. These mocks isolate the page state and avoid
testing the third-party lightbox.

Add one interaction test that:

1. Renders `ProjectsPage`.
2. Asserts `queryByTestId('project-lightbox')` is absent initially.
3. Clicks the mocked `Risaikuru` project button.
4. Awaits `findByTestId('project-lightbox')` and asserts it is present.

**Verify before the production fix**:
`bun run vitest -- run src/__tests__/components/ProjectsPage.test.tsx` → the
initial-absence assertion fails because the current page always mounts the
mocked lightbox. If the failure is instead caused by mock resolution, correct
the test within scope before proceeding.

### Step 2: Put the lightbox behind dynamic loading and open state

In `src/components/pages/ProjectsPage.tsx`:

1. Import `dynamic` from `next/dynamic`.
2. Remove the static `CustomLightbox` import.
3. Define the component at module scope:

   ```tsx
   const CustomLightbox = dynamic(
     () => import('@/components/images/CustomLightbox'),
     { ssr: false },
   );
   ```

4. Render it only inside `isLightboxOpen && (...)` while preserving the existing
   `open`, `close`, and `slides` props.

Do not add a loading placeholder; opening the overlay is already the only state
where it is needed.

**Verify**:

- `bun run vitest -- run src/__tests__/components/ProjectsPage.test.tsx` → the
  test passes.
- `bun run tsc` → exit 0.
- Targeted ESLint and Prettier checks → exit 0.
- `bun run build-ci` → exit 0 and `/projects` is emitted successfully.

## Test plan

- New file: `src/__tests__/components/ProjectsPage.test.tsx`.
- Assert the expensive component is absent while closed and mounted after an
  image click.
- Mock project cards and the lightbox; do not test the third-party package.
- Pattern: `src/__tests__/components/CopyEmail.test.tsx` for Testing Library
  click and async assertions.
- Verification: targeted test command → 1 passing test.

## Done criteria

- [ ] `bun run vitest -- run src/__tests__/components/ProjectsPage.test.tsx`
      reports 1 passing test.
- [ ] `bun run tsc` exits 0.
- [ ] Targeted ESLint and Prettier checks exit 0.
- [ ] `bun run build-ci` exits 0.
- [ ] `rg -n "^import CustomLightbox" src/components/pages/ProjectsPage.tsx`
      returns no matches.
- [ ] `rg -n "dynamic\(|isLightboxOpen &&" src/components/pages/ProjectsPage.tsx`
      finds both guards.
- [ ] `src/components/images/CustomLightbox.tsx` is unchanged.
- [ ] No source files outside the in-scope list are modified.
- [ ] `plans/README.md` marks plan 003 DONE.

## STOP conditions

Stop and report back if:

- Vitest or ESLint cannot start because the verification baseline remains
  broken.
- The project page or lightbox no longer matches the excerpts.
- Next.js rejects the dynamic import or the package CSS during `build-ci`.
- The fix requires moving CSS, changing plugin registration, or touching another
  source file.
- The interaction test cannot observe the dynamically mocked component without
  changing global test configuration.
- A verification command fails twice after a reasonable in-scope correction.

## Maintenance notes

- Review the built `/projects` chunk graph if bundle tooling is already being
  used, but do not add bundle tooling solely for this plan.
- Future changes should keep the lightbox import behind the open-state render;
  otherwise the initial-route cost returns.
- Plugin trimming may produce further savings, but it needs product decisions
  about lightbox features and is intentionally deferred.
