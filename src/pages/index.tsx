/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <main>
        <section className='bg-black text-primary-50'>
          <div className='layout flex flex-col justify-center items-center min-h-screen text-center'>
            <h1>Next.js + Tailwind CSS + TypeScript Starter</h1>
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

            <UnstyledLink
              href='https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FLordRonz%2Fnextjs-starter'
              className='mt-4'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                width='92'
                height='32'
                src='https://vercel.com/button'
                alt='Deploy with Vercel'
              />
            </UnstyledLink>

            <footer className='absolute bottom-2'>
              © Aaron Christopher {new Date().getFullYear()}
            </footer>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
