import { useMemo } from 'react';

import clsxm from '@/lib/clsxm';

export type CoolButtonProp = {
  readonly width?: number | string;
  readonly height?: number | string;
  readonly dashLength?: number;
  readonly className?: string;
  readonly polygonClassName?: string;
  readonly movingPolygonClassName?: string;
  readonly wrapperClassName?: string;
  readonly children: React.ReactNode;
  readonly 'data-testid'?: string;
} & React.ComponentPropsWithoutRef<'svg'>;

const CoolButton = ({
  width: w = 200,
  height: h = 45,
  dashLength: a = 2 * ((+w < 1 ? 150 : +w) + (+h < 1 ? 50 : +h)),
  className,
  polygonClassName,
  movingPolygonClassName,
  wrapperClassName,
  children,
  'data-testid': dataTestId,
  ...rest
}: CoolButtonProp) => {
  const isMounted = useMemo(() => typeof window !== 'undefined', []);

  return (
    <div className='cool-button-container' data-testid={dataTestId}>
      {isMounted ? (
        <svg
          width={w}
          height={h}
          className={clsxm(
            'group cursor-pointer overflow-visible focus:outline-hidden',
            'scale-100 transform-gpu transition duration-300 hover:scale-[1.03] active:scale-[0.97]',
            'text-sm md:text-base',
            className,
          )}
          {...rest}
        >
          <polygon
            points={`0,${h} 0,0 ${w},0 ${w},${h}`}
            className={clsxm(
              'pointer-events-none fill-transparent stroke-primary-300 stroke-0.5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-700 ease-in-out group-hover:fill-fuchsia-700/25',
              polygonClassName,
            )}
          />
          <polygon
            points={`0,${h} 0,0 ${w},0 ${w},${h}`}
            className={clsxm(
              'dashEffect pointer-events-none fill-transparent stroke-primary-300 stroke-2 transition-all duration-700 ease-in-out',
              movingPolygonClassName,
            )}
          />
          <foreignObject
            x='0'
            y='0'
            width={w}
            height={h}
            className='pointer-events-none'
          >
            <div
              className={clsxm(
                'flex h-full items-center justify-center',
                wrapperClassName,
              )}
            >
              {children}
            </div>
          </foreignObject>
          <style jsx>{`
            .dashEffect {
              stroke-dasharray: ${w} ${a};
              stroke-dashoffset: ${w};
            }
            .group:hover .dashEffect {
              stroke-dashoffset: -${a};
            }
          `}</style>
        </svg>
      ) : (
        <div
          className={clsxm(
            'flex h-full items-center justify-center border-primary-400 border overflow-clip',
            wrapperClassName,
          )}
          style={{ width: w, height: h }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CoolButton;
