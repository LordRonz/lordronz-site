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
      <div>
        <h1
          className={clsxm(
            'glow inline text-4xl font-bold md:text-6xl 2xl:text-7xl',
            className,
          )}
        >
          <Accent>{title}</Accent>
          {children}
        </h1>
      </div>
      <style jsx>{`
        .glow {
          transition: all 1s ease-in-out;
          text-shadow: none;
        }

        .glow:hover {
          text-shadow:
            0 0 1px #eb2754,
            0 0 2px #eb2754,
            0 0 6px #1cb7ff,
            0 0 8px #eb2754;
        }
      `}</style>
    </>
  );
};
