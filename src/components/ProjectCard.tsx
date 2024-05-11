import Image from 'next/image';
import { MdOpenInNew } from 'react-icons/md';
import { SiGithub } from 'react-icons/si';
import { useInView } from 'react-intersection-observer';

import clsxm from '@/lib/clsxm';

export type Project = {
  image?: string;
  title?: string;
  content: string;
  demo?: string;
  github?: string;
  type?: string;
  slug: string;
  i?: number;
};

export type ProjectCardProp = {
  project: Project;
  onImgClick?: () => void;
  imageLinkPrefix?: string;
};

const ProjectCard = ({
  project,
  onImgClick,
  imageLinkPrefix = 'projects',
}: ProjectCardProp) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-10% 0px',
  });

  return (
    <>
      <div
        ref={ref}
        className={clsxm(
          'card',
          'relative transform overflow-hidden rounded-lg bg-gray-300 transition duration-200 hover:-translate-y-1 dark:bg-gray-800',
          'opacity-0 transition-all duration-500 ease-out motion-reduce:opacity-100',
          'border-primary-400 hover:border-t-2',
          inView && 'opacity-100',
        )}
        title={project.title}
      >
        {project.image && (
          <button
            className='relative h-56 cursor-zoom-in overflow-hidden rounded-b-lg'
            onClick={onImgClick}
            aria-label='Project Image'
            type='button'
          >
            <Image
              alt={project.title ?? 'Project Image'}
              src={`/images/${imageLinkPrefix}/${project.image}`}
              fill
              className='object-cover'
            />
          </button>
        )}
        <div className='space-y-2 px-4 pb-16 pt-4'>
          {project.demo ? (
            <a
              href={project.demo}
              target='_blank'
              className='text-xl font-semibold'
              rel='noopener noreferrer'
            >
              {project.title}
            </a>
          ) : (
            <h1 className='text-xl font-semibold'>{project.title}</h1>
          )}
          <p className='mb-1'>{project.content}</p>
          <div className='absolute bottom-0 left-0 flex w-full items-center px-4 pb-4'>
            {project.demo && (
              <a
                href={project.demo}
                className='mr-2 p-2'
                role='button'
                target='_blank'
                rel='noopener noreferrer'
                title='Open demo'
              >
                <MdOpenInNew className='h-6 w-6 align-middle text-gray-600 transition-all hover:scale-105 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
              </a>
            )}
            {project.github && (
              <a
                href={`https://github.com/${project.github}`}
                className='p-2'
                role='button'
                title='Open GitHub'
                target='_blank'
                rel='noopener noreferrer'
              >
                <SiGithub className='h-6 w-6 align-middle text-gray-600 transition-all hover:scale-105 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
              </a>
            )}
            <div className='flex-1'></div>
            {`#${project.type}`}
          </div>
        </div>
      </div>
      <style jsx>{`
        .card::before,
        .card::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transition:
            opacity 0.38s ease-in-out,
            transform 0.35s ease-in-out;
          content: '';
          opacity: 0;
          pointer-events: none;
        }
        .card::before {
          transform: scale3d(0, 1, 1);
          transform-origin: left top;
          border-bottom: 2px solid #eb2754;
        }
        .card::after {
          transform: scale3d(1, 0, 1);
          transform-origin: right top;
          border-right: 2px solid #eb2754;
          border-left: 2px solid #eb2754;
        }
        .card:hover::before,
        .card:hover::after,
        .card:focus::before,
        .card:focus::after {
          transform: scale3d(1, 1, 1) translate(0, -0.25rem);
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default ProjectCard;
