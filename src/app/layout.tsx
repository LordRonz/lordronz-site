import '@/styles/globals.css';

import type { Viewport } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header/Header';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

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
      className='scroll-smooth font-primary'
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme')==='light'?'light':'dark';document.documentElement.classList.toggle('dark',t==='dark');document.documentElement.style.colorScheme=t}catch{document.documentElement.classList.add('dark')}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `addEventListener('load',()=>{if(location.hostname==='www.aaronct.dev'){const s=document.createElement('script');s.defer=true;s.src='https://cloud.umami.is/script.js';s.dataset.websiteId='51739fff-d062-4217-9533-180ec6523428';document.head.appendChild(s)}})`,
          }}
        />
      </head>
      <body className='bg-light tracking-wide text-dark transition-colors duration-300 selection:bg-[rgb(var(--tw-clr-primary-300)/30%)] motion-reduce:transition-none dark:bg-dark dark:text-light'>
        <div className='flex min-h-screen flex-col justify-between'>
          <Header />
          <main id='content'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
