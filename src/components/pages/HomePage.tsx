import { FaMagnifyingGlass } from 'react-icons/fa6';
import { GrDocumentText } from 'react-icons/gr';

import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import { MainTitle } from '@/components/typography/MainTitle';
import Wave from '@/components/Wave';
import clsxm from '@/lib/clsxm';

const ctaBase =
  'group inline-flex h-12 items-center justify-center whitespace-nowrap px-8 text-lg font-medium ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 motion-safe:active:scale-[0.97]';

const HomePage = () => {
  return (
    <section
      className={clsxm(
        'layout py-10 sm:py-16',
        'lg:flex lg:min-h-[calc(100svh-5rem)] lg:items-center lg:py-24',
      )}
    >
      <article className='grid w-full gap-y-12 lg:grid-cols-[minmax(0,1.8fr)_minmax(16rem,0.7fr)] lg:gap-x-20 lg:gap-y-14'>
        <div className='lg:col-span-2'>
          <MainTitle
            title='Henlo there '
            className='whitespace-nowrap text-[2.5rem] leading-[0.95] tracking-[-0.035em] sm:text-6xl lg:text-7xl'
          >
            <Wave title='Hello' className='motion-reduce:animate-none'>
              👋
            </Wave>
          </MainTitle>
          <span
            aria-hidden='true'
            className='hero-light-rail mt-7 block h-px w-full max-w-4xl bg-[linear-gradient(90deg,transparent,var(--clr-primary-300),#38bdf8,transparent)] bg-[length:200%_100%]'
          />
        </div>
        <p className='max-w-[62ch] text-base leading-7 text-zinc-700 dark:text-zinc-300 md:text-xl md:leading-8'>
          I am a passionate programmer and love tinkering with Python to
          automate my personal tasks. I possess extensive experience with
          backend technologies and system administration. Additionally, I have
          honed my skills through the development of various React and Swift
          projects.
        </p>
        <div className='flex flex-col items-stretch gap-3 sm:items-start lg:pt-1'>
          <UnstyledLink
            href='/about'
            aria-label='Learn More About Me'
            title='Go to about page'
            className={clsxm(
              ctaBase,
              'relative isolate w-full overflow-hidden rounded-full bg-primary-500 text-white transition-[color,background-color,border-color,box-shadow,transform] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] before:pointer-events-none before:absolute before:inset-0 before:-translate-x-[125%] before:bg-[linear-gradient(105deg,transparent_35%,rgb(255_255_255_/_0.5)_50%,transparent_65%)] before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary-600 hover:before:translate-x-[125%] focus-visible:before:translate-x-[125%] sm:w-auto dark:bg-primary-300 dark:text-primary-900 dark:hover:bg-primary-200 lg:w-full motion-reduce:before:transition-none',
            )}
          >
            <span className='mr-2 shrink-0 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:-translate-x-0.5'>
              <FaMagnifyingGlass aria-hidden='true' />
            </span>
            Learn More About Me
          </UnstyledLink>
          <UnstyledLink
            href='/cv'
            aria-label='Get My CV'
            title='Go to CV page'
            className={clsxm(
              ctaBase,
              'w-full rounded-full border border-zinc-300 bg-[linear-gradient(110deg,#FFF,45%,#E4E4E7,55%,#FFF)] bg-[length:200%_100%] bg-[position:100%_0] text-zinc-800 shadow-sm transition-[background-position,color,border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[position:0_0] focus-visible:bg-[position:0_0] sm:w-auto dark:border-zinc-800 dark:bg-[linear-gradient(110deg,#09090B,45%,#27272A,55%,#09090B)] dark:text-zinc-200 lg:w-full motion-reduce:transition-none',
            )}
          >
            <span className='mr-2 shrink-0 transition-transform duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:-translate-x-0.5'>
              <GrDocumentText aria-hidden='true' />
            </span>
            Get My CV
          </UnstyledLink>
          <p className='mt-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400'>
            P.S. this website is open-source and available on{' '}
            <CustomLink
              href='https://github.com/lordronz/lordronz-site'
              aria-label='Link to GitHub repository'
              title='Link to GitHub repository'
            >
              GitHub
            </CustomLink>
            .
          </p>
        </div>
      </article>
    </section>
  );
};

export default HomePage;
