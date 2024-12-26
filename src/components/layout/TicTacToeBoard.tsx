import React, { useCallback } from 'react';
import { FiCircle, FiX } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';
import { type TTT } from '@/lib/ttt';

// Map cell value to corresponding icon
const useGetIcon = () =>
  useCallback((col: string | null) => {
    return (
      {
        X: <FiX />,
        O: <FiCircle />,
      }[col ?? ''] || null
    );
  }, []);

type TicTacToeBoardProps = {
  data: TTT;
  handlePlay: (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
    x: number,
    y: number,
  ) => void;
};

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({
  data,
  handlePlay,
}) => {
  const getIcon = useGetIcon();

  return (
    <section
      className='mx-auto grid h-[304px] w-[304px] grid-cols-3 border-2 border-gray-500 md:h-[454px] md:w-[454px]'
      aria-label='Tic Tac Toe Board'
    >
      {data.board.map((row, i) =>
        row.map((col, j) => (
          <div
            key={`${i}-${j}`}
            role='button'
            tabIndex={0}
            className={clsxm(
              'flex h-[100px] w-[100px] cursor-pointer select-none items-center justify-center border border-gray-500 bg-slate-300 text-7xl transition-colors hover:bg-primary-50 dark:bg-gray-600 md:h-[150px] md:w-[150px] md:text-8xl',
              col === 'X' && 'text-red-500',
              col === 'O' && 'text-green-500',
            )}
            onClick={(e) => handlePlay(e, i, j)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePlay(e, i, j);
            }}
          >
            {getIcon(col)}
          </div>
        )),
      )}
    </section>
  );
};

export default TicTacToeBoard;
