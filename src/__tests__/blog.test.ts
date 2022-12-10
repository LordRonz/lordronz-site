import { expect } from '@jest/globals';

import { cleanBlogPrefix } from '@/lib/blog';

describe('clean blog prefix', () => {
  it('should remove blog title prefix', () => {
    expect.hasAssertions();
    const result = cleanBlogPrefix('id-how-to-fuck');

    expect(result).toContain('how-to-fuck');
  });

  it('should not change blog title', () => {
    expect.hasAssertions();
    const result = cleanBlogPrefix('how-to-not-be-a-furry');

    expect(result).toContain('how-to-not-be-a-furry');
  });
});
