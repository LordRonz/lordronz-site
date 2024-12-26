import { format, parse } from 'date-fns';
import { memo } from 'react';
import { HiOutlineClock, HiOutlineEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import Tag from '@/components/content/Tag';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import UnstyledLink from '@/components/links/UnstyledLink';
import Counter from '@/components/text/counter';
import clsxm from '@/lib/clsxm';
import type { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';

type BlogCardProps = {
  post: BlogFrontmatter & InjectedMeta;
  checkTagged?: (tag: string) => boolean;
} & React.ComponentPropsWithoutRef<'li'>;

const BlogCard = ({ post, className, checkTagged }: BlogCardProps) => {
  return (
    <li
      className={clsxm(
        'w-full rounded-md border border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-dark',
        'scale-100 hover:scale-[1.02] hover:border-primary-300 active:scale-[0.97] motion-safe:transform-gpu hover:dark:border-primary-300',
        'transition duration-100',
        'motion-reduce:hover:scale-100',
        'animate-shadow',
        className,
      )}
      title={post.title}
    >
      <UnstyledLink
        className='block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
        href={`/blog/${post.slug}`}
        data-umami-event='Blog Card Click'
        data-umami-event-slug={post.slug}
      >
        <div className='relative'>
          <CloudinaryImg
            noStyle
            className='pointer-events-none overflow-hidden rounded-t-md'
            publicId={`lordronz-site/banner/${post.banner}`}
            alt='Photo taken from unsplash'
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
            preview={false}
          />
          <div
            className={clsxm(
              'absolute bottom-0 w-full px-4 py-2',
              'mt-2 flex flex-wrap justify-end gap-x-2 gap-y-1 text-sm text-black dark:text-gray-100',
            )}
          >
            {post.tags.split(',').map((tag) => (
              <Tag
                tabIndex={-1}
                className='bg-opacity-80 dark:!bg-opacity-60'
                key={tag}
                tag={tag}
              >
                {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className='p-4'>
          <h1 className='text-gray-800 dark:text-gray-100 text-base font-bold md:text-lg'>
            {post.title}
          </h1>
          <div className='mt-2 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300'>
            <div className='flex items-center gap-1'>
              <HiOutlineClock className='inline-block text-base' />
              <Accent>{post.readingTime.text}</Accent>
            </div>
            <div className='flex items-center gap-1'>
              <HiOutlineEye className='inline-block text-base' />
              <Accent>
                {post?.views?.toLocaleString() ? (
                  <Counter targetValue={post.views} />
                ) : (
                  '---'
                )}{' '}
                views
              </Accent>
            </div>
          </div>
          <p className='mb-2 mt-4 text-sm text-gray-600 dark:text-gray-300'>
            <span className='font-bold text-gray-800 dark:text-gray-100'>
              {format(
                parse(
                  post.lastUpdated ?? post.publishedAt,
                  'yyyy-MM-dd',
                  new Date(),
                ),
                'MMM d, yyyy',
              )}
            </span>
          </p>
          <p className='text-sm text-gray-700 dark:text-gray-300'>
            {post.description}
          </p>
        </div>
      </UnstyledLink>
    </li>
  );
};

export default memo(
  BlogCard,
  (prevProps, nextProps) =>
    prevProps.post.slug === nextProps.post.slug &&
    prevProps.className === nextProps.className &&
    prevProps.checkTagged?.toString() === nextProps.checkTagged?.toString,
);
