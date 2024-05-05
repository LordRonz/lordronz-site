import { useState } from 'react';

import Accent from '@/components/Accent';
import CustomLightbox from '@/components/images/CustomLightbox';
import Layout from '@/components/layout/Layout';
import ProjectCard, { Project } from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const SingleProductIndexPage = ({ products }: { products: Project[] }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Layout>
      <Seo templateTitle='Products' description='List of my products' />
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
                  onImgClick={() => {
                    if (project.i === undefined) return;
                    setImgIndex(project.i);
                    setIsLightboxOpen(true);
                  }}
                  imageLinkPrefix='product'
                />
              ))}
            </div>
          </article>
        </section>
        <CustomLightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[
            {
              src: `/images/product/${products[imgIndex].image}`,
            },
          ]}
        />
      </main>
    </Layout>
  );
};

export default SingleProductIndexPage;
