import '@/styles/globals.css';
import '@/styles/mdx.css';
import '@/styles/dracula.css';
import 'react-tippy/dist/tippy.css';
import 'react-typed/dist/animatedCursor.css';
import 'react-image-lightbox/style.css';

import { Inter } from '@next/font/google';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

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
        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </AnimatePresence>
      <ScrollButton />
    </ThemeProvider>
  );
};

export default MyApp;
