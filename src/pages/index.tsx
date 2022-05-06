/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const Home: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <main>
        <section
          className={clsxm(
            '-mt-20 mb-20 flex min-h-screen flex-col justify-center',
            'fade-in-start'
          )}
        >
          <article className='layout'>
            <h1 className='text-3xl md:text-5xl 2xl:text-6xl'>
              <Accent>Henlo there 👋</Accent>
            </h1>
            <p
              className={clsxm(
                'mt-4 max-w-4xl md:mt-6',
                'md:text-lg 2xl:text-xl'
              )}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
              facere neque? Minima sunt quisquam, voluptatem, blanditiis
              dignissimos ab dolor maxime laudantium dolore iusto rem! Aperiam
              voluptatem nemo perferendis iste magni!
            </p>
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
