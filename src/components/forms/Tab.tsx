import { Tab } from '@headlessui/react';
import { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

export type CustomTabProps = {
  categories: string[];
  onChange?: (index: number) => void;
  className?: string;
  defaultIndex?: number;
};

const CustomTab = (props: CustomTabProps) => {
  const { categories, onChange, className, defaultIndex } = props;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={clsxm('w-full max-w-xs sm:px-0', className)}>
      <Tab.Group
        onChange={(index) => onChange && onChange(index)}
        selectedIndex={defaultIndex}
        key={+isLoaded}
      >
        <Tab.List className='flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-700 p-0 transition-colors'>
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                clsxm(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-primary-200/60 ring-offset-2 ring-offset-primary-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-primary-300 text-black shadow'
                    : ' text-gray-700 dark:text-gray-200 hover:bg-white/[0.12] dark:hover:text-white hover:text-black',
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
};

export default CustomTab;
