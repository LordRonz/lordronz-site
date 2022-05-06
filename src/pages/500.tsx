import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const ErrorPage: NextPage = () => (
  <Layout>
    <Seo templateTitle='Error' />
    <main>
      <section className=''>
        <div className='layout flex min-h-screen flex-col items-center justify-center gap-y-40 text-center'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-8xl'>
              <Accent className='from-primary-300 via-primary-100/70 to-primary-400'>
                500
              </Accent>
            </h1>
            <h2>Internal Server Error</h2>
          </div>

          <p className='text-xl text-primary-400 dark:text-primary-200'>
            Sorry, there must be something wrong, please try again
          </p>
        </div>
      </section>
    </main>
  </Layout>
);

export default ErrorPage;
