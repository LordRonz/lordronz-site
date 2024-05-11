import Accent from '@/components/Accent';
import clsxm from '@/lib/clsxm';

const SkipToContent = () => {
  return (
    <a
      href='#content'
      className={clsxm(
        'rounded-sm p-2 transition',
        'font-medium text-dark dark:text-white',
        'bg-light dark:bg-dark',
        'group dark:hover:text-primary-300',
        'focus:outline-none focus:ring focus:ring-primary-300',
        'absolute left-4 top-4 z-[1000]',
        '-translate-y-16 focus:translate-y-0',
      )}
    >
      <Accent>Skip to content</Accent>
    </a>
  );
};

export default SkipToContent;
