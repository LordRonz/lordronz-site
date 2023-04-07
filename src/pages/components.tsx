import type { NextPage } from 'next';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import Button from '@/components/buttons/Button';
import CoolButton from '@/components/buttons/CoolButton';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

const Home: NextPage = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout>
      <Seo templateTitle='Components' description='Component collections' />
      <main>
        <section className=''>
          <div className='layout flex min-h-screen flex-col'>
            <h1 className='mb-4 mt-10'>Components</h1>
            <p className='mb-4'>
              <ArrowLink href='/' openNewTab={false} direction='left'>
                Back To Home
              </ArrowLink>
            </p>
            <ol className='space-y-10'>
              <li className='space-y-4'>
                <h2 className='my-4'>Buttons</h2>
                <div className='space-x-4'>
                  <Button variant='primary'>Button</Button>
                  <Button
                    variant='outline'
                    isDarkBg={mounted && theme === 'dark'}
                  >
                    Button Outline
                  </Button>
                  <Button
                    variant='ghost'
                    isDarkBg={mounted && theme === 'dark'}
                  >
                    Button Ghost
                  </Button>
                  <Button variant='light'>Button Light</Button>
                  <Button variant='dark'>Button Dark</Button>
                </div>
                <div className='space-x-4'>
                  <Button variant='primary' disabled>
                    Disabled
                  </Button>
                  <Button
                    variant='outline'
                    isDarkBg={mounted && theme === 'dark'}
                    disabled
                  >
                    Disabled
                  </Button>
                  <Button
                    variant='ghost'
                    isDarkBg={mounted && theme === 'dark'}
                    disabled
                  >
                    Disabled
                  </Button>
                  <Button variant='light' disabled>
                    Disabled
                  </Button>
                  <Button variant='dark' disabled>
                    Disabled
                  </Button>
                </div>
                <div className='space-x-4'>
                  <Button variant='primary' isLoading>
                    Disabled
                  </Button>
                  <Button variant='outline' isLoading>
                    Disabled
                  </Button>
                  <Button variant='ghost' isLoading>
                    Disabled
                  </Button>
                  <Button variant='light' isLoading>
                    Disabled
                  </Button>
                  <Button variant='dark' isLoading>
                    Disabled
                  </Button>
                </div>
                <div>
                  <CoolButton>Yoo</CoolButton>
                </div>
              </li>
              <li>
                <h2 className='my-4'>Links</h2>
                <div className='space-x-8'>
                  <ArrowLink href='#'>ArrowLink</ArrowLink>
                  <ArrowLink direction='left' href='#'>
                    ArrowLink
                  </ArrowLink>
                  <ArrowLink
                    as={UnstyledLink}
                    className='inline-flex items-center'
                    href='#'
                  >
                    ArrowLink
                  </ArrowLink>
                  <ArrowLink href='#' as={ButtonLink}>
                    ArrowLink
                  </ArrowLink>
                </div>
              </li>
              <li>
                <div className='space-x-4'>
                  <ButtonLink variant='primary' href='#'>
                    ButtonLink
                  </ButtonLink>
                  <ButtonLink variant='outline' href='#'>
                    ButtonLink outline
                  </ButtonLink>
                  <ButtonLink variant='ghost' href='#'>
                    ButtonLink ghost
                  </ButtonLink>
                  <ButtonLink variant='light' href='#'>
                    ButtonLink light
                  </ButtonLink>
                  <ButtonLink variant='dark' href='#'>
                    ButtonLink dark
                  </ButtonLink>
                </div>
              </li>
              <li>
                <CustomLink href='#'>CustomLink</CustomLink>
              </li>
              <li>
                <UnstyledLink href='#'>UnstyledLink</UnstyledLink>
              </li>
              <li>
                <h2 className='my-4'>404 Page</h2>
                <ArrowLink href='/404'>Go there</ArrowLink>
              </li>
            </ol>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
