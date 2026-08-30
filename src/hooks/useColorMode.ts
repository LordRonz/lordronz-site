'use client';

import { useSyncExternalStore } from 'react';

type ColorMode = 'dark' | 'light';

const eventName = 'color-mode-change';

const applyColorMode = (mode: ColorMode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
  document.documentElement.style.colorScheme = mode;
};

const getSnapshot = (): ColorMode =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const subscribe = (listener: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== 'theme') return;
    applyColorMode(event.newValue === 'light' ? 'light' : 'dark');
    listener();
  };

  window.addEventListener(eventName, listener);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(eventName, listener);
    window.removeEventListener('storage', onStorage);
  };
};

const setTheme = (value: string) => {
  const mode: ColorMode = value === 'light' ? 'light' : 'dark';
  applyColorMode(mode);
  try {
    localStorage.setItem('theme', mode);
  } catch {
    // The class toggle still works when storage is unavailable.
  }
  window.dispatchEvent(new Event(eventName));
};

const useColorMode = () => ({
  theme: useSyncExternalStore(subscribe, getSnapshot, () => 'dark'),
  setTheme,
});

export default useColorMode;
