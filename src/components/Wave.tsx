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
    <>
      <span
        className={clsxm('wave', triggerWave && 'initial-trigger', className)}
        {...rest}
      >
        {children}
      </span>
      <style jsx>{`
        .wave:hover {
          display: inline-block;
          animation: wave 2.25s ease-in-out infinite;
          transform-origin: 70% 70%;
        }

        .initial-trigger {
          display: inline-block;
          animation: wave 2.25s ease-in-out normal;
          transform-origin: 70% 70%;
        }

        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </>
  );
};

export default Wave;
