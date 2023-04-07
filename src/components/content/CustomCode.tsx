import { useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCheck, FiCopy } from 'react-icons/fi';

export const Pre = (props: React.ComponentPropsWithRef<'pre'>) => {
  return (
    <pre {...props}>
      {props.children}
      <style jsx>{`
        pre {
          position: relative;
          padding-top: 2.5rem;
        }
      `}</style>
    </pre>
  );
};

const CustomCode = (props: React.ComponentPropsWithRef<'code'>) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const language = props.className?.includes('language')
    ? props.className.replace('language-', '').replace(' code-highlight', '')
    : null;

  return (
    <code {...props} data-code-type={language && 'code-block'}>
      {language ? (
        <div ref={textRef} className='overflow-x-auto'>
          {props.children}
        </div>
      ) : (
        <span>{props.children}</span>
      )}

      {language && (
        <div className='absolute left-6 top-0 rounded-b-md border border-t-0 border-gray-600 px-3 py-1'>
          <span className='select-none bg-gradient-to-tr from-primary-300 to-primary-400 bg-clip-text font-medium text-transparent'>
            {language}
          </span>
        </div>
      )}
      {language && (
        <CopyToClipboard
          text={textRef?.current?.textContent ?? ''}
          onCopy={() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
          }}
        >
          <button className='absolute right-2 top-2 hidden rounded border border-gray-600 p-2 text-lg transition-colors hover:bg-gray-700 md:block'>
            {isCopied ? <FiCheck className='text-green-400' /> : <FiCopy />}
          </button>
        </CopyToClipboard>
      )}
    </code>
  );
};

export default CustomCode;
