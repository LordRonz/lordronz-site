import type { Metadata, NextPage } from 'next';

import TicTacToePage from '@/components/pages/apps/TTTPage';
import { generateSeoMetadata } from '@/lib/generateSeoMetadata';

export const generateMetadata = (): Metadata => {
  return generateSeoMetadata({
    templateTitle: 'Tic Tac Toe by Aaron',
    description: 'Tic Tac Toe Game in Web By Aaron Christopher',
  });
};

const Page: NextPage = () => {
  return <TicTacToePage />;
};

export default Page;
