export const calculateWinner = (squares: string[]): string | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const minimax = (
  squares: string[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: string,
  humanPlayer: string
): number => {
  const winner = calculateWinner(squares);

  // Gán điểm số khi kết thúc trận
  if (winner === aiPlayer) return 10 - depth;
  if (winner === humanPlayer) return depth - 10;
  if (!squares.includes("")) return 0; // Hòa

  // Minimax logic
  const emptySquares = squares
    .map((value, index) => (value === "" ? index : -1))
    .filter((index) => index !== -1);

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let index of emptySquares) {
      const newSquares = [...squares];
      newSquares[index] = aiPlayer;
      const evalScore = minimax(
        newSquares,
        depth + 1,
        false,
        aiPlayer,
        humanPlayer
      );
      maxEval = Math.max(maxEval, evalScore);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let index of emptySquares) {
      const newSquares = [...squares];
      newSquares[index] = humanPlayer;
      const evalScore = minimax(
        newSquares,
        depth + 1,
        true,
        aiPlayer,
        humanPlayer
      );
      minEval = Math.min(minEval, evalScore);
    }
    return minEval;
  }
};

export const findBestMove = (
  squares: string[],
  aiPlayer: string,
  humanPlayer: string
): number => {
  const emptySquares = squares
    .map((value, index) => (value === "" ? index : -1))
    .filter((index) => index !== -1);

  let bestScore = -Infinity;
  let bestMove = -1;

  for (let index of emptySquares) {
    const newSquares = [...squares];
    newSquares[index] = aiPlayer;
    const moveScore = minimax(newSquares, 0, false, aiPlayer, humanPlayer);
    if (moveScore > bestScore) {
      bestScore = moveScore;
      bestMove = index;
    }
  }

  return bestMove;
};
