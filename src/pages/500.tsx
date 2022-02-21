import type { NextPage } from 'next';

import Seo from '@/components/Seo';

const ErrorPage: NextPage = () => (
  <>
    <Seo templateTitle='Error' />
    <main>
      <section className='bg-black text-primary-50'>
        <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-40 text-center'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-8xl text-primary-300'>500</h1>
            <h2>Internal Server Error</h2>
          </div>

          <p className='text-xl text-primary-200'>
            Sorry, there must be something wrong, please try again
          </p>
        </div>
      </section>
    </main>
  </>
);

export default ErrorPage;
