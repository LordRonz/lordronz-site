import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';

describe('storage functions', () => {
  describe('get from local storage', () => {
    it('should return correct localstorage value', () => {
      expect.hasAssertions();
      localStorage.setItem('a', 'banger');
      const result = getFromLocalStorage('a');

      expect(result).toBe('banger');
    });
  });

  describe('get from session storage', () => {
    it('should return correct sessionstorage value', () => {
      expect.hasAssertions();
      sessionStorage.setItem('a', 'banger');
      const result = getFromSessionStorage('a');

      expect(result).toBe('banger');
    });
  });
});
