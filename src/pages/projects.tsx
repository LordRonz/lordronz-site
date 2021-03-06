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
    github: 'LordRonz/risaikuru-fe',
    demo: 'https://risaikuru.vercel.app/',
    image: 'risaikuru.png',
  },
  {
    title: 'DTK Class Helper',
    content: 'Computer Engineering ITS Class List finder and helper',
    slug: 'dtk_class_helper',
    type: 'website',
    github: 'LordRonz/dtk-class-helper',
    demo: 'https://dtk-class.vercel.app/',
    image: 'dtk_class.png',
  },
  {
    title: 'Pog Bot',
    content:
      'This is a Discord Bot that has some cool commands, made with discord.js',
    slug: 'pogbot',
    type: 'discord_bot',
    github: 'LordRonz/pog-bot',
  },
  {
    title: 'Ronz Amogus',
    content:
      'This is a Discord Bot that has some cool commands and some NSFW commands too, made with discord.py',
    slug: 'ronz_amogus',
    type: 'discord_bot',
    github: 'LordRonz/ronz-amogus',
  },
  {
    title: 'Pesan Awanama',
    content:
      'Web service to send anonymous message to me, yikes. Uses FaunaDB to store messages',
    slug: 'pesan_awanama',
    type: 'website',
    github: 'LordRonz/pesan-awanama',
    demo: 'https://lr-anon.vercel.app/',
    image: 'pesan_awanama.png',
  },
  {
    title: 'Link Shortener',
    content: 'Personal link shortener and link tree using Notion API',
    slug: 'short_link',
    type: 'website',
    github: 'LordRonz/short-link',
    demo: 'https://lr-link.vercel.app/',
    image: 'short_link.png',
  },
  {
    title: 'Ronz Vulp',
    content: 'A LINE Messenger Bot made with Golang, NSFW command!',
    slug: 'ronz_vulp',
    type: 'line_bot',
    github: 'LordRonz/ronz-vulp',
  },
];

const Projects: NextPage = () => {
  return (
    <Layout>
      <Seo templateTitle='Projects' description='List of my projects' />
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
