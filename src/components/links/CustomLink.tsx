import type { UnstyledLinkProps } from '@/components/links/UnstyledLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const CustomLink = ({ children, className, ...rest }: UnstyledLinkProps) => (
  <UnstyledLink
    {...rest}
    className={clsxm(
      'animated-underline custom-link inline-flex items-center font-semibold',
      'focus:outline-none focus-visible:rounded focus-visible:ring focus-visible:ring-primary-500',
      'border-dark border-b border-dotted hover:border-black/0',
      className
    )}
  >
    {children}
  </UnstyledLink>
);

export default CustomLink;
