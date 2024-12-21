'use client';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import NextNProgress from 'nextjs-progressbar';
import { SWRConfig } from 'swr';

import AnimatePage from '@/components/AnimatePage';
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
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}
    >
      <NextNProgress
        color='#4a353a'
        startPosition={0.2}
        options={{ showSpinner: false }}
      />
      <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <TooltipProvider delayDuration={200}>
          <div className='flex min-h-screen flex-col justify-between'>
            <Header />
            <AnimatePage>
              <Toaster />
              <main id='content'>{children}</main>
            </AnimatePage>
            <Footer />
          </div>
        </TooltipProvider>
      </AnimatePresence>
      <ScrollButtonClient />
    </SWRConfig>
  );
};

export default ClientLayout;
