import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useMemo, useState } from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { MdHistory } from 'react-icons/md';

import Accent from '@/components/Accent';
import Comment from '@/components/content/Comment';
import MDXComponents from '@/components/content/MDXComponents';
import TableOfContents, {
  HeadingScrollSpy,
} from '@/components/content/TableOfContents';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import useScrollSpy from '@/hooks/useScrollSpy';
import clsxm from '@/lib/clsxm';
import { getFileBySlug, getFiles, getRecommendations } from '@/lib/mdx';
import { BlogFrontmatter, BlogType } from '@/types/frontmatters';

type SingleProductContentPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

const SingleProductContentPage = ({
  code,
  frontmatter,
}: SingleProductContentPageProps) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  //#region  //*=========== Link Constants ===========
  const COMMIT_HISTORY_LINK = `https://github.com/lordronz/lordronz-site/commits/main/src/contents/product/${frontmatter.slug}.mdx`;
  const GITHUB_EDIT_LINK = `https://github.com/lordronz/lordronz-site/blob/main/src/contents/product/${frontmatter.slug}.mdx`;
  //#endregion  //*======== Link Constants ===========

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy();

  const [toc, setToc] = useState<HeadingScrollSpy>();
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0;

  useEffect(() => {
    const headings = document.querySelectorAll('.mdx h1, .mdx h2, .mdx h3');

    const headingArr: HeadingScrollSpy = [];
    headings.forEach((heading) => {
      const id = heading.id;
      const level = +heading.tagName.replace('H', '');
      const text = heading.textContent + '';

      headingArr.push({ id, level, text });
    });

    setToc(headingArr);
  }, [frontmatter.slug]);
  //#endregion  //*======== Scrollspy ===========

  return (
    <Layout>
      <Seo
        templateTitle={frontmatter.title}
        description={frontmatter.description}
        date={new Date(
          frontmatter.lastUpdated ?? frontmatter.publishedAt,
        ).toISOString()}
      />
      <main>
        <section className=''>
          <div className='layout'>
            <div className='pb-4 dark:border-gray-600'>
              <h1 className='mt-4'>{frontmatter.title}</h1>

              <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
                Written on{' '}
                {format(new Date(frontmatter.publishedAt), 'MMMM dd, yyyy')} by
                Aaron Christopher.
              </p>
              {frontmatter.lastUpdated && (
                <div className='mt-2 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200'>
                  <p>
                    Last updated{' '}
                    {format(new Date(frontmatter.lastUpdated), 'MMMM dd, yyyy')}
                    .
                  </p>
                  <UnstyledLink
                    href={COMMIT_HISTORY_LINK}
                    className={clsxm(
                      'inline-flex items-center gap-1 rounded-sm font-medium',
                      'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-primary-300',
                      'focus:outline-none focus-visible:ring focus-visible:ring-primary-300',
                    )}
                  >
                    <MdHistory className='text-lg' />
                    <span>See changes</span>
                  </UnstyledLink>
                </div>
              )}
              <div className='mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
                <div className='flex items-center gap-1'>
                  <HiOutlineClock className='inline-block text-base' />
                  <Accent>{frontmatter.readingTime.text}</Accent>
                </div>
              </div>
            </div>

            <hr className='dark:border-gray-600' />

            <section className='lg:grid lg:grid-cols-[auto,250px] lg:gap-8'>
              <article className='mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert'>
                <Component
                  components={
                    {
                      ...MDXComponents,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any
                  }
                />
              </article>

              <aside className='py-4'>
                <div className='sticky top-36'>
                  <TableOfContents
                    toc={toc}
                    minLevel={minLevel}
                    activeSection={activeSection}
                  />
                </div>
              </aside>
            </section>

            <figure className='mt-12'>
              <Comment key={frontmatter.slug} />
            </figure>

            <div className='mt-8 flex flex-col items-start gap-4 md:flex-row-reverse md:justify-between'>
              <CustomLink href={GITHUB_EDIT_LINK}>
                Edit this on GitHub
              </CustomLink>
              <CustomLink href='/product'>← Back to product</CustomLink>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('product', 'number-ninja');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getFileBySlug(
    'product',
    ('number-ninja/' + params?.slug) as string,
  );

  const recommendations = await getRecommendations(params?.slug as string);

  return {
    props: { ...post, recommendations },
  };
};

export default SingleProductContentPage;
