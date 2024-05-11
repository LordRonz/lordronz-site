export const removeDuplicateSlashUrl = (url: string) =>
  url.replace(/([^:]\/)\/+/g, '$1');
