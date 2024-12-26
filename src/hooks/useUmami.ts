'use client';

import { useCallback, useEffect, useState } from 'react';

type PageView = {
  // Hostname of server
  hostname: string;
  // Browser language
  language: string;
  // Page referrer
  referrer: string;
  // Screen dimensions (eg. 1920x1080)
  screen: string;
  // Page title
  title: string;
  // Page url
  url: string;
  // Website ID (required)
  website: string;
};

type EventName = string;
type EventData = Record<string, string | number>;

// https://umami.is/docs/tracker-functions
export default function useUmami() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isUmamiAvailable = useCallback(() => {
    return (
      isClient &&
      typeof (window as typeof window & { umami: object }).umami !== 'undefined'
    );
  }, [isClient]);

  const pageView = useCallback(
    (data?: Partial<PageView>) => {
      if (!isUmamiAvailable()) {
        console.warn('UmamiProvider not found');
        return;
      }

      let fullData = {};
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).umami.track((props: PageView) => {
        fullData = {
          ...props,
          ...(data && { ...data }),
        };
        return fullData;
      });
      return fullData;
    },
    [isUmamiAvailable],
  );

  const event = useCallback(
    (name: EventName, data?: EventData) => {
      if (!isUmamiAvailable()) {
        console.warn('UmamiProvider not found');
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).umami?.track(name, { ...(data && { ...data }) });
      return { name, data: { ...(data && { ...data }) } };
    },
    [isUmamiAvailable],
  );

  return { pageView, event };
}
