import { BiGitRepoForked } from 'react-icons/bi';
import { HiOutlineStar } from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import useSWR from 'swr';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

interface GitHubRepo {
  full_name: string;
  description: string;
  forks: number;
  stargazers_count: number;
  html_url: string;
  owner: {
    avatar_url: string;
    login: string;
    html_url: string;
  };
}

type GitHubCardProps = {
  repo: string;
} & React.ComponentPropsWithoutRef<'div'>;

const GitHubCard = ({ repo, className }: GitHubCardProps) => {
  const { data: repository, error } = useSWR<GitHubRepo>(
    `https://api.github.com/repos/${repo}`,
  );

  return !error && repository ? (
    <div className='not-prose'>
      <UnstyledLink
        href={repository.html_url}
        className={clsxm(
          'block! max-w-xl',
          'not-prose px-4 py-3',
          'rounded-lg border border-gray-300 dark:border-gray-600',
          'scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97]',
          'transition duration-100',
          'animate-shadow',
          className,
        )}
      >
        <div className='flex items-center gap-2 text-sm md:text-base'>
          <SiGithub className='ml-0.5 shrink-0 text-[1.2em]' />
          <Accent className={clsxm('truncate text-ellipsis font-semibold')}>
            {repository.full_name}
          </Accent>
        </div>
        <p className={clsxm('mt-2 text-sm text-gray-700 dark:text-gray-200')}>
          {repository.description}
        </p>
        <div className='mt-2 flex gap-3'>
          <div className='flex items-center gap-1 text-xs'>
            <HiOutlineStar className='shrink-0 text-[1.2em]' />
            <span>{repository.stargazers_count}</span>
          </div>
          <div className='flex items-center gap-1 text-xs'>
            <BiGitRepoForked className='shrink-0 text-[1.2em]' />
            <span>{repository.forks}</span>
          </div>
        </div>
      </UnstyledLink>
    </div>
  ) : (
    <div
      className={clsxm(
        'mx-auto block! max-w-xl',
        'not-prose px-4 py-3',
        'rounded-lg border border-gray-300 dark:border-gray-600',
        'animate-pulse bg-gray-300 dark:bg-gray-600',
        'h-[111px] animate-pulse',
      )}
    />
  );
};

export default GitHubCard;
