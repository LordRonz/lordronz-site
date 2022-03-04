import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FiMail } from 'react-icons/fi';
import {
  SiGithub,
  SiGitlab,
  SiHackerrank,
  SiLeetcode,
  SiLinkedin,
  SiStackoverflow,
} from 'react-icons/si';
import { Tooltip as TooltipTippy } from 'react-tippy';

import Accent from '@/components/Accent';
import UnstyledLink from '@/components/links/UnstyledLink';
import Tooltip from '@/components/Tooltip';

const mail = 'christopher.19072@mhs.its.ac.id';

const socials = [
  {
    label: 'GitHub',
    link: 'https://lr-link.vercel.app/github',
    icon: SiGithub,
  },
  {
    label: 'GitLab',
    link: 'https://lr-link.vercel.app/gitlab',
    icon: SiGitlab,
  },
  {
    label: 'Hackerrank',
    link: 'https://lr-link.vercel.app/hackerrank',
    icon: SiHackerrank,
  },
  {
    label: 'LeetCode',
    link: 'https://lr-link.vercel.app/leetcode',
    icon: SiLeetcode,
  },
  {
    label: 'LinkedIn',
    link: 'https://lr-link.vercel.app/linkedin',
    icon: SiLinkedin,
  },
  {
    label: 'Stack Overflow',
    link: 'https://lr-link.vercel.app/stackoverflow',
    icon: SiStackoverflow,
  },
] as const;

const Footer = () => {
  const [copyStatus, setCopyStatus] = useState<string>(
    'Click the mail logo to copy'
  );

  return (
    <footer className='mt-4 pb-2'>
      <main className='layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
        <div className='mt-2 flex space-x-4'>
          <div className='flex items-center justify-center'>
            <TooltipTippy
              trigger='mouseenter'
              hideOnClick={false}
              interactive
              html={
                <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-primary-500 dark:bg-dark dark:text-gray-200'>
                  {copyStatus}
                  <Accent className='inline-block font-medium'>
                    christopher.19072@mhs.its.ac.id
                  </Accent>
                </div>
              }
            >
              <CopyToClipboard
                text={mail}
                onCopy={() => {
                  setCopyStatus('Copied to clipboard 😳');
                  setTimeout(
                    () => setCopyStatus('Click the mail logo to copy'),
                    1469
                  );
                }}
              >
                <button className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'>
                  <FiMail className='my-auto h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
                </button>
              </CopyToClipboard>
            </TooltipTippy>
          </div>
          {socials.map((social) => (
            <Tooltip
              interactive={false}
              key={social.link}
              content={social.label}
            >
              <UnstyledLink
                className='inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
                href={social.link}
              >
                <social.icon className='my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
              </UnstyledLink>
            </Tooltip>
          ))}
        </div>
      </main>
    </footer>
  );
};

export default Footer;
