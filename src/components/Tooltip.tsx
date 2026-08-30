import { isValidElement, memo } from 'react';

import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import clsxm from '@/lib/clsxm';

type TooltipTextProps = {
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  spanClassName?: string;
  withUnderline?: boolean;
} & Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'className' | 'content'
>;

const Tooltip = ({
  content,
  children,
  className,
  spanClassName,
  withUnderline = false,
}: TooltipTextProps) => {
  const trigger = withUnderline ? (
    <span className={clsxm('underline', 'decoration-dotted', spanClassName)}>
      {children}
    </span>
  ) : isValidElement(children) ? (
    children
  ) : (
    <span>{children}</span>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <BaseTooltip>
        <TooltipTrigger asChild className='border-0 p-0'>
          {trigger}
        </TooltipTrigger>
        <TooltipContent
          className='px-0 py-0 border-0 mb-2 max-w-60'
          onPointerDownOutside={(event) => {
            event.preventDefault();
          }}
          avoidCollisions={false}
        >
          <div
            className={clsxm(
              'inline-block rounded-md bg-white p-2 text-gray-600 shadow-md dark:bg-dark dark:text-gray-200',
              'border dark:border-primary-500',
              className,
            )}
          >
            {content}
          </div>
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
};

export default memo(Tooltip);
