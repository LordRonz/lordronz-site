import React, { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type Props = {
  buttonClassName?: string;
  className?: string;
  iconClassName?: string;
  value?: string;
  onChange: (v: string) => void;
};

const ColorModeToggle = ({
  buttonClassName,
  className,
  iconClassName,
  value,
  onChange,
}: Props): React.JSX.Element => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={clsxm('h-8 w-8', className)} title='Toggle color mode'>
      <button
        aria-label='Color mode toggle'
        className={clsxm(
          'flex h-full w-full items-center justify-center rounded-full ring-primary-300 transition-all hover:bg-gray-400 focus:ring-3 dark:hover:bg-gray-500',
          buttonClassName,
        )}
        type='button'
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
      >
        {mounted && (
          <label
            className={clsxm(
              'swap swap-rotate',
              value === 'dark' && 'swap-active',
            )}
          >
            <FiSun
              className={clsxm(
                'swap-off',
                // value !== 'light' && 'hidden',
                'text-2xl',
                iconClassName,
              )}
            />
            <FiMoon
              className={clsxm(
                'swap-on',
                // value !== 'dark' && 'hidden',
                'text-2xl',
                iconClassName,
              )}
            />
          </label>
        )}
      </button>
    </div>
  );
};

export default React.memo(ColorModeToggle);
