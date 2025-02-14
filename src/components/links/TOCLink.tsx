import { memo } from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';
import clsxm from '@/lib/clsxm';

type TOCLinkProps = {
  id: string;
  level: number;
  minLevel: number;
  text: string;
  activeSection: string | null;
};

const TOCLink = ({
  id,
  level,
  minLevel,
  text,
  activeSection,
}: TOCLinkProps) => {
  return (
    <UnstyledLink
      href={`#${id}`}
      id={`link-${id}`}
      className={clsxm(
        'font-medium hover:text-gray-700 focus:outline-hidden dark:hover:text-gray-200',
        'focus-visible:text-gray-700 dark:focus-visible:text-gray-200',
        activeSection === id
          ? 'text-gray-900 dark:text-gray-100'
          : 'text-gray-400 dark:text-gray-500',
      )}
      style={{ marginLeft: (level - minLevel) * 16 }}
    >
      {text}
    </UnstyledLink>
  );
};

export default memo(TOCLink, (prevProps, nextProps) => {
  // Only re-render if `id` or `activeSection` changes
  return (
    (prevProps.id === prevProps.activeSection) ===
    (nextProps.id === nextProps.activeSection)
  );
});
