import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import TicTacToeBoard from '@/components/layout/TicTacToeBoard';
import Seo from '@/components/Seo';
import clsxm from '@/lib/clsxm';
import { insertPlay, newTtt } from '@/lib/ttt';

const TicTacToePage: NextPage = () => {
  const [tttData, setTttData] = useState(newTtt());

  const handlePlay = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, x: number, y: number) => {
      e.preventDefault();
      setTttData((data) => ({ ...insertPlay(data, [x, y]) }));
    },
    []
  );

  const resetBoard = useCallback(() => {
    setTttData(newTtt());
  }, []);

  return (
    <Layout>
      <Seo />
      <main>
        <section className={clsxm('flex flex-col justify-center')}>
          <article className='layout flex flex-col gap-y-5 py-2 text-center'>
            {tttData.winner || tttData.draw ? (
              <h2>
                {tttData.winner
                  ? `The winner is ${tttData.winner} !`
                  : "It's a draw !"}
              </h2>
            ) : (
              <h2>
                Player {tttData.lastPlay === 'X' ? 'O' : 'X'}
                {"'"}s turn
              </h2>
            )}
            <TicTacToeBoard data={tttData} handlePlay={handlePlay} />
            <div>
              <Button onClick={resetBoard}>Reset</Button>
            </div>
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default TicTacToePage;
