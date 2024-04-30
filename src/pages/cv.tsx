import type { NextPage } from 'next';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import { Skeleton } from '@/components/ui/skeleton';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import clsxm from '@/lib/clsxm';

const Home: NextPage = () => {
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <Seo templateTitle="Aaron's CV" description="Aaron Christopher's CV" />
      <main>
        <section className={clsxm('flex flex-row items-center justify-center')}>
          <article className='layout flex justify-center items-center'>
            {loading && (
              <div className='w-3/4 space-y-4 flex flex-col items-center'>
                <Skeleton className='h-4 w-3/5 mb-4' />
                {[...Array(15)].map((_, i) => (
                  <Skeleton className='h-4 w-full' key={i} />
                ))}
              </div>
            )}
            <iframe
              src='https://drive.google.com/file/d/1TJNK452AnsMcaqgq3qQ_xhu01uwwRtyY/preview#view=fith'
              width='100%'
              height={height * (loading ? 0.7 : 0.8)}
              allow='autoplay'
              allowFullScreen
              onLoad={() => setLoading(false)}
              className={clsxm(loading ? 'hidden' : 'block')}
            />
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
