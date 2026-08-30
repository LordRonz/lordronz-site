# Plan 001: Show blog language links only when the translation exists

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the next
> step. If anything in the "STOP conditions" section occurs, stop and report —
> do not improvise. When done, update the status row for this plan in
> `plans/README.md` unless a reviewer told you they maintain the index.
>
> **Drift check (run first)**:
> `git diff --stat deebe5b..HEAD -- src/lib/blog.ts src/__tests__/blog.test.ts 'src/app/blog/[slug]/page.tsx' src/components/pages/BlogContent.tsx`
> If any in-scope file changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding. A mismatch is a STOP
> condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: working Vitest and ESLint gates (audit finding 1; no plan file
  yet)
- **Category**: bug
- **Planned at**: commit `deebe5b`, 2026-08-15

## Why this matters

`SingleBlogPage` constructs an Indonesian or English URL from every post slug
without checking the content directory. Seven current English posts have no
`id-` counterpart, so the visible language control sends readers to a 404. The
server already enumerates blog files; use that list as the source of truth and
pass the actual counterpart slug to the client.

## Current state

- `src/lib/blog.ts` contains the existing `id-` slug convention:

  ```ts
  // src/lib/blog.ts:1-5
  export const cleanBlogPrefix = (slug: string) =>
    slug.startsWith('id-') ? slug.slice(3) : slug;
  ```

- `src/app/blog/[slug]/page.tsx` already calls `getFiles('blog')` from
  `generateStaticParams`, but `getPosts` does not use the file list:

  ```ts
  // src/app/blog/[slug]/page.tsx:32-38
  const getPosts = async (slug: string) => {
    const post = await getFileBySlug('blog', slug);
    const recommendations = await getRecommendations(slug);
    return { ...post, recommendations };
  };
  ```

- `src/components/pages/BlogContent.tsx` always synthesizes a language URL and
  relies on an `englishOnly` frontmatter flag that no tracked post sets:

  ```tsx
  // src/components/pages/BlogContent.tsx:46-49,136-140
  const languageLink = useMemo(
    () => `/blog/${isEnglish ? 'id-' : ''}${cleanSlug}`,
    [cleanSlug, isEnglish],
  );

  {
    !frontmatter?.englishOnly && (
      <CustomLink href={languageLink}>{langLinkContent}</CustomLink>
    );
  }
  ```

- Unit helpers live in `src/lib/` and their tests live directly in
  `src/__tests__/`; follow `src/__tests__/blog.test.ts`. Imports use the `@/`
  alias, Prettier uses single quotes and trailing commas, and tests use Vitest.
- There are no ADR, product, or design documents defining a different
  translation convention. The implemented convention is exact `id-` prefixes.

## Commands you will need

| Purpose        | Command                                                                                                                                | Expected on success                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Baseline gate  | `bun run vitest -- run src/__tests__/blog.test.ts`                                                                                     | Vitest starts and the existing 2 tests pass |
| Targeted tests | `bun run vitest -- run src/__tests__/blog.test.ts`                                                                                     | all tests in the file pass                  |
| Typecheck      | `bun run tsc`                                                                                                                          | exit 0, no errors                           |
| Targeted lint  | `bunx eslint src/lib/blog.ts src/__tests__/blog.test.ts 'src/app/blog/[slug]/page.tsx' src/components/pages/BlogContent.tsx`           | exit 0                                      |
| Formatting     | `bunx prettier --check src/lib/blog.ts src/__tests__/blog.test.ts 'src/app/blog/[slug]/page.tsx' src/components/pages/BlogContent.tsx` | exit 0                                      |
| Static build   | `bun run build-ci`                                                                                                                     | exit 0 and all blog routes build            |

Run the baseline gate before editing. The audit observed
`ERR_PACKAGE_PATH_NOT_EXPORTED` from the committed Vite/plugin mismatch. If that
still occurs, stop: restoring the dependency gate is deliberately outside this
plan.

## Scope

**In scope** (the only source files to modify):

- `src/lib/blog.ts`
- `src/__tests__/blog.test.ts`
- `src/app/blog/[slug]/page.tsx`
- `src/components/pages/BlogContent.tsx`
- `plans/README.md` for status only

**Out of scope**:

- Do not add or edit `englishOnly` in every MDX file; that recreates the bug as
  manually synchronized metadata.
- Do not rename the `id-` convention or introduce locale routing.
- Do not refactor or cache the MDX pipeline.
- Do not remove the currently unused recommendation pipeline; that is a separate
  finding.
- Do not modify dependencies, `bun.lock`, or test configuration.

## Git workflow

