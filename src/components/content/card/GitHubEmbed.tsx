import { ExternalLink, GitFork, Star } from 'lucide-react';
import React from 'react';
import useSWR from 'swr';

import { Card } from '@/components/ui/card';

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
  language: string | null;
  default_branch: string;
}

interface GitHubEmbedProps {
  repo: string;
  className?: string;
}

const GitHubEmbed: React.FC<GitHubEmbedProps> = ({ repo, className }) => {
  const { data: repository, error } = useSWR<GitHubRepo>(
    `https://api.github.com/repos/${repo}`,
  );

  if (error) {
    return (
      <Card className='w-full max-w-xl p-4 bg-red-50 dark:bg-red-900/10'>
        <p className='text-sm text-red-500 dark:text-red-400'>
          Failed to load repository data
        </p>
      </Card>
    );
  }

  if (!repository) {
    return (
      <div
        className='w-full max-w-xl rounded-lg border border-gray-300 dark:border-gray-600
        p-4 h-[111px] animate-pulse bg-gray-300 dark:bg-gray-600'
      />
    );
  }

  return (
    <div className='not-prose'>
      <a
        href={repository.html_url}
        target='_blank'
        rel='noopener noreferrer'
        className={`
          block max-w-xl
          px-4 py-3
          rounded-lg border border-gray-300 dark:border-gray-600
          scale-100 transform-gpu hover:scale-[1.02] active:scale-[0.97]
          transition duration-100
          hover:shadow-lg
          ${className}
        `}
      >
        <div className='flex items-center gap-2'>
          {/* Repository Name and Icon */}
          <div className='flex items-center gap-2 text-sm md:text-base'>
            <ExternalLink className='h-5 w-5 shrink-0' />
            <span className='font-semibold text-primary-500 dark:text-primary-400 truncate'>
              {repository.full_name}
            </span>
          </div>
        </div>

        {/* Description */}
        {repository.description && (
          <p className='mt-2 text-sm text-gray-700 dark:text-gray-200'>
            {repository.description}
          </p>
        )}

        {/* Stats */}
        <div className='mt-2 flex gap-3'>
          <div className='flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300'>
            <Star className='h-4 w-4 shrink-0' />
            <span>{repository.stargazers_count}</span>
          </div>
          <div className='flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300'>
            <GitFork className='h-4 w-4 shrink-0' />
            <span>{repository.forks}</span>
          </div>
          {repository.language && (
            <div className='flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300'>
              <div className='h-2 w-2 rounded-full bg-blue-500' />
              <span>{repository.language}</span>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default GitHubEmbed;
