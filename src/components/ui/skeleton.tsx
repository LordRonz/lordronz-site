import clsxm from '@/lib/clsxm';

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsxm(
        'animate-pulse rounded-md bg-slate-100 dark:bg-slate-800',
        className,
      )}
      {...props}
    />
  );
};
