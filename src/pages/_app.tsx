import '@/styles/globals.css';
import 'react-tippy/dist/tippy.css';
import 'react-typed/dist/animatedCursor.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNProgress from 'nextjs-progressbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem={false}>
      <NextNProgress
        color='#eb2754'
        startPosition={0.2}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
