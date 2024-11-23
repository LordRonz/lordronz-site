import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

import clsxm from '@/lib/clsxm';

interface CounterProps {
  /**
   * A function to format the counter value. By default, it will format the
   * number with commas.
   */
  format?: (value: number) => string;

  /**
   * The target value of the counter.
   */
  targetValue: number;

  /**
   * The direction of the counter. If "up", the counter will start from 0 and
   * go up to the target value. If "down", the counter will start from the target
   * value and go down to 0.
   */
  direction?: 'up' | 'down';

  /**
   * The delay in milliseconds before the counter starts counting.
   */
  delay?: number;

  /**
   * Additional classes for the counter.
   */
  className?: string;
}

export const Formatter = {
  number: (value: number) =>
    Intl.NumberFormat('en-US').format(+value.toFixed(0)),
  currency: (value: number) =>
    Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      +value.toFixed(0),
    ),
};

export default memo(function Counter({
  format = Formatter.number,
  targetValue,
  direction = 'up',
  delay = 0,
  className,
}: Readonly<CounterProps>) {
  const ref = useRef<HTMLSpanElement>(null);
  const isGoingUp = direction === 'up';
  const motionValue = useMotionValue(isGoingUp ? 0 : targetValue);
  const [hasRun, setHasRun] = useState(false);

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 80,
  });
  const isInView = useInView(ref, { margin: '0px', once: true });

  useEffect(() => {
    if (!isInView || hasRun) {
      return;
    }

    setHasRun(true);
    const timer = setTimeout(() => {
      motionValue.set(isGoingUp ? targetValue : 0);
    }, delay);

    return () => clearTimeout(timer);
  }, [isInView, delay, isGoingUp, targetValue, motionValue, hasRun]);

  useEffect(() => {
    springValue.on('change', (value) => {
      if (ref.current) {
        ref.current.textContent = format ? format(value) : String(value);
      }
    });
  }, [springValue, format]);

  return <span ref={ref} className={clsxm(className)} />;
});
