import { m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from 'react-use';

import Accent from '@/components/Accent';
import ColorModeToggle from '@/components/ColorModeToggle';
import SkipToContent from '@/components/layout/Header/SkipToContent';
import UnstyledLink from '@/components/links/UnstyledLink';
import PageProgress from '@/components/PageProgress';
import clsxm from '@/lib/clsxm';

type Links = {
  href: string;
  label: string;
}[];

export const links: Links = [
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const Header = ({ ...rest }: React.ComponentPropsWithoutRef<'header'>) => {
  const { theme, setTheme } = useTheme();

  //#region  //*=========== Route Functionality ===========
  const pathname = usePathname();
  /** Ex: /sigma/titid -> ['', 'sigma', 'titid'] */
  const arrOfRoute = pathname?.split('/') || [];
  const baseRoute = `/${arrOfRoute[1]}`;
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = useState<boolean>(true);
  useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  const [sideNav, setSideNav] = useState(false);

  const [isSideNavClosed, setIsSideNavClosed] = useState(true);

  const closeSideNav = () => {
    setSideNav(false);
    setTimeout(() => setIsSideNavClosed(true), 310);
  };

  const ref = useRef(null);

  useClickAway(ref, () => {
    sideNav && closeSideNav();
  });

  return (
    <header
      className={clsxm(
        'sticky top-0 z-50 transition-shadow',
        !onTop && 'shadow-lg',
      )}
      {...rest}
    >
      <SkipToContent />
      <PageProgress color='#ff9a9a' />
      <div className='bg-light transition-all dark:bg-dark dark:text-light'>
        <nav className={clsxm('layout flex items-center justify-between py-4')}>
          <Link href='/' passHref>
            <m.span
              className='group relative z-50 whitespace-nowrap text-xl font-bold transition duration-300 hover:transition'
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
            >
              <span
                className={clsxm(
                  'opacity-100 transition duration-300 group-hover:opacity-0',
                )}
              >
                @lordronz{' '}
                <span
                  className={clsxm(
                    'border px-1 rounded-md border-primary-200 font-mono',
                    '/' === baseRoute &&
                      'bg-primary-300/50 group-hover:bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent',
                  )}
                >
                  {'/'}
                </span>
              </span>
              <Accent className='absolute left-0 bg-clip-text text-transparent opacity-0 transition duration-300 hover:bg-gradient-to-r group-hover:opacity-100'>
                Aaron Christopher
              </Accent>
            </m.span>
          </Link>
          <ul className='hidden items-center justify-between space-x-3 text-xs md:flex md:space-x-4 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsxm(
                    'animated-underline rounded-sm py-1 transition-all',
                    'font-medium text-black dark:text-light',
                    'group dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    href === baseRoute && 'font-bold',
                  )}
                >
                  <span
                    className={clsxm(
                      'transition-all',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/10 p-0.5 rounded-sm',
                      href === baseRoute &&
                        'bg-primary-300/50 group-hover:bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent',
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          {/* eslint-disable-next-line prettier/prettier */}
          <label className='swap swap-rotate btn-circle btn border-transparent bg-transparent text-dark outline-primary-200 hover:border-transparent hover:bg-gray-300 hover:outline-1 dark:text-light hover:dark:bg-gray-600 md:hidden'>
            <input
              type='checkbox'
              className='hidden'
              onChange={() => {
                if (isSideNavClosed) {
                  setSideNav(true);
                  setIsSideNavClosed(false);
                }
              }}
              checked={sideNav}
            />
            <svg
              className='swap-off fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 512 512'
            >
              <path d='M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z' />
            </svg>
            <svg
              className='swap-on fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='32'
              height='32'
              viewBox='0 0 512 512'
            >
              <polygon points='400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49' />
            </svg>
          </label>
          <ColorModeToggle
            value={theme}
            onChange={setTheme}
            className='hidden md:block'
          />
        </nav>
      </div>
      <div
        id='drawer-navigation'
        ref={ref}
        className={clsxm(
          'fixed left-0 top-0 z-[99] h-screen w-80 overflow-y-auto bg-light p-4 duration-300 dark:bg-dark',
          !sideNav && '-translate-x-full',
        )}
        tabIndex={-1}
        aria-labelledby='drawer-navigation-label'
      >
        <button
          type='button'
          aria-controls='drawer-navigation'
          aria-label='Close sidebar button'
          className='absolute right-2.5 top-2.5 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
          onClick={() => closeSideNav()}
        >
          <svg
            aria-hidden='true'
            className='h-5 w-5'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
          <span className='sr-only'>Close menu</span>
        </button>
        <div className='mt-4 overflow-y-auto py-4'>
          <ul className='space-y-2'>
            {links.map(({ href, label }) => (
              <li
                key={`${href}${label}`}
                className={clsxm(
                  'flex items-center justify-center rounded-lg py-1 text-lg',
                  href === baseRoute &&
                    'bg-primary-100/50 dark:bg-primary-800/50',
                )}
              >
                <UnstyledLink
                  href={href}
                  className={clsxm(
                    'animated-underline rounded-sm py-1 transition-all',
                    'font-medium text-black dark:text-light',
                    'group dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    href === baseRoute && 'font-bold',
                  )}
                >
                  <span
                    className={clsxm(
                      'transition-all',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0 p-0.5 rounded-sm',
                      href === baseRoute &&
                        'bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent',
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <div className='mt-8 flex items-center justify-center'>
            <ColorModeToggle
              value={theme}
              onChange={setTheme}
              className='h-12 w-12'
              iconClassName='text-4xl'
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
