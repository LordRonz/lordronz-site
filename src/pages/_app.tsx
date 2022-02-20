import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
