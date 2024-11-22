import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { IconType } from 'react-icons';
import { FaSortAmountDown, FaSortAmountDownAlt } from 'react-icons/fa';

import Button from '@/components/buttons/Button';
import CustomTab from '@/components/forms/Tab';
import clsxm from '@/lib/clsxm';

export type SortOption = {
  id: string;
  name: string;
  icon: IconType;
  title: string;
};

export type SortProps = {
  sortOrder?: 'asc' | 'desc';
  setSortOrder?: (sortOrder: 'asc' | 'desc') => void;
  onChangeSortBy?: (value: string) => void;
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

  const onCustomTabChange = useCallback(
    (value: string) => onChangeSortBy?.(value),
    [onChangeSortBy],
  );

  const onToggleSort = useCallback(
    () => setSortOrder?.(sortOrder === 'desc' ? 'asc' : 'desc'),
    [setSortOrder, sortOrder],
  );

  const sortOptionsMemo = useMemo(
    () => sortOptions.map((s) => s.label),
    [sortOptions],
  );

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
        onClick={onToggleSort}
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
        categories={sortOptionsMemo}
        className='flex-shrink-0'
        onChange={onCustomTabChange}
        defaultIndex={defaultIndex}
      />
    </div>
  );
};

export default memo(Sort);
