import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';

import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';
import type { BlogFrontmatter } from '@/types/frontmatters';

type PostLink = Pick<BlogFrontmatter, 'slug' | 'title'>;

const BlogPostNavigation = ({
  older,
  newer,
}: {
  older?: PostLink;
  newer?: PostLink;
}) => {
  if (!older && !newer) return null;

  return (
    <nav
      aria-label='Adjacent blog posts'
      className='mt-10 grid gap-3 border-t border-gray-200 pt-5 sm:grid-cols-2 dark:border-gray-700'
    >
      {[
        { post: older, label: 'Older post', rel: 'prev', Arrow: HiArrowLeft },
        { post: newer, label: 'Newer post', rel: 'next', Arrow: HiArrowRight },
      ].map(({ post, label, rel, Arrow }) =>
        post ? (
          <UnstyledLink
            key={rel}
            href={`/blog/${post.slug}`}
            rel={rel}
            className={clsxm(
              'flex min-w-0 flex-col gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 dark:border-gray-700 dark:bg-white/5 dark:text-gray-100',
              'hover:border-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 motion-safe:transition-colors dark:hover:border-primary-300 dark:focus-visible:outline-primary-300',
              rel === 'next' && 'sm:col-start-2 sm:text-right',
            )}
          >
            <span
              className={clsxm(
                'flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300',
                rel === 'next' &&
                  'flex-row-reverse justify-end sm:justify-start',
              )}
            >
              <Arrow
                aria-hidden='true'
                className='size-4 shrink-0 text-primary-600 dark:text-primary-300'
              />
              {label}
            </span>
            <span className='text-base leading-snug font-semibold wrap-break-word'>
              {post.title}
            </span>
          </UnstyledLink>
        ) : null,
      )}
    </nav>
  );
};

export default BlogPostNavigation;
