'use client';

import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiMail } from 'react-icons/fi';
import { Tooltip as TooltipTippy } from 'react-tippy';

import Accent from '@/components/Accent';

const mail = 'me@aaronct.dev';

const CopyEmail = () => {
  const [copyStatus, setCopyStatus] = useState<string>(
    'Click the mail logo to copy',
  );

  return (
    <TooltipTippy
      trigger='mouseenter'
      hideOnClick={false}
      interactive
      html={
        <div className='inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-primary-500 dark:bg-dark dark:text-gray-200'>
          {copyStatus}{' '}
          <code>
            <Accent className='inline-block font-medium'>{mail}</Accent>
          </code>
        </div>
      }
    >
      <CopyToClipboard
        text={mail}
        onCopy={() => {
          setCopyStatus('Copied to clipboard 😳');
          setTimeout(() => setCopyStatus('Click the mail logo to copy'), 1469);
        }}
      >
        <button
          aria-label='Mail button'
          className='rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300'
        >
          <FiMail className='my-auto h-7 w-7 -mt-1 md:-mt-1.5 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300' />
        </button>
      </CopyToClipboard>
    </TooltipTippy>
  );
};

export default CopyEmail;
