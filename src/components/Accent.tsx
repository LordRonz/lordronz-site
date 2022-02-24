import clsxm from '@/lib/clsxm';

export type AccentType = React.ComponentPropsWithoutRef<'span'>;

const Accent = ({ children, className }: AccentType) => {
  return (
    <span
      className={clsxm(
        'transition-colors',
        // 'from-primary-300/40 to-primary-400/40 via-primary-300/40',
        'bg-gradient-to-tr from-primary-300 via-primary-100/70 to-sky-300 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Accent;
