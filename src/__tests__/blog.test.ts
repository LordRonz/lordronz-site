import { expect } from 'vitest';

import { cleanBlogPrefix, getBlogTranslationSlug } from '@/lib/blog';

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
