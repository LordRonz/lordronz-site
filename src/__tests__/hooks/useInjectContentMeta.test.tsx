import { renderHook, waitFor } from '@testing-library/react';
import useSWR from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import type { BlogFrontmatter } from '@/types/frontmatters';
import type { ContentMeta } from '@/types/meta';

vi.mock('swr', () => ({
  default: vi.fn(() => ({ data: undefined, error: undefined })),
}));

const mockedUseSWR = vi.mocked(useSWR);

const frontmatter = [
  { slug: 'my-post', title: 'My Post' },
  { slug: 'other-post', title: 'Other Post' },
] as BlogFrontmatter[];

const contentMeta = [
  { slug: 'b_my-post', currentViews: 42, likes: 7 },
  { slug: 'b_unrelated-post', currentViews: 9, likes: 1 },
] as ContentMeta[];

// Note: `initialData`/`frontmatter` must be stable references — the hook's
// effect depends on them, so inline array literals would loop forever.
const unrelatedContentMeta = [
  { slug: 'b_unrelated-post', currentViews: 9, likes: 1 },
] as ContentMeta[];

describe('useInjectContentMeta', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns the frontmatter unchanged while meta is not available yet', () => {
    const { result } = renderHook(() =>
      useInjectContentMeta('blog', frontmatter),
    );

    expect(result.current).toEqual(frontmatter);
  });

  it('injects views and likes for slugs matching through cleanBlogPrefix', async () => {
    const { result } = renderHook(() =>
      useInjectContentMeta('blog', frontmatter, contentMeta),
    );

    await waitFor(() => {
      expect(result.current[0]).toMatchObject({
        slug: 'my-post',
        views: 42,
        likes: 7,
      });
    });
    expect(result.current[1]).toMatchObject({
      slug: 'other-post',
      views: undefined,
      likes: undefined,
    });
  });

  it('matches the Indonesian `id-` prefixed slug after cleanBlogPrefix strips it', async () => {
    const idFrontmatter = [
      { slug: 'id-my-post', title: 'My Post (ID)' },
    ] as BlogFrontmatter[];

    const { result } = renderHook(() =>
      useInjectContentMeta('blog', idFrontmatter, contentMeta),
    );

    await waitFor(() => {
      expect(result.current[0]).toMatchObject({
        slug: 'id-my-post',
        views: 42,
        likes: 7,
      });
    });
  });

  it('leaves views and likes undefined when no meta entry matches the slug', async () => {
    const { result } = renderHook(() =>
      useInjectContentMeta('blog', frontmatter, unrelatedContentMeta),
    );

    await waitFor(() => {
      expect(result.current[0].views).toBeUndefined();
    });
    expect(result.current[0].likes).toBeUndefined();
    expect(result.current[1]).toMatchObject({
      slug: 'other-post',
      views: undefined,
      likes: undefined,
    });
  });

  it('does not fetch from SWR when initial meta is provided', async () => {
    renderHook(() => useInjectContentMeta('blog', frontmatter, contentMeta));

    await waitFor(() => {
      expect(mockedUseSWR).toHaveBeenCalledWith(null, expect.any(Function));
    });
  });
});
