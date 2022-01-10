import clsx from 'clsx';

export type CoolButtonProp = {
  width?: number | string;
  height?: number | string;
  className?: string;
  children: React.ReactNode;
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
      className={clsx(
        'overflow-visible cursor-pointer focus:outline-none group',
        className
      )}
      {...rest}
    >
      <polygon
        points={`0,${h} 0,0 ${w},0 ${w},${h}`}
        className='fill-transparent transition-all duration-800 delay-0 ease-default pointer-events-none stroke-lrred stroke-0.5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.1)] group-hover:fill-[rgba(255,0,255,0.2)]'
      />
      <polygon
        points={`0,${h} 0,0 ${w},0 ${w},${h}`}
        className='fill-transparent transition-all duration-800 delay-0 ease-default pointer-events-none stroke-lrred stroke-2 dashEffect'
      />
      <foreignObject
        x='0'
        y='0'
        width={w}
        height={h}
        className='pointer-events-none'
      >
        <div className='font-[Helvetica,Inter,Arial,sans-serif]text-[14px] font-extralight h-full flex items-center justify-center text-primary-300 uppercase'>
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
