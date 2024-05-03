import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import '@/styles/globals.css';
import '@/styles/mdx.css';
import '@/styles/gruvbox.css';
import 'react-tippy/dist/tippy.css';
import 'react-image-lightbox/style.css';

import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';
import { SWRConfig } from 'swr';

import ScrollButton from '@/components/ScrollButton';

declare module 'next-themes' {
  interface ThemeProviderProps {
    children: React.ReactNode;
  }
}

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <NextNProgress
          color='#eb2754'
          startPosition={0.2}
          options={{ showSpinner: false }}
        />
        <AnimatePresence
          mode='wait'
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <main className={`${inter.variable} font-primary`}>
            <Component {...pageProps} />
          </main>
        </AnimatePresence>
        <ScrollButton />
      </SWRConfig>
    </ThemeProvider>
  );
};

export default MyApp;
