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

  return (
    <Tabs
      defaultValue={categories[defaultIndex]}
      className={clsxm('w-full max-w-xs sm:px-0', className)}
      onValueChange={onChange}
    >
      <TabsList className='relative flex space-x-1 rounded-xl bg-gray-100 dark:bg-gray-700 p-0 transition-colors'>
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className={clsxm(
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-primary-200/60 ring-offset-2 ring-offset-primary-400 focus:outline-hidden focus:ring-2',
              'text-gray-700 transition-colors duration-200 hover:bg-white/12 hover:text-black dark:text-gray-200 dark:hover:text-white',
              'data-active:bg-primary-300 data-active:text-black data-active:shadow-sm',
            )}
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default CustomTab;
