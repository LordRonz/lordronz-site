import Link, { LinkProps } from 'next/link';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  nextLinkProps?: Omit<LinkProps, 'href'>;
} & React.ComponentPropsWithoutRef<'a'>;

const UnstyledLink = ({
  children,
  href,
  openNewTab,
  className,
  nextLinkProps,
  ...rest
}: UnstyledLinkProps) => {
  const isNewTab =
    openNewTab ?? (href && !href.startsWith('/') && !href.startsWith('#'));

  if (!isNewTab) {
    return (
      <Link href={href} {...nextLinkProps}>
        <a {...rest} className={className}>
          {children}
        </a>
      </Link>
    );
  }

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      {...rest}
      className={className}
    >
      {children}
    </a>
  );
};

export default UnstyledLink;
