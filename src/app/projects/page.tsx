import type { Metadata, NextPage } from 'next';

import ProjectsPage from '@/components/pages/ProjectsPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return generateSeoMetadata({
    templateTitle: 'Projects',
    description: "List of aaron's projects",
  });
};

const Page: NextPage = () => {
  return <ProjectsPage />;
};

export default Page;
