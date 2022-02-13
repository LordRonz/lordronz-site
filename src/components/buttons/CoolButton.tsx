import clsxm from '@/lib/clsxm';

export type CoolButtonProp = {
  readonly width?: number | string;
  readonly height?: number | string;
  readonly className?: string;
  readonly children: React.ReactNode;
} & React.ComponentPropsWithoutRef<'svg'>;

const CoolButton = ({
  width: w = 150,
  height: h = 50,
  className,
  children,
  ...rest
}: CoolButtonProp) => {
  const a = 2 * (+w + +h);

  return (
    <svg
      width={w}
      height={h}
      className={clsxm(
        'group cursor-pointer overflow-visible focus:outline-none',
        className
      )}
      {...rest}
    >
      <polygon
        points={`0,${h} 0,0 ${w},0 ${w},${h}`}
        className='duration-800 delay-0 ease-default stroke-lrred stroke-0.5 pointer-events-none fill-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all group-hover:fill-[rgba(255,0,255,0.2)]'
      />
      <polygon
        points={`0,${h} 0,0 ${w},0 ${w},${h}`}
        className='duration-800 delay-0 ease-default stroke-lrred dashEffect pointer-events-none fill-transparent stroke-2 transition-all'
      />
      <foreignObject
        x='0'
        y='0'
        width={w}
        height={h}
        className='pointer-events-none'
      >
        <div className='font-[Helvetica,Inter,Arial,sans-serif]text-[14px] flex h-full items-center justify-center font-extralight uppercase text-primary-300'>
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
  );
};

export default CoolButton;
