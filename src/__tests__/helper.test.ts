import { getFromLocalStorage, getFromSessionStorage } from '@/lib/helper';

function createStorageMock(): Storage {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      for (const key of Object.keys(store)) delete store[key];
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
    get length() {
      return Object.keys(store).length;
    },
  };
}

describe('storage functions', () => {
  let originalLocalStorage: Storage | undefined;
  let originalSessionStorage: Storage | undefined;

  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    originalSessionStorage = window.sessionStorage;
    Object.defineProperty(window, 'localStorage', {
      value: createStorageMock(),
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'sessionStorage', {
      value: createStorageMock(),
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: originalLocalStorage,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'sessionStorage', {
      value: originalSessionStorage,
      writable: true,
      configurable: true,
    });
  });

  describe('get from local storage', () => {
    it('should return correct localstorage value', () => {
      localStorage.setItem('a', 'banger');
      const result = getFromLocalStorage('a');

      expect(result).toBe('banger');
    });

    it('should return null from localstorage', () => {
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const result = getFromLocalStorage('a');

      expect(result).toBeNull();
    });
  });

  describe('get from session storage', () => {
    it('should return correct sessionstorage value', () => {
      sessionStorage.setItem('a', 'banger');
      const result = getFromSessionStorage('a');

      expect(result).toBe('banger');
    });

    it('should return null from sessionstorage', () => {
      Object.defineProperty(window, 'sessionStorage', {
        value: undefined,
        writable: true,
        configurable: true,
      });
      const result = getFromSessionStorage('a');

      expect(result).toBeNull();
    });
  });
});
