import { memo } from 'react';

import type { UnstyledLinkProps } from '@/components/links/UnstyledLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

const CustomLink = ({ children, className, ...rest }: UnstyledLinkProps) => (
  <UnstyledLink
    {...rest}
    className={clsxm(
      'animated-underline custom-link inline-flex items-center font-semibold transition-all',
      'focus:outline-hidden focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-primary-500',
      'border-b border-dotted border-dark hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0',
      className,
    )}
  >
    {children}
  </UnstyledLink>
);

export default memo(CustomLink);
