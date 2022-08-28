import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import * as React from 'react';

import Accent from '@/components/Accent';
import ColorModeToggle from '@/components/ColorModeToggle';
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
];

const Header = () => {
  const { theme, setTheme } = useTheme();

  //#region  //*=========== Route Functionality ===========
  const router = useRouter();
  /** Ex: /projects/petrolida-2021 -> ['', 'projects', 'petrolida-2021'] */
  const arrOfRoute = router.route.split('/');
  const baseRoute = '/' + arrOfRoute[1];
  //#endregion  //*======== Route Functionality ===========

  //#region  //*=========== Scroll Shadow ===========
  const [onTop, setOnTop] = React.useState<boolean>(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setOnTop(window.pageYOffset === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //#endregion  //*======== Scroll Shadow ===========

  return (
    <header
      className={clsxm(
        'sticky top-0 z-50 transition-shadow',
        !onTop && 'shadow-lg'
      )}
    >
      <a
        href='#skip-nav'
        className={clsxm(
          'rounded-sm p-2 transition',
          'font-medium text-dark dark:text-white',
          'bg-light dark:bg-dark',
          'group dark:hover:text-primary-300',
          'focus:outline-none focus:ring focus:ring-primary-300',
          'absolute top-4 left-4 z-[1000]',
          '-translate-y-16 focus:translate-y-0'
        )}
      >
        <Accent>Skip to content</Accent>
      </a>
      {/* <div className='h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' /> */}
      <PageProgress color='#ff9a9a' />
      <div className='bg-light transition-all dark:bg-dark dark:text-light'>
        <nav className={clsxm('layout flex items-center justify-between py-4')}>
          <Link href='/' passHref>
            <motion.a
              className='group relative z-50 whitespace-nowrap font-bold transition duration-300 hover:transition md:text-xl'
              animate={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: -10 }}
            >
              <span className='opacity-100 transition duration-300 group-hover:opacity-0'>
                @lordronz
              </span>
              <Accent className='absolute left-0 bg-clip-text text-transparent opacity-0 transition duration-300 hover:bg-gradient-to-r group-hover:opacity-100'>
                Aaron Christopher
              </Accent>
            </motion.a>
          </Link>
          <ul className='flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink
                  href={href}
                  className={clsxm(
                    'animated-underline rounded-sm py-1 transition-all',
                    'font-medium text-black dark:text-light',
                    'group dark:hover:text-primary-300',
                    'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    href === baseRoute && 'font-bold'
                  )}
                >
                  <span
                    className={clsxm(
                      'transition-all',
                      'bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0',
                      href === baseRoute &&
                        'bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent'
                    )}
                  >
                    {label}
                  </span>
                </UnstyledLink>
              </li>
            ))}
          </ul>
          <ColorModeToggle value={theme} onChange={setTheme} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
