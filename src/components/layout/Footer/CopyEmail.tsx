'use client';

import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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

  return (
    <Tooltip>
      <TooltipTrigger
        className='p-0 border-0'
        onClick={(event) => event.preventDefault()}
      >
        <CopyToClipboard
          text={mail}
          onCopy={() => {
            setCopyStatus('Copied to clipboard 😳');
            setTimeout(
              () => setCopyStatus('Click the mail logo to copy'),
              1469,
            );
          }}
        >
          <div
            aria-label='Mail button'
            className='rounded-xs align-middle focus:outline-hidden focus-visible:ring-3 focus-visible:ring-primary-300 group'
          >
            <FiMail className='my-auto h-8 w-8 -mt-0.5 md:-mt-0.5 align-middle text-gray-600 group-hover:text-primary-300 dark:text-gray-300 dark:group-hover:text-primary-300' />
          </div>
        </CopyToClipboard>
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
