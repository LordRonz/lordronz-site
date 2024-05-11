import clsxm from '@/lib/clsxm';

describe('clsxm test', () => {
  it('should return correct tailwind classes', () => {
    expect.hasAssertions();
    const result = clsxm('bg-primary-500', 'bg-rose-100');

    expect(result).toContain('bg-rose-100');
  });

  it('should return empty string class', () => {
    expect.hasAssertions();
    const result = clsxm();

    expect(result).toBe('');
  });

  it('should override class', () => {
    expect.hasAssertions();
    const result = clsxm('bg-red-200 bg-black');

    expect(result).toBe('bg-black');
  });

  it('should return correct classname and remove falsy class', () => {
    expect.hasAssertions();
    const test = true;
    const test2 = false;
    const result = clsxm(
      'bg-red-200',
      test && 'flex',
      test2 && 'grid',
      test && test2 ? 'balls' : '',
    );

    expect(result).toBe('bg-red-200 flex');
  });
});
