import { FiCircle, FiX } from 'react-icons/fi';

import clsxm from '@/lib/clsxm';
import { type TTT } from '@/lib/ttt';

const TicTacToeBoard = ({
  data,
  handlePlay,
}: {
  data: TTT;
  handlePlay: (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => void;
}) => {
  return (
    <section className='mx-auto grid h-[304px] w-[304px] grid-cols-3 border-2 border-gray-500 md:h-[454px] md:w-[454px]'>
      {data.board.map((row, i) =>
        row.map((col, j) => (
          <div
            className={clsxm(
              'flex h-[100px] w-[100px] cursor-pointer select-none items-center justify-center border border-gray-500 bg-slate-300 text-7xl transition-colors hover:bg-primary-50 dark:bg-gray-600 md:h-[150px] md:w-[150px] md:text-8xl',
              col === 'X' && 'text-red-500',
              col === 'O' && 'text-green-500'
            )}
            key={`${col}${i}${j}`}
            onClick={(e) => handlePlay(e, i, j)}
          >
            {col === 'X' ? <FiX /> : col === 'O' ? <FiCircle /> : null}
          </div>
        ))
      )}
    </section>
  );
};

export default TicTacToeBoard;
