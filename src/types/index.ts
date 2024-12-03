export type SquareProps = {
  value: string;
  onClick: () => void;
};

export type BoardProps = {
  squares: string[];
  onClick: (index: number) => void;
};

export type GameState = {
  squares: string[];
  isXNext: boolean;
};
