'use client';

import { format } from 'date-fns';
import { getMDXComponent } from 'mdx-bundler/client';
import { useEffect, useMemo, useState } from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';
import { MdHistory } from 'react-icons/md';

import Accent from '@/components/Accent';
import Comment from '@/components/content/Comment';
import MDXComponents from '@/components/content/MDXComponents';
import type { HeadingScrollSpy } from '@/components/content/TableOfContents';
import TableOfContents from '@/components/content/TableOfContents';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import useContentMeta from '@/hooks/useContentMeta';
import useScrollSpy from '@/hooks/useScrollSpy';
import { cleanBlogPrefix } from '@/lib/blog';
import clsxm from '@/lib/clsxm';
import type { BlogFrontmatter, BlogType } from '@/types/frontmatters';

type SingleBlogPageProps = {
  recommendations: BlogFrontmatter[];
} & BlogType;

const SingleBlogPage = ({ code, frontmatter }: SingleBlogPageProps) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  //#region  //*=========== Link Constants ===========
  const COMMIT_HISTORY_LINK = `https://github.com/lordronz/lordronz-site/commits/main/src/contents/blog/${frontmatter.slug}.mdx`;
  const GITHUB_EDIT_LINK = `https://github.com/lordronz/lordronz-site/blob/main/src/contents/blog/${frontmatter.slug}.mdx`;
  //#endregion  //*======== Link Constants ===========

  //#region  //*=========== Blog Language ===========
  const cleanSlug = useMemo(
    () => cleanBlogPrefix(frontmatter.slug),
    [frontmatter.slug],
  );

  const isEnglish = useMemo(
    () => cleanSlug === frontmatter.slug,
    [cleanSlug, frontmatter.slug],
  );

  const languageLink = useMemo(
    () => `/blog/${isEnglish ? 'id-' : ''}${cleanSlug}`,
    [cleanSlug, isEnglish],
  );

  const langLinkContent = useMemo(
    () => `Read in ${isEnglish ? 'Bahasa Indonesia' : 'English'}`,
    [isEnglish],
  );
  //#endregion  //*======== Blog Language ===========

  //#region  //*=========== Content Meta ===========
  const contentSlug = `b_${cleanSlug}`;
  const meta = useContentMeta(contentSlug, { runIncrement: true });
  //#endregion  //*======== Content Meta ===========

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
    <section className=''>
      <div className='layout'>
        <div className='pb-4 dark:border-gray-600'>
          <CloudinaryImg
            publicId={`lordronz-site/banner/${frontmatter.banner}`}
            alt='Banner image'
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
          />

          <h1 className='mt-4'>{frontmatter.title}</h1>

          <p className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
            Authored on{' '}
            {format(new Date(frontmatter.publishedAt), 'MMMM dd, yyyy')} by
            Aaron Christopher.
          </p>
          {frontmatter.lastUpdated && (
            <div className='mt-2 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200'>
              <p>
                Last updated{' '}
                {format(new Date(frontmatter.lastUpdated), 'MMMM dd, yyyy')}.
              </p>
              <UnstyledLink
                href={COMMIT_HISTORY_LINK}
                className={clsxm(
                  'inline-flex items-center gap-1 rounded-xs font-medium',
                  'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-primary-300',
                  'focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300',
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
            <div className='flex items-center gap-1'>
              <HiOutlineEye className='inline-block text-base' />
              <Accent>
                {meta?.currentViews?.toLocaleString() ?? '---'} views
              </Accent>
            </div>
          </div>
          <div className='flex flex-col-reverse md:flex-row gap-y-3 justify-between mt-4 items-start'>
            {!frontmatter?.englishOnly && (
              <CustomLink href={languageLink} className='grow-0 shrink'>
                {langLinkContent}
              </CustomLink>
            )}
            <div className='flex gap-x-2 text-xs md:text-sm items-center'>
              <p>Support me:</p>
              <div className='flex gap-x-3'>
                <CustomLink href='https://go.aaronct.dev/trakteer'>
                  Trakteer
                </CustomLink>
                <CustomLink href='https://go.aaronct.dev/saweria'>
                  Saweria
                </CustomLink>
                <CustomLink href='https://go.aaronct.dev/github-sponsor'>
                  GitHub Sponsor
                </CustomLink>
              </div>
            </div>
          </div>
        </div>

        <hr className='dark:border-gray-600' />

        <section className='lg:grid lg:grid-cols-[auto_250px] lg:gap-8'>
          <article className='mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert'>
            {/* eslint-disable-next-line react-hooks/static-components */}
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
          <CustomLink href={GITHUB_EDIT_LINK}>Edit this on GitHub</CustomLink>
          <CustomLink href='/blog'>← Back to blog</CustomLink>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
