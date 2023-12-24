import type { NextPage } from 'next';
import { GrDocumentText } from 'react-icons/gr';

import CoolButton from '@/components/buttons/CoolButton';
import { Graphic } from '@/components/layout/Graphic';
import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { MainTitle } from '@/components/typography/MainTitle';
import Wave from '@/components/Wave';
import clsxm from '@/lib/clsxm';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <main>
        <section className={clsxm('flex flex-row items-center justify-center')}>
          <article className='layout'>
            <div className='flex h-full flex-col items-center gap-x-4 gap-y-4 md:flex-row'>
              <div className='flex flex-col'>
                <MainTitle title='Henlo there '>
                  <Wave title='Hello'>👋</Wave>
                </MainTitle>
                <p
                  className={clsxm(
                    'my-4 max-w-4xl md:mt-6',
                    'md:text-lg 2xl:text-xl',
                  )}
                >
                  I am a passionate programmer and love tinkering with Python to
                  automate my personal tasks. I possess extensive experience
                  with backend technologies and system administration.
                  Additionally, I have honed my skills through the development
                  of various React and Swift projects.
                </p>
                <div className='flex  gap-x-2'>
                  <UnstyledLink
                    href='/about'
                    aria-label='About Page'
                    className='inline-flex'
                    title='Go to about page'
                  >
                    <CoolButton
                      wrapperClassName='text-md font-bold'
                      width={210}
                      height={45}
                    >
                      Learn More About Me
                    </CoolButton>
                  </UnstyledLink>
                  <ButtonLink className='inline-flex' href={`/cv`}>
                    <GrDocumentText className='mr-1' />
                    Get My CV
                  </ButtonLink>
                </div>
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
              </div>
              <Graphic />
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
