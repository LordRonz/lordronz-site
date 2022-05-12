import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Seo from '@/components/Seo';

const NotFound: NextPage = () => (
  <Layout>
    <Seo templateTitle='Not Found' />
    <main>
      <section className=''>
        <div className='layout flex flex-col items-center justify-center gap-y-40 text-center'>
          <div className='flex flex-col gap-y-4'>
            <h1 className='text-8xl'>
              <Accent className='from-primary-300 via-primary-100/70 to-primary-400'>
                404
              </Accent>
            </h1>
            <h2>Page Not Found</h2>
          </div>

          <p className='text-xl text-primary-400 dark:text-primary-200'>
            <ArrowLink href='/' openNewTab={false} direction='left'>
              Back To Home
            </ArrowLink>
          </p>
        </div>
      </section>
    </main>
  </Layout>
);

export default NotFound;
