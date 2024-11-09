import type { ReactNode } from 'react';

import Accent from '@/components/Accent';
import clsxm from '@/lib/clsxm';

export type MainTitleProps = {
  children?: ReactNode;
  title: ReactNode;
  className?: string;
};

export const MainTitle = ({ title, children, className }: MainTitleProps) => {
  return (
    <>
      <div className='group'>
        <h1
          className={clsxm(
            'inline text-4xl font-bold md:text-6xl 2xl:text-7xl',
            className,
          )}
        >
          <Accent>{title}</Accent>
          {children}
        </h1>
      </div>
    </>
  );
};
