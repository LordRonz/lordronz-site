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
    <section className='mx-auto grid h-[454px] w-[454px] grid-cols-3 border-2 border-gray-500'>
      {data.board.map((row, i) =>
        row.map((col, j) => (
          <div
            className='flex h-[150px] w-[150px] cursor-pointer select-none items-center justify-center border border-gray-500 bg-slate-300 text-8xl text-black transition-colors hover:bg-primary-50'
            key={`${col}${i}${j}`}
            onClick={(e) => handlePlay(e, i, j)}
          >
            {col}
          </div>
        ))
      )}
    </section>
  );
};

export default TicTacToeBoard;
