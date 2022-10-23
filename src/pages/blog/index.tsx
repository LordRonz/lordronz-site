import { InferGetStaticPropsType } from 'next';
import { useEffect, useState } from 'react';
import { HiCalendar, HiEye } from 'react-icons/hi';

import Accent from '@/components/Accent';
import Button from '@/components/buttons/Button';
import BlogCard from '@/components/content/blog/BlogCard';
import ContentPlaceholder from '@/components/content/ContentPlaceHolder';
import Tag, { SkipNavTag } from '@/components/content/Tag';
import StyledInput from '@/components/forms/StyledInput';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import SortListbox, { SortOption } from '@/components/SortListbox';
import useInjectContentMeta from '@/hooks/useInjectContentMeta';
import clsxm from '@/lib/clsxm';
import { getFromSessionStorage } from '@/lib/helper';
import { getAllFilesFrontmatter } from '@/lib/mdx';
import { getTags, sortByDate, sortDateFn } from '@/lib/mdxClient';
import { BlogFrontmatter, InjectedMeta } from '@/types/frontmatters';

const sortOptions: Array<SortOption> = [
  {
    id: 'date',
    name: 'Sort by date',
    icon: HiCalendar,
  },
  {
    id: 'views',
    name: 'Sort by views',
    icon: HiEye,
  },
];

const IndexPage = ({
  posts,
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  /** Lazy init from session storage to preserve preference on revisit */
  const [sortOrder, setSortOrder] = useState<SortOption>(
    () => sortOptions[Number(getFromSessionStorage('blog-sort')) || 0]
  );
  const [isEnglish, setIsEnglish] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const populatedPosts = useInjectContentMeta('blog', posts);

  //#region  //*=========== Search ===========
  const [search, setSearch] = useState<string>('');
  const [filteredPosts, setFilteredPosts] = useState<
    Array<BlogFrontmatter & InjectedMeta>
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
          .every((tag) => post.tags.includes(tag))
    );

    if (sortOrder.id === 'date') {
      results.sort(sortDateFn);
      sessionStorage.setItem('blog-sort', '0');
    } else if (sortOrder.id === 'views') {
      results.sort((a, b) => (b?.views ?? 0) - (a?.views ?? 0));
      sessionStorage.setItem('blog-sort', '1');
    }

    setFilteredPosts(results);
  }, [search, sortOrder.id, populatedPosts]);
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
          ?.join(' ')
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
    <Layout>
      <Seo
        templateTitle='Blog'
        description='Thoughts, mental models, and tutorials about front-end development. Rebuild your mental model so front-end development can be predictable.'
      />

      <main>
        <section className={clsxm(isLoaded && 'fade-in-start')}>
          <div className='layout py-12'>
            <h1 className='text-3xl md:text-5xl'>
              <Accent>Blog {!isEnglish && 'Bahasa Indonesia'}</Accent>
            </h1>
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
              <span className='font-medium'>Choose topic:</span>
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
              <Button
                onClick={() => {
                  setIsEnglish((b) => !b);
                  clearSearch();
                }}
                className='text-sm !font-medium'
              >
                Read in {isEnglish ? 'Bahasa Indonesia' : 'English'}
              </Button>
              <SortListbox
                selected={sortOrder}
                setSelected={setSortOrder}
                options={sortOptions}
              />
            </div>
            <ul
              className='mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
              data-fade='5'
            >
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    checkTagged={checkTagged}
                  />
                ))
              ) : (
                <ContentPlaceholder />
              )}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const files = await getAllFilesFrontmatter('blog');
  const posts = sortByDate(files);

  // Accumulate tags and remove duplicate
  const tags = getTags(posts);

  return { props: { posts, tags } };
};

export default IndexPage;
