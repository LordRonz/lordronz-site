import { isValidElement, memo, useId } from 'react';

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
  const contentId = useId();
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
    <TooltipProvider delay={200}>
      <BaseTooltip
        onOpenChange={(_, eventDetails) => {
          if (eventDetails.reason === 'outside-press') eventDetails.cancel();
        }}
      >
        <TooltipTrigger
          render={trigger}
          aria-describedby={contentId}
          className='border-0 p-0'
        />
        <TooltipContent
          id={contentId}
          className='mb-2 max-w-60 border-0 px-0 py-0'
          collisionAvoidance={{
            side: 'none',
            align: 'none',
            fallbackAxisSide: 'none',
          }}
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
