import { type ClassValue, cn } from 'cn';

/** Wrap clsx with tailwind merge */
const clsxm = (...classes: ClassValue[]) => cn(...classes);

export default clsxm;
