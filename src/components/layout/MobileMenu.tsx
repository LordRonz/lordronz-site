import { AnimatePresence, motion } from 'framer-motion';

import ColorModeToggle from '@/components/ColorModeToggle';
import { links } from '@/components/layout/HeaderV1';
import NavigationItem from '@/components/NavigationItem';

export type MobileMenuProps = {
  isOpen: boolean;
  theme?: string;
  setTheme: (v: string) => void;
};

const MobileMenu = ({ isOpen, theme, setTheme }: MobileMenuProps) => {
  const navigationVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className='from-grey-200 dark:from-grey-900 fixed top-0 z-40 h-screen w-screen gap-12 bg-gradient-to-b to-transparent p-4 backdrop-blur-xl transition-all delay-100 duration-700 ease-in-out md:hidden'
          initial={{ opacity: 0, y: '-50%', x: 0 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: '-50%' }}
          transition={{ duration: 0, delay: 0 }}
        >
          <ul className='align-center flex h-full flex-col justify-center gap-4 text-center'>
            {links.map(({ href, label }, i) => (
              <NavigationItem
                href={href}
                title={label}
                key={href}
                variants={navigationVariants}
                initial='hidden'
                animate='visible'
                customDelay={0.5 + (i + 1) * 0.1}
              />
            ))}
            <motion.li
              className='mt-12 flex justify-center'
              variants={navigationVariants}
              initial='hidden'
              animate='visible'
              custom={0.5 + (links.length + 1) * 0.1}
            >
              <ColorModeToggle value={theme} onChange={setTheme} />
            </motion.li>
          </ul>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export { MobileMenu };
