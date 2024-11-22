import { memo, useCallback, useEffect, useState } from 'react';

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

  useEffect(() => setIsLoaded(true), []);

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
      <TabsList className='flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-700 p-0 transition-colors'>
        {isLoaded &&
          categories.map((category) => (
            <TabsTrigger
              key={`${category}`}
              value={category}
              className={clsxm(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-primary-200/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                category === tab
                  ? 'bg-primary-300 text-black shadow'
                  : ' text-gray-700 dark:text-gray-200 hover:bg-white/[0.12] dark:hover:text-white hover:text-black',
              )}
            >
              {category}
            </TabsTrigger>
          ))}
      </TabsList>
    </Tabs>
  );
};

export default memo(CustomTab);
