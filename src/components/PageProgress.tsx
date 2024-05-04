import React from 'react';
import { useEffect, useState } from 'react';

export type PageProgressProps = {
  color?: string;
  height?: number;
  dir?: 'ltr' | 'rtl';
} & React.ComponentPropsWithoutRef<'div'>;

const PageProgress = ({
  color,
  height,
  dir = 'ltr',
  ...props
}: PageProgressProps) => {
  const [width, setWidth] = useState<string>('0');

  const watchScrolling = () => {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    const winScroll = document.body.scrollTop || scrollTop;
    const winHeight = scrollHeight - clientHeight;
    const scrolled = `${(winScroll / winHeight) * 100}%`;
    return setWidth(winHeight > 0 ? scrolled : '0');
  };

  useEffect(() => {
    window.addEventListener('scroll', watchScrolling, { passive: true });
    return () => {
      window.removeEventListener('scroll', watchScrolling);
    };
  }, [color, height]);

  const progressStyle: React.CSSProperties = {
    marginTop: 0,
    padding: 0,
    background: color ? color : 'skyblue',
    position: 'fixed',
    height: height ? height : 4,
    width: width,
    top: 0,
    right: dir === 'ltr' ? 'auto' : 0,
    zIndex: 99,
    transition: 'width 200ms ease-out',
  };

  return <div style={progressStyle} {...props} />;
};

export default React.memo(PageProgress);
