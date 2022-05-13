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
};

export type ProjectCardProp = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProp) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-10% 0px',
  });

  return (
    <div
      ref={ref}
      className={clsxm(
        'relative transform overflow-hidden rounded-lg bg-gray-300 transition duration-200 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-800',
        'opacity-0 transition duration-500 ease-out motion-reduce:opacity-100',
        inView && 'opacity-100'
      )}
    >
      {project.image && (
        <div className='relative h-56 overflow-hidden rounded-b-lg'>
          <Image
            alt={project.title}
            src={`/images/projects/${project.image}`}
            layout='fill'
            objectFit='cover'
          />
        </div>
      )}
      <div className='px-4 pt-4 pb-16'>
        <a
          href={project.demo}
          target='_blank'
          className='text-xl font-semibold'
          rel='noopener noreferrer'
        >
          {project.title}
        </a>
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
              <MdOpenInNew className='h-6 w-6 align-middle text-gray-600 transition-colors hover:scale-105 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
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
              <SiGithub className='h-6 w-6 align-middle text-gray-600 transition-colors hover:scale-105 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
            </a>
          )}
          <div className='flex-1'></div>
          {`#${project.type}`}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
