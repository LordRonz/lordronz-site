const AnimatedTitle = () => {
  return (
    <span className='group relative z-50 text-xl font-bold whitespace-nowrap'>
      <span className='opacity-100 transition duration-300 group-hover:opacity-0'>
        @lordronz{' '}
        <span className='rounded-md border border-primary-200 px-1 font-mono'>
          {'/'}
        </span>
      </span>
      <span className='absolute left-0 bg-linear-to-tr from-primary-300 via-rose-700/70 to-sky-500 bg-clip-text text-transparent opacity-0 transition duration-300 group-hover:opacity-100 hover:bg-linear-to-r dark:from-primary-300 dark:via-primary-100/70 dark:to-sky-300'>
        Aaron Christopher
      </span>
    </span>
  );
};

export default AnimatedTitle;
