import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const enum ButtonVariant {
  primary = 'primary',
  outline = 'outline',
  ghost = 'ghost',
  light = 'light',
  dark = 'dark',
}

export type ButtonProps = {
  readonly isLoading?: boolean;
  readonly isDarkBg?: boolean;
  readonly variant?: keyof typeof ButtonVariant;
} & React.ComponentPropsWithoutRef<'button'>;

const Button = ({
  children,
  className,
  disabled: buttonDisabled,
  isLoading,
  variant = ButtonVariant.primary,
  isDarkBg = true,
  ...rest
}: ButtonProps) => {
  const disabled = isLoading || buttonDisabled;

  return (
    <button
      type='button'
      disabled={disabled}
      aria-label={rest['aria-label'] ?? 'A custom button'}
      className={clsxm(
        'inline-flex items-center rounded px-4 py-2 font-semibold',
        'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
        'shadow-sm',
        !disabled
          ? 'animate-shadow scale-100 transform-gpu transition duration-300 hover:scale-[1.03] active:scale-[0.97]'
          : '',
        [
          variant === 'primary' && [
            'bg-primary-300 text-black',
            'border border-primary-500',
            'hover:bg-primary-500 hover:text-primary-50',
            'active:bg-primary-600',
            'disabled:bg-primary-300 disabled:hover:bg-primary-300 disabled:hover:text-black',
          ],
          variant === 'outline' && [
            'text-dark dark:text-primary-50',
            'border border-primary-500',
            isDarkBg
              ? 'hover:bg-primary-700 hover:text-primary-50 active:bg-primary-600 disabled:bg-transparent'
              : 'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
          ],
          variant === 'ghost' && [
            'text-dark dark:text-primary-50',
            'shadow-none',
            isDarkBg
              ? 'hover:bg-primary-700 hover:text-primary-50 active:bg-primary-600 disabled:bg-transparent'
              : 'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
          ],
          variant === 'light' && [
            'bg-white text-black',
            'border border-gray-300',
            'hover:bg-gray-100 hover:text-dark',
            'active:bg-white/80 disabled:bg-gray-200',
          ],
          variant === 'dark' && [
            'bg-gray-900 text-white',
            'border border-gray-600',
            'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
          ],
        ],
        'disabled:cursor-not-allowed',
        isLoading &&
          'relative !cursor-wait !text-transparent !transition-none hover:!text-transparent',
        className,
      )}
      {...rest}
    >
      {isLoading && (
        <div
          className={clsxm(
            'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
            {
              'text-white': variant === 'dark' || variant === 'primary',
              'text-black': variant === 'light',
              'text-primary-500': variant === 'outline' || variant === 'ghost',
            },
          )}
        >
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