- Branch: `codex/001-blog-translation-links`
- Commit once after all gates pass; use the repository's conventional style,
  e.g. `fix: hide unavailable blog translations`.
- Do not push or open a PR unless the operator explicitly requests it.

## Steps

### Step 1: Add one tested helper for counterpart discovery

In `src/lib/blog.ts`, export a small helper with this contract:

```ts
getBlogTranslationSlug(slug: string, availableSlugs: readonly string[]):
  string | undefined
```

The array contains bare slugs without `.mdx`. For an English slug, the candidate
is `id-${slug}`. For an Indonesian slug beginning with `id-`, the candidate is
`cleanBlogPrefix(slug)`. Return the candidate only when it occurs exactly in
`availableSlugs`; otherwise return `undefined`. Do not add locale objects,
configuration, or a new module.

Extend `src/__tests__/blog.test.ts` with exactly these regression cases:

1. English `swiftui-routing` returns `id-swiftui-routing` when both exist.
2. Indonesian `id-swiftui-routing` returns `swiftui-routing` when both exist.
3. English `axios-interceptors` returns `undefined` without an Indonesian file.
4. A partial/similar slug does not count as an exact counterpart.

Keep the existing `cleanBlogPrefix` tests.

**Verify**: `bun run vitest -- run src/__tests__/blog.test.ts` → all existing
and 4 new tests pass.

### Step 2: Resolve the translation slug on the server

In `src/app/blog/[slug]/page.tsx`:

1. Import `getBlogTranslationSlug` from `@/lib/blog`.
2. In `getPosts`, obtain `post`, `recommendations`, and `getFiles('blog')` in
   one `Promise.all` so the new directory read does not serialize existing work.
3. Convert filenames to bare slugs with an end-anchored `.mdx` removal.
4. Compute `translationSlug` with the helper and include it in the returned
   object.
5. Destructure `translationSlug` in `Page` and pass it to `SingleBlogPage`.

Do not infer translation availability from title, tags, or frontmatter.

**Verify**: `bun run tsc` → exit 0, no errors.

### Step 3: Render the server-confirmed link only

In `src/components/pages/BlogContent.tsx`:

1. Add `translationSlug?: string` to `SingleBlogPageProps` and destructure it.
2. Keep the current `isEnglish` calculation solely for the link label.
3. Remove the synthesized `languageLink` memo.
4. Render the language `CustomLink` only when `translationSlug` is defined, with
   `href={`/blog/${translationSlug}`}`.
5. Preserve the current label text and styling.

Do not render a disabled control for missing translations; absence is the
existing UI convention for unavailable actions.

**Verify**:

- `bun run vitest -- run src/__tests__/blog.test.ts` → all pass.
- `bun run tsc` → exit 0.
- `bunx eslint src/lib/blog.ts src/__tests__/blog.test.ts 'src/app/blog/[slug]/page.tsx' src/components/pages/BlogContent.tsx`
  → exit 0.
- `bun run build-ci` → exit 0; generated static blog routes include existing
  English and Indonesian posts.

## Test plan

- Extend `src/__tests__/blog.test.ts`; do not create a new test file.
- Cover both translation directions, a missing counterpart, and exact matching.
- Model imports and assertions after the existing tests in the same file.
- Verification: `bun run vitest -- run src/__tests__/blog.test.ts` → 6 tests
  pass unless unrelated tests were added after this plan.

## Done criteria

- [ ] `bun run vitest -- run src/__tests__/blog.test.ts` exits 0.
- [ ] `bun run tsc` exits 0.
- [ ] Targeted ESLint and Prettier checks exit 0.
- [ ] `bun run build-ci` exits 0.
- [ ] `rg -n "frontmatter\?\.englishOnly|const languageLink" src/components/pages/BlogContent.tsx`
      returns no matches.
- [ ] All existing paired posts get a language link and unpaired posts get none.
- [ ] No source files outside the in-scope list are modified.
- [ ] `plans/README.md` marks plan 001 DONE.

## STOP conditions

Stop and report back if:

- Vitest or ESLint still fails during startup because the dependency baseline
  has not been restored.
- The in-scope code no longer matches the excerpts.
- Tracked translations no longer use the exact `id-<english-slug>.mdx` pairing.
- Correct detection appears to require parsing frontmatter or introducing a
  general localization system.
- The fix requires editing MDX content, dependencies, or another source file.
- A verification command fails twice after a reasonable in-scope correction.

## Maintenance notes

- Adding or removing a matching `id-` file should automatically add or remove
  the language link on the next build.
- Reviewers should verify both directions and one unpaired post in the built
  route output.
- If the site later adopts real locale routing, replace this helper as part of
  that migration rather than layering locale configuration over it.
