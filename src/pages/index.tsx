/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <main>
        <section className='bg-black text-primary-50'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <h1>
              <Accent>Henlo there</Accent>
            </h1>
            <p className='mt-2 text-sm text-primary-50'>
              This starter is heavily inspired by{' '}
              <CustomLink href='https://github.com/theodorusclarence/ts-nextjs-tailwind-starter'>
                this amazing starter
              </CustomLink>
              . I changed some stuff to fit my preference.
            </p>
            <p className='mt-2 text-md text-primary-50'>
              <ArrowLink href='https://github.com/LordRonz/nextjs-starter'>
                See the repository
              </ArrowLink>
            </p>

            <ButtonLink className='mt-6' href='/components' variant='primary'>
              Components
            </ButtonLink>

            <footer className='absolute bottom-2'>
              © Aaron Christopher {new Date().getFullYear()}
            </footer>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
