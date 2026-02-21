'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

export type MarkerProps = {
  children: React.ReactNode;
  className?: string;
};

const MARK_CLASS =
  'marker-highlight rounded-md bg-inherit bg-linear-to-r from-primary-100 from-50% to-transparent to-50% px-1 text-dark transition-all dark:from-primary-600 dark:to-black dark:text-light';

export const Marker = ({ children, className }: MarkerProps) => {
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -5% 0px',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <span
      ref={ref}
      className={clsxm('marker-root', mounted && inView && 'marker-visible')}
    >
      <mark className={clsxm(MARK_CLASS, className)}>{children}</mark>
    </span>
  );
};

export default Marker;
