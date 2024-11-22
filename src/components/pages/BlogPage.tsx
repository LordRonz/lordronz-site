'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { HiCalendar, HiEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import BlogCard from '@/components/content/blog/BlogCard';
import ContentPlaceholder from '@/components/content/ContentPlaceHolder';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import Sort, { type SortOption } from '@/components/forms/Sort';
import StyledInput from '@/components/forms/StyledInput';
import CustomTab from '@/components/forms/Tab';
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

const sortOptionsTab = [
  { label: 'Date', value: 0 },
  { label: 'Views', value: 1 },
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
    () => sortOptions[+(getFromSessionStorage('blog-sort') ?? 0)],
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

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);
  const clearSearch = useCallback(() => setSearch(''), []);

  const onTabChange = useCallback(
    (tab: string) => {
      setIsEnglish(tab === 'English');
      clearSearch();
    },
    [clearSearch],
  );

  const onChangeSortBy = useCallback(
    (sortOption: string) =>
      setSortOrder(
        sortOptions.find(
          (sortOpt) => sortOpt.id === sortOption.toLowerCase(),
        ) ?? sortOptions[0],
      ),
    [setSortOrder],
  );

  const setSortDirection = useCallback((dir: 'asc' | 'desc') => {
    setSortDir(dir);
    sessionStorage.setItem('blog-sort-dir', dir);
  }, []);

  const defaultSortIndex = useMemo(
    () => (sortOrder.id === 'date' ? 0 : 1),
    [sortOrder.id],
  );

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
  const englishPosts = useMemo(
    () => filteredPosts.filter((p) => !p.slug.startsWith('id-')),
    [filteredPosts],
  );
  const bahasaPosts = useMemo(
    () => filteredPosts.filter((p) => p.slug.startsWith('id-')),
    [filteredPosts],
  );
  const currentPosts = useMemo(
    () => (isEnglish ? englishPosts : bahasaPosts),
    [bahasaPosts, englishPosts, isEnglish],
  );
  //#endregion  //*======== Post Language Splitter ===========

  //#region  //*=========== Tag ===========
  const toggleTag = useCallback(
    (tag: string) => {
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
    },
    [search],
  );

  /** Currently available tags based on filtered posts */
  const filteredTags = useMemo(
    () => getTags(currentPosts).sort((a, b) => a.localeCompare(b)),
    [currentPosts],
  );

  /** Show accent if not disabled and selected  */
  const checkTagged = useCallback(
    (tag: string) => {
      return (
        filteredTags.includes(tag) &&
        search.toLowerCase().split(' ').includes(tag)
      );
    },
    [filteredTags, search],
  );

  const tagStates = useMemo(
    () =>
      tags.map((tag) => ({
        tag,
        isDisabled: !filteredTags.includes(tag),
        isTagged: checkTagged(tag),
      })),
    [tags, filteredTags, checkTagged],
  );

  // Memoize the `onClick` handler
  const getOnClickHandler = useCallback(
    (tag: string) => () => {
      toggleTag(tag);
    },
    [toggleTag],
  );
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
            {tagStates.map(({ tag, isDisabled, isTagged }) => (
              <Tag
                key={tag}
                onClick={getOnClickHandler(tag)}
                disabled={isDisabled}
              >
                {isTagged ? <Accent>{tag}</Accent> : tag}
              </Tag>
            ))}
          </SkipNavTag>
        </div>
        <div
          className='relative z-10 mt-6 flex flex-col items-end gap-4 text-gray-600 dark:text-gray-300 md:flex-row md:items-center md:justify-between'
          data-fade='4'
        >
          <CustomTab categories={langCategories} onChange={onTabChange} />
          <Sort
            sortOptions={sortOptionsTab}
            sortOrder={sortDir}
            onChangeSortBy={onChangeSortBy}
            setSortOrder={setSortDirection}
            defaultIndex={defaultSortIndex}
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
