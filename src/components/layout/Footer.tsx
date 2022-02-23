import {
  SiGithub,
  SiGitlab,
  SiHackerrank,
  SiLeetcode,
  SiLinkedin,
  SiStackoverflow,
} from 'react-icons/si';

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
  return (
    <footer className='mt-4 pb-2'>
      <main className='layout flex flex-col items-center border-t pt-6 dark:border-gray-600'>
        {socials.map((social) => {
          <social.icon />;
        })}
        {mail}
      </main>
    </footer>
  );
};

export default Footer;
