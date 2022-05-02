import React from 'react';

import clsxm from '@/lib/clsxm';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  className?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={clsxm(
        "inline-block cursor-pointer rounded-[3em] border-0 font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif] font-bold leading-none",
        primary
          ? 'bg-[#1ea7fd] text-white'
          : 'bg-transparent text-[#333] shadow-[rgb(0_0_0_/_15%)_0_0_0_1px_inset]',
        [
          size === 'small' && 'p-[10px_16px] text-[12px]',
          size === 'medium' && 'p-[11px_20px] text-[14px]',
          size === 'large' && 'p-[12px_24px] text-[16px]',
        ],
        className
      )}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
