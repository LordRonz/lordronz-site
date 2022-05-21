import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import AnimatePage from '@/components/AnimatePage';
import CoolButton from '@/components/buttons/CoolButton';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import Wave from '@/components/Wave';
import clsxm from '@/lib/clsxm';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <AnimatePage>
        <main>
          <section className={clsxm('flex flex-col justify-center')}>
            <article className='layout'>
              <h1 className='text-4xl font-bold md:text-6xl 2xl:text-7xl'>
                <Accent>Henlo there </Accent>
                <Wave>👋</Wave>
              </h1>
              <p
                className={clsxm(
                  'my-4 max-w-4xl md:mt-6',
                  'md:text-lg 2xl:text-xl'
                )}
              >
                I am a passionate Programmer, and love tinkering with Python to
                automate my personal tasks. I have a good experience with
                backend technologies and SysAdmin. I also have developed
                frontend skills by making some React projects.
              </p>
              <UnstyledLink href='/about' aria-label='About Page'>
                <CoolButton wrapperClassName='text-md font-bold' width={180}>
                  Learn More About Me
                </CoolButton>
              </UnstyledLink>
              <p className='mt-8'>
                P.S. this website is open-source and available on{' '}
                <CustomLink
                  href='https://github.com/lordronz/lordronz-site'
                  title='Link to GitHub repository'
                  aria-label='Link to GitHub repository'
                >
                  GitHub
                </CustomLink>
                .
              </p>
            </article>
          </section>
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default Home;
