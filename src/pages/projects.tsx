import type { NextPage } from 'next';
import { useState } from 'react';

import CustomLightbox from '@/components/images/CustomLightbox';
import Layout from '@/components/layout/Layout';
import ProjectCard, { Project } from '@/components/ProjectCard';
import Seo from '@/components/Seo';
import { MainTitle } from '@/components/typography/MainTitle';
import { LINK_SHORTENER_URL } from '@/constants/env';
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
    demo: `${LINK_SHORTENER_URL}/`,
    image: 'short_link.png',
  },
  {
    title: 'Ronz Vulp',
    content: 'A LINE Messenger Bot made with Golang, NSFW command!',
    slug: 'ronz_vulp',
    type: 'line_bot',
    github: 'LordRonz/ronz-vulp',
  },
  {
    title: 'Validin',
    content: 'Validating KTP with an auto-filled form using OCR',
    slug: 'validin',
    type: 'web_service, gcp, cloud',
    github: 'capstone-bangkeith',
  },
  {
    title: 'Apimogus',
    content: 'Amogus ascii art API, made with Cloudflare worker',
    slug: 'apimogus',
    type: 'api, serverless',
    github: 'LordRonz/apimogus',
    demo: 'https://apimogus.ronz.workers.dev/',
    image: 'apimogus.png',
  },
  {
    title: 'Telemogus',
    content: 'Real nice telegram bot, made with python-telegram-bot',
    slug: 'telemogus',
    type: 'bot',
    github: 'telemogus',
    image: 'telemogus.png',
  },
].map((project, i) => ({ ...project, i }));

const Projects: NextPage = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Layout>
      <Seo templateTitle='Projects' description="List of aaron's projects" />
      <main>
        <section className={clsxm('flex flex-col justify-center')}>
          <article className='layout space-y-10 py-8'>
            <MainTitle
              className='text-3xl md:text-5xl 2xl:text-6xl'
              title='Projects'
            />
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              {projects.map((project) => (
                <ProjectCard
                  project={project}
                  key={project.slug}
                  onImgClick={() => {
                    if (project.i === undefined) return;
                    setImgIndex(project.i);
                    setIsLightboxOpen(true);
                  }}
                />
              ))}
            </div>
          </article>
        </section>
        <CustomLightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          slides={[
            {
              src: `/images/projects/${projects[imgIndex].image}`,
            },
          ]}
        />
      </main>
    </Layout>
  );
};

export default Projects;
