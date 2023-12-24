import type { NextPage } from 'next';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import clsxm from '@/lib/clsxm';

const Home: NextPage = () => {
  const { height } = useWindowDimensions();

  return (
    <Layout>
      <Seo />
      <main>
        <section className={clsxm('flex flex-row items-center justify-center')}>
          <article className='layout'>
            <iframe
              src='https://drive.google.com/file/d/1TJNK452AnsMcaqgq3qQ_xhu01uwwRtyY/preview#view=fith'
              width='100%'
              height={height * 0.8}
              allow='autoplay'
              allowFullScreen
            />
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
