import { Tooltip as TippyTooltip, TooltipProps } from 'react-tippy';

import clsxm from '@/lib/clsxm';

declare module 'react-tippy' {
  interface TooltipProps {
    children?: React.ReactNode;
  }
}

type TooltipTextProps = {
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  spanClassName?: string;
  withUnderline?: boolean;
} & TooltipProps &
  Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'children' | 'className' | 'content'
  >;

const Tooltip = ({
  content,
  children,
  className,
  spanClassName,
  withUnderline = false,
  ...rest
}: TooltipTextProps) => {
  return (
    <TippyTooltip
      trigger='mouseenter'
      interactive
      html={
        <div
          className={clsxm(
            'inline-block rounded-md bg-white p-2 text-gray-600 shadow-md dark:bg-dark dark:text-gray-200',
            'border dark:border-primary-500',
            className,
          )}
        >
          {content}
        </div>
      }
      {...rest}
    >
      {withUnderline ? (
        <span
          className={clsxm('underline', 'decoration-dotted', spanClassName)}
        >
          {children}
        </span>
      ) : (
        <>{children}</>
      )}
    </TippyTooltip>
  );
};

export default Tooltip;
