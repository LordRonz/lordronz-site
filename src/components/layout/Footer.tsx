import {
  SiGithub,
  SiGitlab,
  SiHackerrank,
  SiLeetcode,
  SiLinkedin,
  SiStackoverflow,
  SiYoutube,
} from 'react-icons/si';

import UnstyledLink from '@/components/links/UnstyledLink';
import NowPlaying from '@/components/NowPlaying';
import Tooltip from '@/components/Tooltip';
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
    icon: SiLinkedin,
  },
  {
    label: 'Stack Overflow',
    link: `${url_shortener}/stackoverflow`,
    icon: SiStackoverflow,
  },
  {
    label: 'YouTube',
    link: `${url_shortener}/youtube`,
    icon: SiYoutube,
  },
] as const;

const Footer = () => {
  return (
    <>
      <footer className='mt-4 pb-8'>
        <main className='footer-divider layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
          <FooterLinks className='pb-4' />
          <div className='flex justify-center'>
            <NowPlaying />
          </div>
          <div className='flex gap-x-3'>
            <div className='flex items-center justify-center'>
              <CopyEmail />
            </div>
            {socials.map((social) => {
              return (
                <Tooltip key={social.link} content={social.label}>
                  <UnstyledLink
                    aria-label={social.label}
                    className='inline-flex items-center justify-center rounded-sm focus:outline-none group focus-visible:ring focus-visible:ring-primary-300'
                    href={social.link}
                  >
                    <social.icon className='my-auto h-7 w-7 align-middle text-gray-600 transition-all group-hover:text-primary-300 dark:text-gray-300 group-hover:dark:text-primary-300' />
                  </UnstyledLink>
                </Tooltip>
              );
            })}
          </div>
          <p className='mt-8 text-sm text-gray-600 dark:text-gray-300'>
            &copy; {new Date().getFullYear()} Aaron Christopher
          </p>
        </main>
      </footer>
      <style jsx>{`
        .footer-divider {
          --border-size: 1px;
          --border-angle: 0turn;
          background-image: conic-gradient(
              from var(--border-angle),
              #ddd 0%,
              #ddd 0%,
              #ddd 0%
            ),
            conic-gradient(
              from var(--border-angle),
              transparent 20%,
              #08f,
              #f03
            );
          background-size:
            100% calc(100% - (var(--border-size) * 2)),
            cover;
          background-position: bottom center;
          background-repeat: no-repeat;
          animation: bg-spin 2s linear infinite;
        }

        :is(.dark .footer-divider) {
          background-image: conic-gradient(
              from var(--border-angle),
              #111 0%,
              #111 0%,
              #111 0%
            ),
            conic-gradient(
              from var(--border-angle),
              transparent 20%,
              #08f,
              #f03
            );
        }

        @keyframes bg-spin {
          to {
            --border-angle: 1turn;
          }
        }

        @property --border-angle {
          syntax: '<angle>';
          inherits: true;
          initial-value: 0turn;
        }
      `}</style>
    </>
  );
};

const footerLinks: { href: string; text: string; tooltip: React.ReactNode }[] =
  [
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
        <Tooltip key={href} content={tooltip}>
          <UnstyledLink
            className='animated-underline rounded-sm text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:text-gray-200 py-1 px-0.5'
            href={href}
          >
            {text}
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
};

export default Footer;
