import { useEffect, useState } from 'react';
import { HiOutlineArrowUp } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

type ScrollButtonProps = {
  wrapperClassName?: string;
} & React.ComponentPropsWithoutRef<'button'>;

const ScrollButton = ({
  wrapperClassName,
  className,
  ...rest
}: ScrollButtonProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const offset = 300;

    const onScroll = (): void => {
      if (!visible && window.scrollY > offset) {
        setVisible(true);
      } else if (visible && window.scrollY <= offset) {
        setVisible(false);
      }
    };

    onScroll();

    const opts: AddEventListenerOptions & EventListenerOptions = {
      passive: true,
    };

    window.addEventListener('scroll', onScroll, opts);
    return (): void => {
      window.removeEventListener('scroll', onScroll, opts);
    };
  }, [visible]);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={clsxm(
        'fixed right-8 bottom-8 z-50',
        !visible && 'hidden',
        wrapperClassName
      )}
    >
      <button
        type='button'
        className={clsxm(
          'inline-flex items-center justify-center rounded-md border border-transparent bg-rose-500 p-2 text-white hover:bg-rose-400 focus:outline-none dark:bg-slate-800 dark:hover:bg-slate-700',
          className
        )}
        onClick={(): void => scrollToTop()}
        {...rest}
      >
        <HiOutlineArrowUp className='h-5 w-5' />
      </button>
    </div>
  );
};

export default ScrollButton;
