import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';

import clsxm from '@/lib/clsxm';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

import ClientLayout from './ClientLayout';

export const viewport: Viewport = {
  themeColor: 'black',
};

export const generateMetadata = () => {
  return generateSeoMetadata();
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang='en'
      className={clsxm(GeistSans.variable, 'scroll-smooth font-primary')}
      suppressHydrationWarning
    >
      <head>
        <script
          defer
          src='https://cloud.umami.is/script.js'
          data-website-id='51739fff-d062-4217-9533-180ec6523428'
        />
      </head>
      <body className='bg-light tracking-wide text-dark transition-all duration-300 selection:bg-[rgb(var(--tw-clr-primary-300)_/_30%)] dark:bg-dark dark:text-light'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
