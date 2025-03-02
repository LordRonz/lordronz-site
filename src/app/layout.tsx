import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import type { Viewport } from 'next';
import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { unstable_ViewTransition as ViewTransition } from 'react';

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
        <Script
          defer
          src='/umami/script.js'
          data-website-id='51739fff-d062-4217-9533-180ec6523428'
          strategy='afterInteractive'
        />
      </head>
      <body className='bg-light tracking-wide text-dark transition-all duration-300 selection:bg-[rgb(var(--tw-clr-primary-300)_/_30%)] dark:bg-dark dark:text-light'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          <ViewTransition>
            <ClientLayout>{children}</ClientLayout>
          </ViewTransition>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
