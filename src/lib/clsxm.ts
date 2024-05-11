import type { ClassValue } from 'clsx';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Wrap clsx with tailwind merge */
const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export default clsxm;
