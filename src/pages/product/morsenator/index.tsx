import type { NextPage } from 'next';
import Image from 'next/image';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';

const aboutContents = [
  {
    title: 'Our mission',
    content:
      'At Morsenator, our mission is simple: to make Morse Code accessible, understandable, and fun for everyone. We believe in the power of this timeless communication method and its relevance in our tech-driven world.',
  },
  {
    title: 'Your Privacy Matters',
    content:
      "We value your privacy. Morsenator may request access to your device's internal storage and camera for specific features. You have full control over granting or denying these permissions.",
  },
  {
    title: 'Updates and Support',
    content:
      "We're dedicated to providing the best experience possible. Morsenator will be regularly updated to address any bugs and introduce new features. Your feedback is invaluable to us. If you encounter issues or have suggestions, please email us at me@aaronct.dev",
  },
  {
    title: 'Terms of Use',
    content: (
      <>
        By using Morsenator, you agree to our{' '}
        <CustomLink
          href='https://www.termsfeed.com/live/ac41a850-5de6-4aa5-93b8-b61523f77846'
          openNewTab={false}
        >
          Terms of Use
        </CustomLink>
        . Please take a moment to review them to ensure a smooth and secure user
        experience.
      </>
    ),
  },
];

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <Seo templateTitle='About' />
      <main>
        <section className={clsxm('my-16 flex flex-col justify-center')}>
          <article className='layout'>
            <div className='flex items-center gap-x-3'>
              <h1 className='text-3xl md:text-5xl 2xl:text-6xl'>
                <Accent>About Morsenator</Accent>
              </h1>
              <Image
                alt='Morsenator Logo'
                src={`/images/product/morsenator.webp`}
                width={60}
                height={60}
              />
            </div>
            <p
              className={clsxm(
                'my-4 max-w-4xl md:mt-6',
                'md:text-lg 2xl:text-xl',
              )}
            >
              Welcome to Morsenator, your gateway to the world of Morse Code!
              Morsenator is your iOS companion for exploring Morse Code
              effortlessly. Whether you{"'"}re an enthusiast or just curious,
              this app makes translating words to Morse Code and vice versa a
              breeze. Featuring a virtual button for tactile input, an audio
              visualizer for immersive learning, and a commitment to
              accessibility, Morsenator is designed to demystify Morse Code for
              everyone. Respectful of your privacy and ad-free, it{"'"}s the
              perfect tool for Morse Code enthusiasts and learners alike.
            </p>
            {aboutContents.map(({ title, content }) => (
              <>
                <h2 className='text-2xl md:text-3xl 2xl:text-4xl'>
                  <Accent>{title}</Accent>
                </h2>
                <p
                  className={clsxm(
                    'mt-4 max-w-4xl md:mt-6',
                    'md:text-lg 2xl:text-xl',
                    'mb-8',
                  )}
                >
                  {content}
                </p>
              </>
            ))}
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default AboutPage;
