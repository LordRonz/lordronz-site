import { useEffect, useState } from 'react';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

import clsxm from '@/lib/clsxm';

import Button from '../buttons/Button';
import CustomTab from './Tab';

export type SortProps = {
  sortOrder?: 'asc' | 'desc';
  setSortOrder?: (sortOrder: 'asc' | 'desc') => void;
  onChangeSortBy?: (value: number) => void;
  sortOptions: {
    label: string;
    value: number;
  }[];
  defaultIndex?: number;
};

const Sort = (props: SortProps) => {
  const { sortOrder, setSortOrder, onChangeSortBy, sortOptions, defaultIndex } =
    props;

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className='flex gap-x-2 justify-end'>
      <Button
        className={clsxm(
          'rounded-md bg-gray-200 py-1 text-left font-medium dark:bg-dark sm:text-sm',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
          'border border-gray-300 dark:border-gray-600',
          'scale-100 transform-gpu hover:scale-[1.03] active:scale-[0.97]',
          'transition duration-100',
          'animate-shadow',
        )}
        onClick={() =>
          setSortOrder && setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
        }
        key={+isLoaded}
        aria-label='Toggle sort direction'
      >
        {sortOrder === 'desc' ? (
          <FaSortAmountDown className='text-dark dark:text-light' />
        ) : (
          <FaSortAmountDownAlt className='text-dark dark:text-light' />
        )}
      </Button>
      <CustomTab
        categories={sortOptions.map((s) => s.label)}
        className='flex-shrink-0'
        onChange={(index) => onChangeSortBy && onChangeSortBy(index)}
        defaultIndex={defaultIndex}
      />
    </div>
  );
};

export default Sort;
