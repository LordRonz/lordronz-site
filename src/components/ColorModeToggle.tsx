'use client';

import clsxm from 'clsx';
import React, { useSyncExternalStore } from 'react';

import useColorMode from '@/hooks/useColorMode';

type Props = {
  buttonClassName?: string;
  className?: string;
  iconClassName?: string;
  value?: string;
  onChange?: (v: string) => void;
};

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ColorModeToggle = ({
  buttonClassName,
  className,
  iconClassName,
  value,
  onChange,
}: Props): React.JSX.Element => {
  const colorMode = useColorMode();
  const currentValue = value ?? colorMode.theme;
  const changeValue = onChange ?? colorMode.setTheme;
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  return (
    <div className={clsxm('h-8 w-8', className)} title='Toggle color mode'>
      <button
        aria-label='Color mode toggle'
        className={clsxm(
          'flex h-full w-full items-center justify-center rounded-full ring-primary-300 transition-colors duration-150 hover:bg-gray-400 focus:ring-3 dark:hover:bg-gray-500 motion-reduce:transition-none',
          buttonClassName,
        )}
        type='button'
        onClick={() => changeValue(currentValue === 'dark' ? 'light' : 'dark')}
      >
        {mounted &&
          (currentValue === 'dark' ? (
            <svg
              aria-hidden='true'
              className={clsxm('text-2xl', iconClassName)}
              fill='none'
              height='1em'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              width='1em'
            >
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
            </svg>
          ) : (
            <svg
              aria-hidden='true'
              className={clsxm('text-2xl', iconClassName)}
              fill='none'
              height='1em'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              width='1em'
            >
              <circle cx='12' cy='12' r='5' />
              <path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42' />
            </svg>
          ))}
      </button>
    </div>
  );
};

export default ColorModeToggle;
