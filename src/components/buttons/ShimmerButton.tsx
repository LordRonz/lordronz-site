import clsxm from '@/lib/clsxm';

import type { ButtonProps } from './ButtonV2';
import { Button } from './ButtonV2';

export const ShimmerButton = ({ ...props }: ButtonProps) => {
  return (
    <div className='relative overflow-hidden rounded-full dark:bg-zinc-900 bg-white shadow-sm border dark:border-zinc-800 group border-zinc-400 p-0.5'>
      <span className='absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--clr-primary-400)_0%,#09090B_7%)] bg-[conic-gradient(from_90deg_at_50%_50%,var(--clr-primary-400)_0%,#fff_5%)] group-hover:bg-none' />
      <Button
        {...props}
        className={clsxm(
          'h-10 px-8 w-full rounded-full font-semibold text-zinc-800 dark:text-zinc-200 backdrop-blur-xl bg-zinc-50 dark:bg-zinc-900',
          props.className,
        )}
      />
    </div>
  );
};

export default ShimmerButton;
