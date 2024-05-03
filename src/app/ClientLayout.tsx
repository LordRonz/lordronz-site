'use client';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';
import { SWRConfig } from 'swr';

import AnimatePage from '@/components/AnimatePage';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import ScrollButton from '@/components/ScrollButton';

declare module 'next-themes' {
  interface ThemeProviderProps {
    children: React.ReactNode;
  }
}

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' });
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
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <AnimatePresence
        mode='wait'
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <div className='flex min-h-screen flex-col justify-between'>
          <Header />
          <AnimatePage>{children}</AnimatePage>
          <Footer />
        </div>
      </AnimatePresence>
      <ScrollButton />
    </SWRConfig>
  );
};

export default ClientLayout;
