import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import clsxm from '@/lib/clsxm';

export type CustomTabProps = {
  categories: string[];
  onChange?: (newTab: string) => void;
  className?: string;
  defaultIndex?: number;
};

const CustomTab = (props: Readonly<CustomTabProps>) => {
  const { categories, onChange, className, defaultIndex = 0 } = props;

  const [tab, setTab] = useState(() => categories[defaultIndex]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => setIsLoaded(true), []);

  useEffect(() => {
    if (!isLoaded) return;

    const activeTab = tabRefs.current.get(tab);
    if (activeTab) {
      const container = activeTab.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const tabRect = activeTab.getBoundingClientRect();
        setIndicatorStyle({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
        });
      }
    }
  }, [tab, isLoaded, categories]);

  const onTabChange = useCallback(
    (value: string) => {
      setTab(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <Tabs
      value={tab}
      className={clsxm('w-full max-w-xs sm:px-0', className)}
      onValueChange={onTabChange}
    >
      <TabsList className='relative flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-700 p-0 transition-colors'>
        {isLoaded && (
          <>
            <motion.div
              className='absolute rounded-lg bg-primary-300 shadow-sm'
              style={{
                height: 'calc(100% - 0px)',
                top: '0px',
              }}
              initial={false}
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
            />
            {categories.map((category) => (
              <TabsTrigger
                key={`${category}`}
                value={category}
                ref={(el) => {
                  if (el) {
                    tabRefs.current.set(category, el);
                  } else {
                    tabRefs.current.delete(category);
                  }
                }}
                className={clsxm(
                  'relative z-10 w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-primary-200/60 ring-offset-2 ring-offset-primary-400 focus:outline-hidden focus:ring-2',
                  'transition-colors duration-200',
                  category === tab
                    ? 'text-black'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-white/12 dark:hover:text-white hover:text-black',
                )}
              >
                {category}
              </TabsTrigger>
            ))}
          </>
        )}
      </TabsList>
    </Tabs>
  );
};

export default memo(CustomTab);
