'use client';

import { useEffect, useState } from 'react';
import { HiCalendar, HiEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import ContentPlaceholder from '@/components/content/ContentPlaceHolder';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import Sort from '@/components/forms/Sort';
import StyledInput from '@/components/forms/StyledInput';
import CustomTab from '@/components/forms/Tab';
import type { SortOption } from '@/components/SortListbox';
import { MainTitle } from '@/components/typography/MainTitle';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import clsxm from '@/lib/clsxm';
import { getFromSessionStorage } from '@/lib/helper';
import { getTags, sortDateFn, sortDateFnAsc } from '@/lib/mdxClient';
import type { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';
import type { ContentMeta } from '@/types/meta';

const sortOptions: SortOption[] = [
  {
    id: 'date',
    name: 'Sort by date',
    icon: HiCalendar,
    title: 'Sort blog by date',
  },
  {
    id: 'views',
    name: 'Sort by views',
    icon: HiEye,
    title: 'Sort blog by view count',
  },
];

const langCategories = ['English', 'Bahasa Indonesia'];

const BlogPage = ({
  posts,
  tags,
  meta,
}: {
  posts: BlogFrontmatter[];
  tags: string[];
  meta?: ContentMeta[];
}) => {
  /** Lazy init from session storage to preserve preference on revisit */
  const [sortOrder, setSortOrder] = useState<SortOption>(
    () => sortOptions[Number(getFromSessionStorage('blog-sort')) || 0],
  );
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(
    (getFromSessionStorage('blog-sort-dir') as 'asc' | 'desc') || 'desc',
  );

  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const populatedPosts = useInjectContentMeta('blog', posts, meta);

  //#region  //*=========== Search ===========
  const [search, setSearch] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<
    (BlogFrontmatter & InjectedMeta)[]
  >(() => [...posts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const clearSearch = () => setSearch('');

  useEffect(() => {
    const results = populatedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        // Check if splitted search contained in tag
        search
          .toLowerCase()
          .split(' ')
          .every((tag) => post.tags.includes(tag)),
    );

    if (sortOrder.id === 'date') {
      results.sort(sortDir === 'desc' ? sortDateFn : sortDateFnAsc);
      sessionStorage.setItem('blog-sort', '0');
    } else if (sortOrder.id === 'views') {
      results.sort(
        (a, b) =>
          ((sortDir === 'desc' ? b : a)?.views ?? 0) -
          ((sortDir === 'desc' ? a : b)?.views ?? 0),
      );
      sessionStorage.setItem('blog-sort', '1');
    }

    setFilteredPosts(results);
  }, [search, sortOrder.id, populatedPosts, sortDir]);
  //#endregion  //*======== Search ===========

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  //#region  //*=========== Post Language Splitter ===========
  const englishPosts = filteredPosts.filter((p) => !p.slug.startsWith('id-'));
  const bahasaPosts = filteredPosts.filter((p) => p.slug.startsWith('id-'));
  const currentPosts = isEnglish ? englishPosts : bahasaPosts;
  //#endregion  //*======== Post Language Splitter ===========

  //#region  //*=========== Tag ===========
  const toggleTag = (tag: string) => {
    // If tag is already there, then remove
    if (search.includes(tag)) {
      setSearch((s) =>
        s
          .split(' ')
          .filter((t) => t !== tag)
          ?.join(' '),
      );
    } else {
      // append tag
      setSearch((s) => (s !== '' ? `${s.trim()} ${tag}` : tag));
    }
  };

  /** Currently available tags based on filtered posts */
  const filteredTags = getTags(currentPosts);

  /** Show accent if not disabled and selected  */
  const checkTagged = (tag: string) => {
    return (
      filteredTags.includes(tag) &&
      search.toLowerCase().split(' ').includes(tag)
    );
  };
  //#endregion  //*======== Tag ===========

  return (
    <section className={clsxm(isLoaded && 'fade-in-start')}>
      <div className='layout py-12'>
        <MainTitle
          className='text-3xl md:text-5xl'
          title={`Blog${!isEnglish ? ' Bahasa Indonesia' : ''}`}
        />
        <p className='mt-2 text-gray-600 dark:text-gray-300'>
          Random thoughts about my expertise and hobby. It should be
          informational for yall sussy bakas.
        </p>
        <StyledInput
          data-fade='2'
          className='mt-4'
          placeholder='Search...'
          onChange={handleSearch}
          value={search}
          type='text'
        />
        <div
          className='mt-2 flex flex-wrap items-baseline justify-start gap-2 text-sm text-gray-600 dark:text-gray-300'
          data-fade='3'
        >
          <span className='font-medium'>Filter topic:</span>
          <SkipNavTag>
            {tags.map((tag) => (
              <Tag
                key={tag}
                onClick={() => toggleTag(tag)}
                disabled={!filteredTags.includes(tag)}
              >
                {checkTagged(tag) ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </SkipNavTag>
        </div>
        <div
          className='relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between'
          data-fade='4'
        >
          <CustomTab
            categories={langCategories}
            onChange={(index) => {
              setIsEnglish(index === 0);
              clearSearch();
            }}
          />
          <Sort
            sortOptions={[
              { label: 'Date', value: 0 },
              { label: 'Views', value: 1 },
            ]}
            sortOrder={sortDir}
            onChangeSortBy={(index) => setSortOrder(sortOptions[index])}
            setSortOrder={(dir) => {
              setSortDir(dir);
              sessionStorage.setItem('blog-sort-dir', dir);
            }}
            defaultIndex={sortOrder.id === 'date' ? 0 : 1}
          />
        </div>
        <ul
          className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
          data-fade='5'
        >
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <BlogCard key={post.slug} post={post} checkTagged={checkTagged} />
            ))
          ) : (
            <ContentPlaceholder />
          )}
        </ul>
      </div>
    </section>
  );
};

export default BlogPage;
