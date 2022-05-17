import clsxm from '@/lib/clsxm';

export type WaveType = React.ComponentPropsWithoutRef<'span'>;

const Wave = ({ children, className }: WaveType) => {
  return (
    <>
      <span className={clsxm('wave', className)}>{children}</span>
      <style jsx>{`
        .wave:hover {
          display: inline-block;
          animation: wave 2.25s ease-in-out infinite;
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
