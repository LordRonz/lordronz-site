import Head from 'next/head';
import { useRouter } from 'next/router';

import { openGraph } from '@/lib/og';

const defaultMeta = {
  title: 'Next.js TypeScript Starter',
  siteName: process.env.NEXT_PUBLIC_HOSTNAME || 'lordronz.vercel.app',
  description: 'NextJS Typescript Boilerplate.',
  url: process.env.NEXT_PUBLIC_HOSTNAME
    ? `https://${process.env.NEXT_PUBLIC_HOSTNAME}`
    : 'https://lordronz.vercel.app',
  image: '/vercel.svg',
  type: 'website',
  robots: 'follow, index',
  googlebot: 'follow, index',
};

export type SeoProps = {
  readonly date?: string;
  readonly templateTitle?: string;
} & Partial<typeof defaultMeta>;

const Seo = (props: SeoProps) => {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  meta['image'] = openGraph({
    type: 'gradient',
    description: meta.description,
    siteName: props.templateTitle ? meta.siteName : meta.title,
    templateTitle: props.templateTitle,
  });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@lordronz' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name='msapplication-TileColor' content='#000000' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/mstile-150x150.png'
      />
      <meta name='theme-color' content='#000000' />
    </Head>
  );
};

export type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

const favicons: readonly Favicons[] = [
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico',
  },
] as const;

export default Seo;
