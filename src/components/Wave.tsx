import clsxm from '@/lib/clsxm';

export type WaveType = React.ComponentPropsWithoutRef<'span'>;

const Wave = ({ children, className, ...rest }: WaveType) => {
  return (
    <span
      className={clsxm(
        'wave-once inline-block origin-[70%_70%] wave-hover',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Wave;
