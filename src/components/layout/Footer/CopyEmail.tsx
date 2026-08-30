'use client';

import { useRef, useState } from 'react';

const mail = 'me@aaronct.dev';

const CopyEmail = () => {
  const [copyStatus, setCopyStatus] = useState<string>(
    'Click the mail logo to copy',
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mail);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setCopyStatus('Copied to clipboard 😳');

      timeoutRef.current = setTimeout(() => {
        setCopyStatus('Click the mail logo to copy');
      }, 1469);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      type='button'
      aria-label='Mail button'
      title={copyStatus}
      onClick={handleCopy}
      className='group inline-flex size-11 cursor-pointer items-center justify-center rounded-full align-middle focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300'
    >
      <svg
        aria-hidden='true'
        className='my-auto h-7 w-7 align-middle text-gray-600 transition-colors duration-[160ms] group-hover:text-primary-300 dark:text-gray-300 dark:group-hover:text-primary-300'
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
      >
        <path d='M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z' />
        <path d='m22 6-10 7L2 6' />
      </svg>
      <span className='sr-only' aria-live='polite'>
        {copyStatus}: {mail}
      </span>
    </button>
  );
};

export default CopyEmail;
