import { useEffect, useState } from 'react';

const getWindowDimensions = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    setWindowDimensions(getWindowDimensions());

    function handleResize() {
      const newDimension = getWindowDimensions();
      if (
        windowDimensions.width === newDimension.width &&
        windowDimensions.height === newDimension.height
      ) {
        return;
      }
      setWindowDimensions(newDimension);
    }

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  return windowDimensions;
};

export default useWindowDimensions;
