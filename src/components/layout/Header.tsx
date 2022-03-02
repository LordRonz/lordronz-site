import clsxm from '@/lib/clsxm';

import Accent from '../Accent';

const Header = () => {
  return (
    <header>
      <a
        href='#skip-nav'
        className={clsxm(
          'rounded-sm p-2 transition',
          'font-medium text-black dark:text-white',
          'bg-white dark:bg-dark',
          'group dark:hover:text-primary-300',
          'focus:outline-none focus:ring focus:ring-primary-300',
          'absolute top-4 left-4',
          '-translate-y-16 focus:translate-y-0'
        )}
      >
        <Accent>Skip to main content</Accent>
      </a>
      <div className='h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400' />
      <nav></nav>
    </header>
  );
};

export default Header;
