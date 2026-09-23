import { useCallback, useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCheck, FiCopy } from 'react-icons/fi';

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

Pre.displayName = 'Pre';

const CustomCode = (
  props: React.ComponentPropsWithRef<'code'> & { 'data-language': string },
) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [textToCopy, setTextToCopy] = useState<string>('');

  const language = props['data-language'];

  useEffect(() => {
    setTextToCopy(textRef.current?.textContent ?? '');
  }, [props.children]);

  const onCopy = useCallback(() => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  }, []);

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
        <>
          <div className='absolute top-0 left-6 rounded-b-md border border-t-0 border-gray-600 px-2 py-1'>
            <span className='bg-linear-to-tr from-primary-300 to-primary-400 bg-clip-text font-medium text-transparent select-none'>
              {language}
            </span>
          </div>
          <CopyToClipboard text={textToCopy} onCopy={onCopy}>
            <button
              aria-label='Copy code to clipboard'
              className='absolute top-1 right-1 block rounded-sm border border-gray-600 p-2 text-lg transition-colors hover:bg-gray-400 md:top-2 md:right-2 md:block dark:hover:bg-gray-700'
            >
              {isCopied ? (
                <FiCheck aria-hidden='true' className='text-primary-400' />
              ) : (
                <FiCopy aria-hidden='true' />
              )}
            </button>
          </CopyToClipboard>
        </>
      )}
    </code>
  );
};

export default CustomCode;
