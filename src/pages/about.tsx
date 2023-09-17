import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import AnimatePage from '@/components/AnimatePage';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import Marker from '@/components/Marker';
import Seo from '@/components/Seo';
import TechStack from '@/components/TechStack';
import { LINK_SHORTENER_URL } from '@/constants/env';
import clsxm from '@/lib/clsxm';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Seo templateTitle='About' />
      <AnimatePage>
        <main>
          <section className={clsxm('my-16 flex flex-col justify-center')}>
            <article className='layout flex flex-col gap-y-6'>
              <div className='flex items-center gap-x-3'>
                <h1 className='text-3xl md:text-5xl 2xl:text-6xl'>
                  <Accent>Hey, I{"'"}m Aaron Christopher</Accent>
                </h1>
                <CloudinaryImg
                  className='float-right w-24 md:w-24'
                  publicId={'lordronz-site/main/memoji-thonking-airpods'}
                  alt='Me'
                  width='420'
                  height='420'
                  noStyle
                />
              </div>
              <p
                className={clsxm(
                  'my-4 max-w-4xl md:mt-2',
                  'md:text-lg 2xl:text-xl',
                  'tracking-wider'
                )}
              >
                I am a passionate <Marker>Programmer</Marker> who loves
                tinkering with <Marker>Python</Marker> to automate my personal
                tasks. I have extensive experience in{' '}
                <Marker>Backend Development</Marker>, including working with{' '}
                <Marker>virtual machines</Marker>, <Marker>Node.js</Marker>,
                using <Marker>NGINX</Marker> as a reverse proxy, and deploying
                applications with <Marker>Docker</Marker>. I have also honed my
                frontend skills by completing projects with{' '}
                <Marker>Typescript</Marker>, <Marker>React</Marker>, and{' '}
                <Marker>React Native</Marker>. My preferred databases are{' '}
                <Marker>MongoDB</Marker>, <Marker>PostgreSQL</Marker>, and I
                have recently started using <Marker>FaunaDB</Marker> as my{' '}
                <Marker>Next.js</Marker>
                database. I{"'"}m also comfortable working with SQL databases
                like <Marker>MySQL</Marker>. I particularly enjoy using{' '}
                <Marker>GitHub Action</Marker> for CI/CD tasks. Furthermore, my
                college coursework has made me proficient in{' '}
                <Marker>Linux SysAdmin</Marker>, and I use it as my daily
                operating system. Recently, I had the privilege of enrolling in
                the Apple Developer Academy as a member of an esteemed cohort
                dedicated to mastering the art of app development within the
                Apple Ecosystem. <Marker>Swift</Marker> has become one of my
                favorite languages, and I have released several groundbreaking
                apps on the App Store.
              </p>
              <div className='flex gap-x-3'>
                <ButtonLink href={`${LINK_SHORTENER_URL}/academic_resume`}>
                  See My CV
                </ButtonLink>
                <ButtonLink href={LINK_SHORTENER_URL} variant='outline'>
                  My Bio Links
                </ButtonLink>
              </div>
            </article>
          </section>
          <section className={clsxm('my-20 flex flex-col justify-center')}>
            <article className='layout'>
              <h2 className='mb-8 text-2xl md:text-4xl 2xl:text-5xl'>
                Tech Stack
              </h2>
              <TechStack />
            </article>
          </section>
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default AboutPage;
