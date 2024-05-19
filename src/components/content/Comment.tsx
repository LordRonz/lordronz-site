import type { Theme } from '@giscus/react';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

const REPO_ID = 'R_kgDOGnxT4Q';
const CATEGORY_ID = 'DIC_kwDOGnxT4c4CSHzx';

const Comment = () => {
  const { theme } = useTheme();

  return (
    <Giscus
      key={theme}
      repo='LordRonz/lordronz-site'
      repoId={REPO_ID}
      category='General'
      categoryId={CATEGORY_ID}
      mapping='pathname'
      reactionsEnabled='0'
      emitMetadata='0'
      theme={theme as Theme}
    />
  );
};

export default Comment;
