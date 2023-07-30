import type { NextPage } from 'next';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';

import Accent from '@/components/Accent';
import AnimatePage from '@/components/AnimatePage';
import Layout from '@/components/layout/Layout';
import ProjectCard, { Project } from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const products: Project[] = [
  {
    title: 'Petto',
    content:
      'Petto Life provides users with relaxation activity reminder through game which is by taking care of a pet and compete through leaderboard.',
    slug: 'petto',
    type: 'app',
    github: 'petto-app/petto',
    demo: 'https://apps.apple.com/id/app/petto-life/id6450627184',
    image: 'petto.png',
  },
].map((project, i) => ({ ...project, i }));

const Product: NextPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Layout>
      <Seo templateTitle='Products' description='List of my products' />
      <AnimatePage>
        <main>
          <section className={clsxm('flex flex-col justify-center')}>
            <article className='layout space-y-10 py-8'>
              <h1 className='text-3xl md:text-5xl 2xl:text-6xl'>
                <Accent>Products</Accent>
              </h1>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {products.map((project) => (
                  <ProjectCard
                    project={project}
                    key={project.slug}
                    imageLinkPrefix='product'
                    onImgClick={() => {
                      if (project.i === undefined) return;
                      setImgIndex(project.i);
                      setIsLightboxOpen(true);
                    }}
                  />
                ))}
              </div>
            </article>
          </section>
          {isLightboxOpen && (
            <Lightbox
              mainSrc={`/images/product/${products[imgIndex].image}`}
              onCloseRequest={() => setIsLightboxOpen(false)}
            />
          )}
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default Product;
