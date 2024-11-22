import { m } from 'framer-motion';
import { memo } from 'react';

import Accent from '@/components/Accent';
import clsxm from '@/lib/clsxm';

const AnimatedTitle = ({ baseRoute }: { baseRoute: string }) => {
  return (
    <m.span
      className='group relative z-50 whitespace-nowrap text-xl font-bold transition duration-300 hover:transition'
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -10 }}
    >
      <span
        className={clsxm(
          'opacity-100 transition duration-300 group-hover:opacity-0',
        )}
      >
        @lordronz{' '}
        <span
          className={clsxm(
            'border px-1 rounded-md border-primary-200 font-mono',
            '/' === baseRoute &&
              'bg-primary-300/50 group-hover:bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent',
          )}
        >
          {'/'}
        </span>
      </span>
      <Accent className='absolute left-0 bg-clip-text text-transparent opacity-0 transition duration-300 hover:bg-gradient-to-r group-hover:opacity-100'>
        Aaron Christopher
      </Accent>
    </m.span>
  );
};

export default memo(AnimatedTitle);
