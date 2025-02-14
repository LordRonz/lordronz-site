import UnstyledLink, {
  type UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const enum ButtonVariant {
  primary = 'primary',
  outline = 'outline',
  ghost = 'ghost',
  light = 'light',
  dark = 'dark',
}

export type ButtonLinkProps = {
  readonly variant?: keyof typeof ButtonVariant;
} & UnstyledLinkProps;

const ButtonLink = ({
  children,
  className = '',
  variant = ButtonVariant.primary,
  ...rest
}: ButtonLinkProps) => (
  <UnstyledLink
    {...rest}
    className={clsxm(
      'inline-flex items-center rounded-sm px-4 py-2 font-semibold',
      'focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-500',
      'shadow-xs',
      'scale-100 transform-gpu hover:scale-[1.03] active:scale-[0.97]',
      'transition duration-300',
      'animate-shadow',
      'text-sm md:text-base',
      [
        variant === 'primary' && [
          'bg-primary-300 text-black',
          'border border-primary-500',
          'hover:bg-primary-500 hover:text-primary-50',
          'active:bg-primary-600',
          'disabled:bg-primary-600 disabled:hover:bg-primary-600',
        ],
        variant === 'outline' && [
          'text-dark dark:text-primary-50',
          'border border-primary-500',
          'hover:bg-primary-700 hover:text-primary-50 active:bg-primary-600 disabled:bg-primary-100',
        ],
        variant === 'ghost' && [
          'text-dark dark:text-primary-50',
          'shadow-none',
          'hover:bg-primary-700 hover:text-primary-50 active:bg-primary-600 disabled:bg-primary-100',
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
      className,
    )}
  >
    {children}
  </UnstyledLink>
);

export default ButtonLink;
