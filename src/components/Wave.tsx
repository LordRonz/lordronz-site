import { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

export type WaveType = React.ComponentPropsWithoutRef<'span'>;

const Wave = ({ children, className, ...rest }: WaveType) => {
  const [triggerWave, setTriggerWave] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTriggerWave(true);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      className={clsxm(
        'inline-block origin-[70%_70%] wave-hover',
        triggerWave && 'animate-wave',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Wave;
