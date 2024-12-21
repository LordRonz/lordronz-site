import { memo, useCallback } from 'react';

import clsxm from '@/lib/clsxm';

type TagProps = Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> & {
  onClick?: (tag: string) => void;
  tag: string;
};

const Tag = ({ children, className, onClick, tag, ...rest }: TagProps) => {
  const btnOnClick = useCallback(() => {
    onClick?.(tag);
  }, [onClick, tag]);

  return (
    <button
      className={clsxm(
        'inline-block rounded-md px-1.5 py-0.5 font-medium transition-colors',
        'bg-gray-100 text-gray-700 hover:text-black disabled:bg-gray-200 disabled:text-gray-300',
        'dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed',

        className,
      )}
      onClick={btnOnClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export const SkipNavTag = ({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'a'>) => {
  return (
    <>
      <a
        href='#skip-tags'
        className={clsxm(
          'inline-block rounded-md px-1.5 py-0.5 font-medium transition',
          'bg-gray-100 text-gray-700 hover:text-black disabled:bg-gray-200 disabled:text-gray-300',
          'dark:bg-gray-700 dark:text-gray-200 dark:hover:text-white dark:disabled:bg-gray-600 dark:disabled:text-gray-500',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-300 disabled:cursor-not-allowed',
          'pointer-events-none absolute opacity-0 focus:inline-block focus:translate-y-[1.4rem] focus:opacity-100',
        )}
        {...rest}
      >
        Skip tag
      </a>
      {children}
      <div id='skip-tags' className='hidden' />
    </>
  );
};

export default memo(
  Tag,
  (prevProps, nextProps) =>
    prevProps.tag === nextProps.tag &&
    prevProps.children?.toString() === nextProps.children?.toString() &&
    prevProps.disabled === nextProps.disabled,
);
