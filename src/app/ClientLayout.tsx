'use client';

import { AnimatePresence } from 'framer-motion';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { SWRConfig } from 'swr';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header/Header';
import ScrollButtonClient from '@/components/ScrollButtonClient';
import { Toaster } from '@/components/ui/toast/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

declare module 'next-themes' {
  interface ThemeProviderProps {
    children: React.ReactNode;
  }
}

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (...args: Parameters<typeof fetch>) =>
          fetch(...args).then((res) => res.json()),
      }}
    >
      <ProgressBar
        color='#4a353a'
        startPosition={0.2}
        options={{ showSpinner: false }}
        shallowRouting
        height='3px'
      />
      <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <TooltipProvider delayDuration={200}>
          <div className='flex min-h-screen flex-col justify-between'>
            <Header />
            {/* <AnimatePage> */}
            <Toaster />
            <main id='content'>{children}</main>
            {/* </AnimatePage> */}
            <Footer />
          </div>
        </TooltipProvider>
      </AnimatePresence>
      <ScrollButtonClient />
    </SWRConfig>
  );
};

export default ClientLayout;
