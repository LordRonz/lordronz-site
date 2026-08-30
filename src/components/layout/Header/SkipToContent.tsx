const SkipToContent = () => {
  return (
    <a
      href='#content'
      className='group absolute left-4 top-4 z-1000 -translate-y-16 rounded-xs bg-light p-2 font-medium text-dark transition focus:translate-y-0 focus:outline-hidden focus:ring-3 focus:ring-primary-300 dark:bg-dark dark:text-white dark:hover:text-primary-300'
    >
      <span className='bg-linear-to-tr from-primary-300 via-rose-700/70 to-sky-500 bg-clip-text text-transparent dark:from-primary-300 dark:via-primary-100/70 dark:to-sky-300'>
        Skip to content
      </span>
    </a>
  );
};

export default SkipToContent;
