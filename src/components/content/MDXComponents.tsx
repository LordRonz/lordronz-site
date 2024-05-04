import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import '@/styles/mdx.css';
import '@/styles/gruvbox.css';

import Image from 'next/image';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import GitHubCard from '@/components/content/card/GitHubCard';
import CustomCode, { Pre } from '@/components/content/CustomCode';
import SplitImage, { Split } from '@/components/content/SplitImage';
import CloudinaryImg from '@/components/images/CloudinaryImg';
import CustomLink from '@/components/links/CustomLink';
import TechIcons from '@/components/TechIcons';

const MDXComponents = {
  a: CustomLink,
  Image,
  pre: Pre,
  code: CustomCode,
  CloudinaryImg,
  LiteYouTubeEmbed,
  SplitImage,
  Split,
  TechIcons,
  GitHubCard,
};

export default MDXComponents;
