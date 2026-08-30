# Plan 002: Return a stable response for Spotify HTTP errors

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report —
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer told you they maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat deebe5b..HEAD -- src/app/api/now-playing/route.ts src/__tests__/nowPlayingRoute.test.ts`
> If the route changed since this plan was written, compare it with the excerpt
> below. A mismatch is a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: working Vitest and ESLint gates (audit finding 1; no plan file
  yet)
- **Category**: bug
- **Planned at**: commit `deebe5b`, 2026-08-15

## Why this matters

The now-playing route treats status 401 and 500 as failures but excludes
exactly 400. It then parses Spotify's error payload as a song and dereferences
missing fields, turning a routine upstream rejection into a site 500. Use the
platform `Response.ok` contract and leave the public fallback shape unchanged.

## Current state

- `src/app/api/now-playing/route.ts` translates Spotify responses into the
  public `/api/now-playing` response:

  ```ts
  // src/app/api/now-playing/route.ts:9-19
  const response = await getNowPlaying();

  if (response.status === 204 || response.status > 400) {
    return Response.json({ isPlaying: false });
  }

  const song: SpotifySong = await response.json();
  if (song.item === null) {
    return Response.json({ isPlaying: false });
  }
  ```

- Status 204 requires its explicit branch because it is successful according to
  `Response.ok` but has no JSON body.
- `src/lib/spotify.ts` owns token acquisition and upstream fetches. It is not
  necessary to change that module for this status-boundary bug.
- Existing component tests use Vitest mocks and Testing Library; use
  `src/__tests__/components/NowPlaying.test.tsx` for `vi` conventions. The new
  route test should call `GET` directly and inspect the returned `Response`.

## Commands you will need

| Purpose        | Command                                                                                        | Expected on success                   |
| -------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------- |
| Baseline gate  | `bun run vitest -- run src/__tests__/blog.test.ts`                                             | Vitest starts and existing tests pass |
| Targeted tests | `bun run vitest -- run src/__tests__/nowPlayingRoute.test.ts`                                  | all new route tests pass              |
| Typecheck      | `bun run tsc`                                                                                  | exit 0, no errors                     |
| Targeted lint  | `bunx eslint src/app/api/now-playing/route.ts src/__tests__/nowPlayingRoute.test.ts`           | exit 0                                |
| Formatting     | `bunx prettier --check src/app/api/now-playing/route.ts src/__tests__/nowPlayingRoute.test.ts` | exit 0                                |
| Static build   | `bun run build-ci`                                                                             | exit 0                                |

Run the baseline gate before editing. If it fails with the known Vite/plugin
startup error, stop and report the unmet prerequisite; do not edit dependencies.

## Scope

**In scope**:

- `src/app/api/now-playing/route.ts`
- `src/__tests__/nowPlayingRoute.test.ts` (create)
- `plans/README.md` for status only

**Out of scope**:

- `src/lib/spotify.ts`; token refresh and credential validation are separate
  concerns.
- The JSON response contract consumed by `src/components/NowPlaying.tsx`.
- Retries, logging, caching, rate limiting, or new error types.
- Dependencies, lockfiles, and test configuration.

## Git workflow

- Branch: `codex/002-spotify-http-errors`
- Commit once after all gates pass; example message:
  `fix: handle spotify bad requests`.
- Do not push or open a PR unless explicitly requested.

## Steps

### Step 1: Add the route-level regression tests

Create `src/__tests__/nowPlayingRoute.test.ts`.

Mock `@/lib/spotify` with `vi.mock`, import `GET` from the route, and use
`vi.mocked(getNowPlaying)` to control the returned `Response`. Reset the mock in
`beforeEach`. Add exactly these cases:

1. Status 400 with a JSON error body returns HTTP 200 and exactly
   `{ isPlaying: false }` instead of throwing.
2. Status 204 with no body returns the same fallback.
3. Status 200 with a minimal valid `SpotifySong` body preserves the current
   mapped fields: `album`, `albumImageUrl`, `artist`, `isPlaying`, `songUrl`,
   and `title`.

Do not mock global `fetch`; the route boundary is `getNowPlaying`.

**Verify before the production fix**:
`bun run vitest -- run src/__tests__/nowPlayingRoute.test.ts` → the status-400
case fails because the current route attempts to read song fields. The 204 and
200 cases pass. If failure is instead a test-environment or import error, fix
the test within scope before proceeding.

### Step 2: Use the native success predicate

In `src/app/api/now-playing/route.ts`, replace only the faulty condition:

```ts
if (response.status === 204 || !response.ok) {
  return Response.json({ isPlaying: false });
}
```

Preserve the explicit 204 case, the success mapping, runtime, revalidation, and
public response shape. Do not add a catch-all `try/catch`; network exceptions
were not part of the reported bug.

**Verify**:

- `bun run vitest -- run src/__tests__/nowPlayingRoute.test.ts` → all 3 tests
  pass.
- `bun run tsc` → exit 0.
- `bunx eslint src/app/api/now-playing/route.ts src/__tests__/nowPlayingRoute.test.ts`
  → exit 0.
- `bun run build-ci` → exit 0.

## Test plan

- New file: `src/__tests__/nowPlayingRoute.test.ts`.
- Regression: exact status 400 produces the existing fallback response.
- Boundary: bodyless 204 remains supported.
- Happy path: valid Spotify payload mapping is unchanged.
- Pattern: Vitest mocking style from
  `src/__tests__/components/NowPlaying.test.tsx`; direct response assertions do
  not require Testing Library.
- Verification: targeted test command → 3 passing tests.

## Done criteria

- [ ] `bun run vitest -- run src/__tests__/nowPlayingRoute.test.ts` reports 3
      passing tests.
- [ ] `bun run tsc` exits 0.
- [ ] Targeted ESLint and Prettier checks exit 0.
- [ ] `bun run build-ci` exits 0.
- [ ] `rg -n "response\.status > 400" src/app/api/now-playing/route.ts` returns
      no matches.
- [ ] The route still returns exactly `{ isPlaying: false }` for 204 and non-2xx
      responses.
- [ ] No source files outside the in-scope list are modified.
- [ ] `plans/README.md` marks plan 002 DONE.

## STOP conditions

Stop and report back if:

- Vitest or ESLint still cannot start because the verification baseline is
  broken.
- The route no longer has the shown status check and response mapping.
- `getNowPlaying` no longer returns a standard `Response`.
- Correct behavior requires changing the public JSON contract or Spotify token
  flow.
- A verification command fails twice after a reasonable in-scope correction.

## Maintenance notes

- Prefer `Response.ok` for future upstream status checks; it correctly covers
  the complete 200–299 range.
- Keep the 204 test because `ok === true` for 204 despite the absent body.
- A separate future plan may decide how network exceptions or token endpoint
  failures should be logged; do not fold that policy into this patch.
