import clsxm from '@/lib/clsxm';

describe('clsxm test', () => {
  it('should return correct tailwind classes', () => {
    expect.hasAssertions();
    const result = clsxm('bg-primary-500', 'bg-rose-100');

    expect(result).toContain('bg-rose-100');
  });
});
