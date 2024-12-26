'use client';

import { useCallback, useEffect, useState } from 'react';

type PageView = {
  hostname: string; // Hostname of server
  language: string; // Browser languagZ
  referrer: string; // Page referrer
  screen: string; // Screen dimensions (e.g., 1920x1080)
  title: string; // Page title
  url: string; // Page URL
  website: string; // Website ID (required)
};

type EventName = string;
type EventData = Record<string, string | number>;

// Augment the window type to include Umami tracking
declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: object) => void;
    };
  }
}

// Custom hook for Umami analytics
export default function useUmami() {
  const [isClient, setIsClient] = useState(false);

  // Ensure this hook is executed client-side
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  // Check if Umami is available
  const isUmamiAvailable = useCallback((): boolean => {
    return isClient && typeof window.umami !== 'undefined';
  }, [isClient]);

  // Track a page view
  const pageView = useCallback(
    (data?: Partial<PageView>) => {
      if (!isUmamiAvailable()) {
        console.warn('Umami tracking is unavailable.');
        return;
      }

      const defaultData: Partial<PageView> = {
        hostname: window.location.hostname,
        language: navigator.language,
        referrer: document.referrer,
        screen: `${window.screen.width}x${window.screen.height}`,
        title: document.title,
        url: window.location.href,
      };

      const fullData = { ...defaultData, ...data };

      window.umami?.track('pageview', fullData);
    },
    [isUmamiAvailable],
  );

  // Track an event
  const event = useCallback(
    (name: EventName, data?: EventData) => {
      if (!isUmamiAvailable()) {
        console.warn('Umami tracking is unavailable.');
        return;
      }

      window.umami?.track(name, data);
    },
    [isUmamiAvailable],
  );

  return { pageView, event };
}
