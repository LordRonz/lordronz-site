import {
  SiArchlinux,
  SiCplusplus,
  SiExpress,
  SiGo,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';

import CustomLink from '@/components/links/CustomLink';
import Tooltip from '@/components/Tooltip';
import clsxm from '@/lib/clsxm';

const TechStack = () => {
  return (
    <div className='flex space-x-2 md:space-x-4'>
      {stacks.map((tech) => (
        <Tooltip key={tech.id} content={<p>{tech.tooltip}</p>}>
          <tech.icon
            key={tech.id}
            className={clsxm(
              'h-8 w-8 md:h-10 md:w-10',
              'text-gray-600 hover:text-primary-300 dark:text-gray-200 dark:hover:text-primary-300',
              'transition-all'
            )}
          />
        </Tooltip>
      ))}
    </div>
  );
};

const stacks = [
  {
    id: 'nextjs',
    icon: SiNextdotjs,
    tooltip: (
      <>
        <CustomLink href='https://nextjs.org'>Next.js</CustomLink>, currently my
        go-to framework because of the static generation, dynamic paths, and
        built-in api.
      </>
    ),
  },
  {
    id: 'react',
    icon: SiReact,
    tooltip: (
      <>
        <CustomLink href='https://reactjs.org/'>Create React App</CustomLink>,
        first frontend framework that I learned, great if you are making an
        authenticated website.
      </>
    ),
  },
  {
    id: 'typescript',
    icon: SiTypescript,
    tooltip: (
      <>
        <CustomLink href='https://www.typescriptlang.org/'>
          TypeScript
        </CustomLink>
        , a strongly typed programming language that builds on JavaScript,
        giving you better tooling at any scale. I use this extensively because
        it is so good and less error-prone than JS.
      </>
    ),
  },
  {
    id: 'golang',
    icon: SiGo,
    tooltip: (
      <>
        <CustomLink href='https://go.dev/'>Go</CustomLink>, is an open source
        programming language supported by Google. I mainly use this language
        along with Postgresql and Redis to build a Backend API.
      </>
    ),
  },
  {
    id: 'redis',
    icon: SiRedis,
    tooltip: (
      <>
        <CustomLink href='https://redis.io/'>Redis</CustomLink> is the open
        source, in-memory data store used by millions of developers as a
        database, cache, streaming engine, and message broker. It is very
        awesome as a caching mechanism, used it with nearly every backend
        project I{"'"}ve build
      </>
    ),
  },
  {
    id: 'tailwind',
    icon: SiTailwindcss,
    tooltip: (
      <>
        <CustomLink href='https://tailwindcss.com/'>Tailwind CSS</CustomLink> is
        awesome, I have never achieved this much reusability. Make sure you get
        the{' '}
        <CustomLink href='https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss'>
          extension
        </CustomLink>
        .
      </>
    ),
  },
  {
    id: 'node',
    icon: SiNodedotjs,
    tooltip: (
      <>
        <CustomLink href='https://nodejs.org/'>Node.js</CustomLink>, simple
        backend language so you don{"'"}t need to learn another language.
      </>
    ),
  },
  {
    id: 'express',
    icon: SiExpress,
    tooltip: (
      <>
        <CustomLink href='https://expressjs.com/'>Express.js</CustomLink>, is a
        simple back end web application framework for Node.js. I usually use
        express to make REST APIs.
      </>
    ),
  },
  {
    id: 'cplusplus',
    icon: SiCplusplus,
    tooltip: (
      <>
        <CustomLink href='https://www.cplusplus.com/'>C++</CustomLink>, language
        that I used to do Competitive Programming exercises, and Arduino
        programming.
      </>
    ),
  },
  {
    id: 'python',
    icon: SiPython,
    tooltip: (
      <>
        <CustomLink href='https://www.python.org/'>Python</CustomLink>, a
        programming language that lets you work quickly and integrate systems
        more effectively. I usually use this language to make scripts, doing
        CTFs, and making basically anything.
      </>
    ),
  },
  {
    id: 'archlinux',
    icon: SiArchlinux,
    tooltip: (
      <>
        <CustomLink href='https://archlinux.org/'>Arch Linux</CustomLink>, my
        main OS to do programming and work. I use Arch btw.
      </>
    ),
  },
  {
    id: 'mongodb',
    icon: SiMongodb,
    tooltip: (
      <>
        <CustomLink href='https://www.mongodb.com/'>MongoDB</CustomLink>, when
        it comes to NoSQL database, my choice is MongoDB, robust and flexible to
        use.
      </>
    ),
  },
  {
    id: 'postgresql',
    icon: SiPostgresql,
    tooltip: (
      <>
        <CustomLink href='https://www.postgresql.org/'>PostgreSQL</CustomLink>,
        the world{"'"}s most advanced open source database. This is my SQL
        database of choice because of its reputation, speed, and reliability.
      </>
    ),
  },
];

export default TechStack;
