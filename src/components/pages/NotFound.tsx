import Accent from '@/components/Accent';
import ArrowLink from '@/components/links/ArrowLink';

const NotFound = () => (
  <section className=''>
    <div className='layout flex flex-col items-center justify-center gap-y-40 text-center'>
      <div className='flex flex-col gap-y-4'>
        <h1 className='text-8xl'>
          <Accent className='from-primary-300 via-pink-600/70 to-rose-600 dark:from-primary-300 dark:via-pink-500/70 dark:to-rose-500'>
            404
          </Accent>
        </h1>
        <h2>Page Not Found</h2>
      </div>

      <p className='text-xl text-primary-400 dark:text-primary-200'>
        <ArrowLink href='/' openNewTab={false} direction='left'>
          Back To Home
        </ArrowLink>
      </p>
    </div>
  </section>
);

export default NotFound;
