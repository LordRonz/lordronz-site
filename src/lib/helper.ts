export const getFromSessionStorage = (key: string) =>
  typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(key) : null;

export const getFromLocalStorage = (key: string) =>
  typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
