import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const removeDuplicateSlashUrl = (url: string) =>
  url.replace(/([^:]\/)\/+/g, '$1');
