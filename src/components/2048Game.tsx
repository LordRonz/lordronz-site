import React, { useCallback, useEffect, useState } from 'react';

type Tile = number | null;
type Board = Tile[][];

const GRID_SIZE = 4;

const generateEmptyBoard = (): Board =>
  Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null),
  );

const addRandomTile = (board: Board): Board => {
  const emptyTiles: { x: number; y: number }[] = [];
  board.forEach((row, y) =>
    row.forEach((tile, x) => {
      if (tile === null) emptyTiles.push({ x, y });
    }),
  );

  if (emptyTiles.length === 0) return board;

  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  const { x, y } = emptyTiles[randomIndex];
  board[y][x] = Math.random() > 0.1 ? 2 : 4;

  return board;
};

const cloneBoard = (board: Board): Board => board.map((row) => [...row]);

const slideAndMerge = (
  row: Tile[],
): { mergedRow: Tile[]; gainedScore: number } => {
  const filteredRow = row.filter((tile) => tile !== null);
  const mergedRow: Tile[] = [];
  let gainedScore = 0;

  for (let i = 0; i < filteredRow.length; i++) {
    if (filteredRow[i] !== null && filteredRow[i] === filteredRow[i + 1]) {
      const mergedValue = (filteredRow[i] as number) * 2;
      mergedRow.push(mergedValue);
      gainedScore += mergedValue;
      i++;
    } else {
      mergedRow.push(filteredRow[i]);
    }
  }

  return {
    mergedRow: [
      ...mergedRow,
      ...Array(row.length - mergedRow.length).fill(null),
    ],
    gainedScore,
  };
};

const move = (
  board: Board,
  direction: string,
): { board: Board; gainedScore: number } => {
  let rotated: Board;

  switch (direction) {
    case 'up':
      rotated = board[0].map((_, i) => board.map((row) => row[i]));
      break;
    case 'down':
      rotated = board[0].map((_, i) => board.map((row) => row[i]).reverse());
      break;
    case 'left':
      rotated = board;
      break;
    case 'right':
      rotated = board.map((row) => [...row].reverse());
      break;
    default:
      return { board, gainedScore: 0 };
  }

  let totalGainedScore = 0;
  const moved = rotated.map((row) => {
    const { mergedRow, gainedScore } = slideAndMerge(row);
    totalGainedScore += gainedScore;
    return mergedRow;
  });

  const reverted =
    direction === 'up'
      ? moved[0].map((_, i) => moved.map((row) => row[i]))
      : direction === 'down'
        ? moved[0].map((_, i) => moved.map((row) => row[i]).reverse())
        : direction === 'right'
          ? moved.map((row) => [...row].reverse())
          : moved;

  return { board: reverted, gainedScore: totalGainedScore };
};

const TwentyFortyEightGame: React.FC = () => {
  const [board, setBoard] = useState<Board>(generateEmptyBoard());
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newBoard = addRandomTile(addRandomTile(generateEmptyBoard()));
    setBoard(newBoard);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const directionMap: Record<string, string> = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
      };

      if (!directionMap[e.key]) return;

      const { board: newBoard, gainedScore } = move(
        cloneBoard(board),
        directionMap[e.key],
      );
      if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
        setBoard(addRandomTile(newBoard));
        setScore((prev) => prev + gainedScore);
      }
    },
    [board],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, handleKeyDown]);

  const tileColors = {
    2: 'bg-gray-200 text-gray-700',
    4: 'bg-yellow-200 text-yellow-700',
    8: 'bg-orange-400 text-white',
    16: 'bg-orange-500 text-white',
    32: 'bg-red-400 text-white',
    64: 'bg-red-500 text-white',
    128: 'bg-green-400 text-white',
    256: 'bg-green-500 text-white',
    512: 'bg-blue-400 text-white',
    1024: 'bg-blue-500 text-white',
    2048: 'bg-purple-500 text-white',
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gray-100'>
      <h1 className='mb-4 text-4xl font-bold'>2048</h1>
      <p className='mb-6 text-lg'>Score: {score}</p>
      <div className='grid gap-2 rounded-md bg-gray-400 p-4 shadow-md'>
        {board.map((row, i) => (
          <div key={i} className='grid grid-cols-4 gap-2'>
            {row.map((tile, j) => (
              <div
                key={j}
                className={`flex h-20 w-20 items-center justify-center rounded-md text-2xl font-bold ${
                  tile
                    ? tileColors[tile as keyof typeof tileColors] ||
                      'bg-gray-300 text-gray-800'
                    : 'bg-gray-300'
                }`}
              >
                {tile}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TwentyFortyEightGame;
