import React from 'react';

import { Header } from './Header';

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: 'Adritia Alfiana' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Adritia Alfiana' })}
      />

      <section className="m-[0_auto] max-w-[600px] p-[48px_20px] font-['Nunito_Sans','Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[24px] text-[#333] dark:text-[#eee]">
        <h2 className='m-[0_0_4px] inline-block align-top text-[32px] font-black leading-none'>
          Pages in Storybook
        </h2>
        <p className='m-[1em_0]'>
          We recommend building UIs with a{' '}
          <a
            href='https://componentdriven.org'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#1ea7fd] no-underline'
          >
            <strong>component-driven</strong>
          </a>{' '}
          process starting with atomic components and ending with pages.
        </p>
        <p className='m-[1em_0]'>
          Render pages with mock data. This makes it easy to build and review
          page states without needing to navigate to them in your app. Here are
          some handy patterns for managing page data in Storybook:
        </p>
        <ul className='m-[1em_0] pl-[30px]'>
          <li className='mb-[8px]'>
            Use a higher-level connected component. Storybook helps you compose
            such data from the {'"'}args{'"'} of child component stories
          </li>
          <li className='mb-[8px]'>
            Assemble data in the page component from your services. You can mock
            these services out using Storybook.
          </li>
        </ul>
        <p className='m-[1em_0]'>
          Get a guided tutorial on component-driven development at{' '}
          <a
            href='https://storybook.js.org/tutorials/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#1ea7fd] no-underline'
          >
            Storybook tutorials
          </a>
          . Read more in the{' '}
          <a
            href='https://storybook.js.org/docs'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#1ea7fd] no-underline'
          >
            docs
          </a>
          .
        </p>
        <div className='tip-wrapper mt-[40px] mb-[40px] text-[13px] leading-[20px]'>
          <span className='tip mr-[10px] inline-block rounded-[1em] bg-[#e7fdd8] p-[4px_12px] align-top text-[11px] font-bold leading-[12px] text-[#66bf3c]'>
            Tip
          </span>{' '}
          Adjust the width of the canvas with the{' '}
          <svg
            width='10'
            height='10'
            viewBox='0 0 12 12'
            xmlns='http://www.w3.org/2000/svg'
            className='mr-[4px] mt-[3px] inline-block h-[12px] w-[12px] align-top'
          >
            <g fill='none' fillRule='evenodd'>
              <path
                d='M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z'
                id='a'
                fill='#999'
                className='fill-[#1ea7fd]'
              />
            </g>
          </svg>
          Viewports addon in the toolbar
        </div>
      </section>
    </article>
  );
};
