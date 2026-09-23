import clsxm from '@/lib/clsxm';

import type { ButtonProps } from './ButtonV2';
import { Button } from './ButtonV2';

export const ShimmerButton = ({ ...props }: ButtonProps) => {
  return (
    <div className='group relative overflow-hidden rounded-full border border-zinc-400 bg-white p-0.5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
      <span className='absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] bg-[conic-gradient(from_90deg_at_50%_50%,var(--clr-primary-400)_0%,#fff_5%)] group-hover:bg-none dark:bg-[conic-gradient(from_90deg_at_50%_50%,var(--clr-primary-400)_0%,#09090B_7%)]' />
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
