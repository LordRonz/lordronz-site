import throttle from 'lodash-es/throttle';
import { useEffect, useState } from 'react';

// originally based on
// https://github.com/NotionX/react-notion-x/blob/master/packages/react-notion-x/src/block.tsx#L128-L161

const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const throttleMs = 100;

  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName('hash-anchor');

    const sectionArray = Array.from(sections);

    const { currentSectionId } = sectionArray.reduce(
      (acc, section) => {
        if (acc.breakLoop) return acc; // Stop processing further when the current section is found

        const bbox = section.getBoundingClientRect();
        const prevHeight = acc.prevBBox ? bbox.top - acc.prevBBox.bottom : 0;
        const offset = Math.max(200, prevHeight / 4);

        if (bbox.top - offset < 0) {
          // Update the current section ID
          const sectionId = section.getAttribute('href')?.split('#')[1] ?? null;
          return {
            prevBBox: bbox,
            currentSectionId: sectionId,
            breakLoop: false,
          };
        }

        // If last element has been detected, stop further processing
        return { ...acc, breakLoop: true };
      },
      {
        prevBBox: null as DOMRect | null,
        currentSectionId: activeSection,
        breakLoop: false,
      },
    );

    setActiveSection(currentSectionId);
  }, throttleMs);

  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy, {
      passive: true,
    });

    actionSectionScrollSpy();

    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
};

export default useScrollSpy;
