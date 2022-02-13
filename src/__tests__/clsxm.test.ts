import clsxm from '@/lib/clsxm';

describe('Home', () => {
  it('should return correct tailwind classes', () => {
    const result = clsxm('bg-primary-500', 'bg-rose-100');

    expect(result).toContain('bg-rose-100');
  });
});
