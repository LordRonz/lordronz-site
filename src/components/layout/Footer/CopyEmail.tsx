'use client';

import { useRef, useState } from 'react';
import { FiMail } from 'react-icons/fi';

import Accent from '@/components/Accent';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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
    <Tooltip>
      <TooltipTrigger
        className='p-0 border-0'
        asChild
        onPointerDown={(event) => event.preventDefault()}
        onClick={(event) => event.preventDefault()}
      >
        <div
          aria-label='Mail button'
          role='button'
          tabIndex={0}
          onClick={handleCopy}
          className='rounded-xs align-middle focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 group cursor-pointer'
        >
          <FiMail className='my-auto h-8 w-8 -mt-0.5 md:-mt-0.5 align-middle text-gray-600 group-hover:text-primary-300 dark:text-gray-300 dark:group-hover:text-primary-300' />
        </div>
      </TooltipTrigger>
      <TooltipContent
        className='px-0 py-0 border-0 mb-2'
        onPointerDownOutside={(event) => {
          event.preventDefault();
        }}
      >
        <div
          className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-primary-500 dark:bg-dark dark:text-gray-200'
          data-testid='copy-status'
        >
          {copyStatus}{' '}
          <code>
            <Accent className='inline-block font-medium'>{mail}</Accent>
          </code>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyEmail;
