import clsxm from '@/lib/clsxm';

export type AccentType = React.ComponentPropsWithoutRef<'span'>;

const Accent = ({ children, className }: AccentType) => {
  return (
    <span
      className={clsxm(
        'transition-all',
        // 'from-primary-300/40 to-primary-400/40 via-primary-300/40',
        'bg-gradient-to-tr from-primary-300 via-rose-700/70 to-primary-400 bg-clip-text text-transparent dark:from-primary-300 dark:via-primary-100/70 dark:to-sky-300',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Accent;
