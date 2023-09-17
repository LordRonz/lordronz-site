import clsxm from '@/lib/clsxm';

export type MarkerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Marker = ({ children, className }: MarkerProps) => {
  return (
    <>
      <mark
        className={clsxm(
          'marked-text rounded-md bg-inherit bg-gradient-to-r from-primary-100 from-50% to-transparent to-50% px-1 text-dark transition-all dark:from-primary-600 dark:to-black dark:text-light',
          className
        )}
      >
        {children}
      </mark>
      <style jsx>{`
        .marked-text {
          -webkit-animation: 1s highlight 1s 1 normal forwards;
          animation: 1s highlight 1s 1 normal forwards;
          background-color: none;
          background-size: 200% 100%;
          background-position: 100% 0;
        }

        @-webkit-keyframes highlight {
          to {
            background-position: 0 0;
          }
        }

        @keyframes highlight {
          to {
            background-position: 0 0;
          }
        }
      `}</style>
    </>
  );
};

export default Marker;
