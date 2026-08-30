import type { ButtonProps } from '@/components/buttons/ButtonV2';
import { Button } from '@/components/buttons/ButtonV2';
import clsxm from '@/lib/clsxm';

export const ShinyButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={clsxm(
        'rounded-lg border shadow-sm bg-[length:200%_100%] bg-[position:100%_0] tracking-wide transition-[background-position,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[position:0_0] focus-visible:bg-[position:0_0] motion-reduce:transition-none',
        'dark:bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] dark:text-zinc-200 dark:border-zinc-800',
        'bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800 border-zinc-300',
        props.className,
      )}
    />
  );
};

export default ShinyButton;
