import React, { useEffect } from 'react';

import clsxm from '@/lib/clsxm';

type CarbonbadgeProps = {
  darkMode?: boolean;
};

export const Carbonbadge = ({ darkMode = true }: CarbonbadgeProps) => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://unpkg.com/website-carbon-badges@^1/b.min.js';
    script.defer = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id='wcb' className={clsxm('wcb carbonbadge', darkMode && 'wcb-d')} />
  );
};
