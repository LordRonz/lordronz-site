import { FaLinkedin } from 'react-icons/fa6';
import {
  SiGithub,
  SiGitlab,
  SiHackerrank,
  SiLeetcode,
  SiNpm,
  SiStackoverflow,
  SiYoutube,
} from 'react-icons/si';

import UnstyledLink from '@/components/links/UnstyledLink';
import NowPlaying from '@/components/NowPlaying';
import { LINK_SHORTENER_URL } from '@/constants/env';
import clsxm from '@/lib/clsxm';

import CopyEmail from './Footer/CopyEmail';

const url_shortener = LINK_SHORTENER_URL;
const socials = [
  {
    label: 'GitHub',
    link: `${url_shortener}/github`,
    icon: SiGithub,
  },
  {
    label: 'GitLab',
    link: `${url_shortener}/gitlab`,
    icon: SiGitlab,
  },
  {
    label: 'Hackerrank',
    link: `${url_shortener}/hackerrank`,
    icon: SiHackerrank,
  },
  {
    label: 'LeetCode',
    link: `${url_shortener}/leetcode`,
    icon: SiLeetcode,
  },
  {
    label: 'LinkedIn',
    link: `${url_shortener}/linkedin`,
    icon: FaLinkedin,
  },
  {
    label: 'Stack Overflow',
    link: `${url_shortener}/stackoverflow`,
    icon: SiStackoverflow,
  },
  {
    label: 'NPM',
    link: `${url_shortener}/npm`,
    icon: SiNpm,
  },
  {
    label: 'YouTube',
    link: `${url_shortener}/youtube`,
    icon: SiYoutube,
  },
] as const;

const Footer = () => {
  return (
    <footer className='mt-4 pb-8'>
      <main className='layout flex flex-col items-center border-t border-zinc-200 pt-6 dark:border-zinc-800'>
        <FooterLinks className='pb-4' />
        <div className='flex justify-center'>
          <NowPlaying />
        </div>
        <div className='flex flex-wrap justify-center gap-1'>
          <div className='flex items-center justify-center'>
            <CopyEmail />
          </div>
          {socials.map((social) => {
            return (
              <UnstyledLink
                key={social.link}
                aria-label={social.label}
                title={social.label}
                className='group inline-flex size-11 items-center justify-center rounded-full focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300'
                href={social.link}
              >
                <social.icon
                  aria-hidden='true'
                  focusable='false'
                  className='my-auto h-6 w-6 align-middle text-gray-600 transition-colors duration-[160ms] group-hover:text-primary-300 dark:text-gray-300 dark:group-hover:text-primary-300'
                />
              </UnstyledLink>
            );
          })}
        </div>
        <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
          &copy; {new Date().getFullYear()} Aaron Christopher
        </p>
      </main>
    </footer>
  );
};

const footerLinks: { href: string; text: string; tooltip: string }[] = [
  {
    href: 'https://go.aaronct.dev/trakteer',
    text: 'Trakteer',
    tooltip: 'Support me through Trakteer!',
  },
  {
    href: 'https://go.aaronct.dev/saweria',
    text: 'Saweria',
    tooltip: 'Support me through Saweria!',
  },
  {
    href: 'https://go.aaronct.dev/github-sponsor',
    text: 'GitHub Sponsor',
    tooltip: 'Support me through GitHub Sponsor!',
  },
  {
    href: 'https://github.com/lordronz/lordronz-site',
    text: 'Source Code',
    tooltip: "View this website's source code",
  },
  {
    href: '/components',
    text: 'Components',
    tooltip: 'Component collections by Aaron',
  },
];

const FooterLinks = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsxm(
        'flex flex-wrap justify-center gap-x-8 gap-y-4',
        className,
      )}
    >
      {footerLinks.map(({ href, text, tooltip }) => (
        <UnstyledLink
          key={href}
          title={tooltip}
          className='rounded-xs animated-underline px-0.5 py-1 text-sm font-medium focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 dark:text-gray-200'
          href={href}
        >
          {text}
        </UnstyledLink>
      ))}
    </div>
  );
};

export default Footer;
