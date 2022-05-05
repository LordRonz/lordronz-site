import React from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

type Props = {
  buttonClassName?: string;
  className?: string;
  iconClassName?: string;
  value: 'dark' | 'light';
  onChange: (v: 'dark' | 'light') => void;
};

const ColorModeToggle = ({
  buttonClassName,
  className,
  iconClassName,
  value,
  onChange,
}: Props): JSX.Element => {
  return (
    <div className={clsxm('h-8 w-8', className)}>
      <button
        className={clsxm(
          'flex h-full w-full items-center justify-center rounded-full transition-colors hover:bg-gray-500',
          buttonClassName
        )}
        type='button'
        onClick={() => onChange(value === 'dark' ? 'light' : 'dark')}
      >
        <FiSun
          className={clsxm(
            value === 'dark' && 'hidden',
            'text-2xl',
            iconClassName
          )}
        />
        <FiMoon
          className={clsxm(
            value === 'light' && 'hidden',
            'text-2xl',
            iconClassName
          )}
        />
      </button>
    </div>
  );
};

export default React.memo(ColorModeToggle);
