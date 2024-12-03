import React from "react";
import Square from "./Square";
import { BoardProps } from "../types";

const Board: React.FC<BoardProps> = ({ squares, onClick }) => {
  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
};

export default Board;
