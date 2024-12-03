import React, { useState, useEffect } from "react";
import Board from "./Board";
import { calculateWinner, findBestMove } from "../utils/ai";
import { GameState } from "../types";

const Game: React.FC = () => {
  const [state, setState] = useState<GameState>({
    squares: Array(9).fill(""),
    isXNext: true,
  });

  const winner = calculateWinner(state.squares);

  const handleClick = (index: number) => {
    if (state.squares[index] || winner) return;

    const squaresCopy = [...state.squares];
    squaresCopy[index] = "X";

    setState({
      squares: squaresCopy,
      isXNext: false,
    });
  };

  useEffect(() => {
    if (!state.isXNext && !winner) {
      const aiMove = findBestMove(state.squares, "O", "X");
      if (aiMove !== -1) {
        const squaresCopy = [...state.squares];
        squaresCopy[aiMove] = "O";
        setState({
          squares: squaresCopy,
          isXNext: true,
        });
      }
    }
  }, [state.isXNext, state.squares, winner]);

  const resetGame = () => {
    setState({
      squares: Array(9).fill(""),
      isXNext: true,
    });
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board squares={state.squares} onClick={handleClick} />
      <p>
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${state.isXNext ? "X" : "O"}`}
      </p>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
};

export default Game;
