import { useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCheck, FiCopy } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';

export const Pre = (
  props: React.ComponentPropsWithRef<'pre'> & { 'data-language': string },
) => {
  const language = props['data-language'];

  return (
    <pre {...props}>
      {props.children}
      <style jsx>{`
        pre {
          position: relative;
          padding-top: ${language ? '2.5rem' : '0'};
          border-radius: 8px;
        }
      `}</style>
    </pre>
  );
};

const CustomCode = (
  props: React.ComponentPropsWithRef<'code'> & { 'data-language': string },
) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const language = props['data-language'];

  return (
    <code {...props} data-code-type={language && 'code-block'}>
      {language ? (
        <div ref={textRef} className='overflow-x-auto'>
          {props.children}
        </div>
      ) : (
        <span>{props.children}</span>
      )}

      {!!language && (
        <div className='absolute left-6 top-0 rounded-b-md border border-t-0 border-gray-600 px-2 py-1'>
          <span className='select-none bg-gradient-to-tr from-primary-300 to-primary-400 bg-clip-text font-medium text-transparent'>
            {language}
          </span>
        </div>
      )}
      <CopyToClipboard
        text={textRef?.current?.textContent ?? ''}
        onCopy={() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 1500);
        }}
      >
        <button className='absolute md:right-2 md:top-2 right-1 top-1 block rounded border border-gray-600 p-2 text-lg transition-colors hover:bg-gray-400 hover:dark:bg-gray-700 md:block'>
          <label
            className={clsxm(
              'swap swap-rotate grid',
              isCopied && 'swap-active',
            )}
          >
            <FiCheck className='text-primary-400 swap-on' />
            <FiCopy className='swap-off' />
          </label>
        </button>
      </CopyToClipboard>
    </code>
  );
};

export default CustomCode;
