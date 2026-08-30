import Link from 'next/link';

import ColorModeToggle from '@/components/ColorModeToggle';
import SkipToContent from '@/components/layout/Header/SkipToContent';
import UnstyledLink from '@/components/links/UnstyledLink';

import AnimatedTitle from './animated-title';

type Links = {
  href: string;
  label: string;
}[];

export const links: Links = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const navLinkClassName =
  'animated-underline group rounded-xs py-1 font-medium text-black focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 dark:text-light dark:hover:text-primary-300';

const Header = ({ ...rest }: React.ComponentPropsWithoutRef<'header'>) => {
  return (
    <header className='sticky top-0 z-50' {...rest}>
      <SkipToContent />
      <div className='bg-light transition-colors dark:bg-dark dark:text-light'>
        <nav className='layout flex items-center justify-between py-4'>
          <Link href='/' prefetch={false}>
            <AnimatedTitle />
          </Link>
          <ul className='hidden items-center justify-between space-x-3 text-xs md:flex md:space-x-4 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={href}>
                <UnstyledLink href={href} className={navLinkClassName}>
                  <span className='rounded-xs bg-primary-300/0 p-0.5 transition-colors duration-150 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/10 motion-reduce:transition-none'>
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <button
            type='button'
            aria-label='Open navigation menu'
            className='inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-dark transition-colors hover:bg-gray-200 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 dark:text-light dark:hover:bg-gray-700 md:hidden'
            popoverTarget='drawer-navigation'
          >
            <svg
              aria-hidden='true'
              className='fill-current'
              height='32'
              viewBox='0 0 512 512'
              width='32'
            >
              <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
            </svg>
          </button>
          <ColorModeToggle className='hidden md:block' />
        </nav>
      </div>
      <div
        id='drawer-navigation'
        aria-label='Mobile navigation'
        className='mobile-navigation-drawer inset-y-0 left-0 z-99 m-0 h-dvh w-80 max-w-[calc(100vw-3.5rem)] overflow-y-auto border-0 bg-light p-4 shadow-2xl dark:bg-dark dark:text-light'
        popover='auto'
      >
        <button
          type='button'
          aria-label='Close sidebar button'
          className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 dark:hover:bg-gray-600 dark:hover:text-white'
          popoverTarget='drawer-navigation'
          popoverTargetAction='hide'
        >
          <svg
            aria-hidden='true'
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>
        <nav className='mt-4 overflow-y-auto py-4' aria-label='Mobile'>
          <ul className='space-y-2'>
            {links.map(({ href, label }) => (
              <li
                key={href}
                className='flex items-center justify-center rounded-lg py-1 text-lg'
              >
                <UnstyledLink href={href} className={navLinkClassName}>
                  <span className='rounded-xs bg-primary-300/0 p-0.5 transition-colors duration-150 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0 motion-reduce:transition-none'>
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <div className='mt-8 flex items-center justify-center'>
            <ColorModeToggle className='h-12 w-12' iconClassName='text-4xl' />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
