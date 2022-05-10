import type { NextPage } from 'next';

import Accent from '@/components/Accent';
import AnimatePage from '@/components/AnimatePage';
import Layout from '@/components/layout/Layout';
import ProjectCard, { Project } from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const projects: Project[] = [
  {
    title: 'Risaikuru',
    content:
      'Risaikuru is a web service that can classify your trash to determine if it is organic or reusable',
    slug: 'risaikuru',
    type: 'website',
    github: 'https://github.com/LordRonz/risaikuru-fe',
  },
  {
    title: 'Pog Bot',
    content:
      'This is a Discord Bot that has some cool commands, made with discord.js',
    slug: 'pogbot',
    type: 'discord_bot',
    github: 'https://github.com/LordRonz/pog-bot',
  },
  {
    title: 'DTK Class Helper',
    content: 'Computer Engineering ITS Class List finder and helper',
    slug: 'dtk_class_helper',
    type: 'website',
    github: 'https://github.com/LordRonz/dtk-class-helper',
  },
  {
    title: 'Ronz Amogus',
    content:
      'This is a Discord Bot that has some cool commands and some NSFW commands too, made with discord.py',
    slug: 'ronz_amogus',
    type: 'discord_bot',
    github: 'https://github.com/LordRonz/ronz-amogus',
  },
  {
    title: 'Ronz Vulp',
    content: 'This is a LINE Messenger Bot made with Golang',
    slug: 'ronz_vulp',
    type: 'line_bot',
    github: 'https://github.com/LordRonz/ronz-vulp',
  },
];

const Projects: NextPage = () => {
  return (
    <Layout>
      <Seo />
      <AnimatePage>
        <main>
          <section className={clsxm('flex flex-col justify-center')}>
            <article className='layout space-y-10 py-8'>
              <h1 className='text-3xl md:text-5xl 2xl:text-6xl'>
                <Accent>Projects</Accent>
              </h1>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                {projects.map((project) => (
                  <ProjectCard project={project} key={project.slug} />
                ))}
              </div>
            </article>
          </section>
        </main>
      </AnimatePage>
    </Layout>
  );
};

export default Projects;
