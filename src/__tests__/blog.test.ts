import { expect } from 'vitest';

import {
  cleanBlogPrefix,
  getAdjacentBlogPosts,
  getBlogTranslationSlug,
} from '@/lib/blog';

describe('clean blog prefix', () => {
  it('should remove blog title prefix', () => {
    const result = cleanBlogPrefix('id-how-to-fuck');

    expect(result).toContain('how-to-fuck');
  });

  it('should not change blog title', () => {
    const result = cleanBlogPrefix('how-to-not-be-a-furry');

    expect(result).toContain('how-to-not-be-a-furry');
  });
});

describe('blog translation slug', () => {
  it('finds the Indonesian counterpart for an English slug', () => {
    expect(
      getBlogTranslationSlug('swiftui-routing', [
        'swiftui-routing',
        'id-swiftui-routing',
      ]),
    ).toBe('id-swiftui-routing');
  });

  it('finds the English counterpart for an Indonesian slug', () => {
    expect(
      getBlogTranslationSlug('id-swiftui-routing', [
        'swiftui-routing',
        'id-swiftui-routing',
      ]),
    ).toBe('swiftui-routing');
  });

  it('returns undefined when the Indonesian counterpart is missing', () => {
    expect(
      getBlogTranslationSlug('axios-interceptors', ['axios-interceptors']),
    ).toBeUndefined();
  });

  it('requires an exact counterpart slug', () => {
    expect(
      getBlogTranslationSlug('swiftui-routing', [
        'swiftui-routing-extra',
        'id-swiftui-routing-extra',
      ]),
    ).toBeUndefined();
  });
});

describe('adjacent blog posts', () => {
  const posts = [
    { slug: 'latest', title: 'Latest', publishedAt: '2026-04-25' },
    { slug: 'id-middle', title: 'Tengah', publishedAt: '2025-12-13' },
    { slug: 'middle', title: 'Middle', publishedAt: '2025-12-13' },
    { slug: 'id-older', title: 'Sebelumnya', publishedAt: '2024-06-27' },
    {
      slug: 'oldest',
      title: 'Oldest',
      publishedAt: '2024-06-27',
      lastUpdated: '2026-06-01',
    },
  ];

  it('uses publication order within the current language', () => {
    expect(getAdjacentBlogPosts('middle', posts)).toEqual({
      older: posts[4],
      newer: posts[0],
    });
    expect(getAdjacentBlogPosts('id-older', posts)).toEqual({
      older: undefined,
      newer: posts[1],
    });
  });

  it('handles the ends of the archive and missing posts', () => {
    expect(getAdjacentBlogPosts('oldest', posts)).toEqual({
      older: undefined,
      newer: posts[2],
    });
    expect(getAdjacentBlogPosts('latest', posts)).toEqual({
      older: posts[2],
      newer: undefined,
    });
    expect(getAdjacentBlogPosts('missing', posts)).toEqual({});
    expect(getAdjacentBlogPosts('latest', [posts[0]])).toEqual({
      older: undefined,
      newer: undefined,
    });
  });

  it('uses a stable slug order for posts published on the same day', () => {
    const sameDay = {
      slug: 'a-post',
      title: 'A Post',
      publishedAt: '2025-12-13',
    };

    expect(getAdjacentBlogPosts('middle', [...posts, sameDay]).older).toBe(
      sameDay,
    );
  });
});
