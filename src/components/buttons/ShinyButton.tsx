import type { ButtonProps } from '@/components/buttons/ButtonV2';
import { Button } from '@/components/buttons/ButtonV2';
import clsxm from '@/lib/clsxm';

export const ShinyButton = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={clsxm(
        'animate-bg-shine border-[1px] rounded-lg shadow-sm bg-[length:200%_100%] tracking-wide',
        'dark:bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] dark:text-zinc-200 dark:border-zinc-800',
        'bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] text-zinc-800 border-zinc-300',
        props.className,
      )}
    />
  );
};

export default ShinyButton;
