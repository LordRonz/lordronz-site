'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

const buttonVariants = cva(
  'group inline-flex items-center justify-center rounded-sm whitespace-nowrap font-medium ring-offset-white transition-[color,background-color,border-color,box-shadow,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 motion-safe:active:scale-[0.97]',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900 text-zinc-50 dark:text-zinc-900 dark:bg-zinc-50',
        destructive:
          'bg-red-500 text-zinc-50 dark:bg-red-900 dark:text-zinc-50',
        outline:
          'border border-zinc-300 bg-white dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 hover:bg-zinc-200',
        secondary:
          'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50',
        ghost: 'hover:bg-zinc-200 dark:hover:bg-zinc-700',
        link: 'text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 px-3',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends
    Omit<ButtonPrimitive.Props, 'className'>,
    VariantProps<typeof buttonVariants> {
  className?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  hideIcon?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <ButtonPrimitive
        className={clsxm(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && (
          <span className='mr-2 shrink-0 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:-translate-x-0.5'>
            {leftIcon}
          </span>
        )}
        {props.children}
        {rightIcon && (
          <span className='ml-2 shrink-0 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:translate-x-0.5'>
            {rightIcon}
          </span>
        )}
      </ButtonPrimitive>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
