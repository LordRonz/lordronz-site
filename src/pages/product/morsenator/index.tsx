import type { NextPage } from 'next';
import Image from 'next/image';

import Accent from '@/components/Accent';
import AnimatePage from '@/components/AnimatePage';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Seo templateTitle='About' />
      <AnimatePage>
        <main>
          <section className={clsxm('my-16 flex flex-col justify-center')}>
            <article className='layout'>
              <div className='flex items-center gap-x-3'>
                <h1 className='text-3xl md:text-5xl 2xl:text-6xl'>
                  <Accent>About Morsenator</Accent>
                </h1>
                <Image
                  alt='Morsenator Logo'
                  src={`/images/product/morsenator.png`}
                  width={60}
                  height={60}
                />
              </div>
              <p
                className={clsxm(
                  'my-4 max-w-4xl md:mt-6',
                  'md:text-lg 2xl:text-xl'
                )}
              >
                I am a passionate Programmer, and love tinkering with Python to
                automate my personal tasks. I have a good experience with
                backend development, working with virtual machines, Node.js,
                using NGINX as a reverse proxy, and deploying them with Docker.
                I also have developed frontend skills by making some projects
                Typescript, and React. My database of choice is MongoDB, and
                recently I also used FaunaDB as my Next.js database. I also
                could use some SQL databases such as MySQL. I really liked using
                GitHub Action to do CI/CD stuff. Through my college course, I am
                expertised as a Linux SysAdmin, using it as my daily OS.
              </p>
            </article>
          </section>
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default AboutPage;
