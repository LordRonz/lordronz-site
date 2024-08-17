'use client';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import { GrDocumentText } from 'react-icons/gr';

import ShimmerButton from '@/components/buttons/ShimmerButton';
import ShinyButton from '@/components/buttons/ShinyButton';
import Graphic from '@/components/layout/Graphic';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import { MainTitle } from '@/components/typography/MainTitle';
import Wave from '@/components/Wave';
import clsxm from '@/lib/clsxm';

const HomePage = () => {
  return (
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
              automate my personal tasks. I possess extensive experience with
              backend technologies and system administration. Additionally, I
              have honed my skills through the development of various React and
              Swift projects.
            </p>
            <div className='flex items-center gap-x-2'>
              <UnstyledLink
                href='/about'
                aria-label='About Page'
                className='inline-flex'
                title='Go to about page'
              >
                <ShimmerButton leftIcon={<FaMagnifyingGlass className='' />}>
                  Learn More About Me
                </ShimmerButton>
              </UnstyledLink>
              <UnstyledLink
                href='/cv'
                aria-label='Get My CV'
                className='inline-flex'
                title='Go to CV page'
              >
                <ShinyButton
                  variant='outline'
                  leftIcon={<GrDocumentText className='' />}
                >
                  Get My CV
                </ShinyButton>
              </UnstyledLink>
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
  );
};

export default HomePage;
