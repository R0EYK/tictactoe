import "./App.css";
import { useState } from "react";

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

type SquareValue = "X" | "O" | null;
type WinnerInfo = { winner: "X" | "O"; line: number[] } | null;

function calculateWinner(squares: SquareValue[]): WinnerInfo {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as "X" | "O", line };
    }
  }
  return null;
}

function App() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const winnerInfo = calculateWinner(squares);
  const isDraw = !winnerInfo && squares.every(Boolean);

  let status: string;
  if (winnerInfo) {
    status = `Winner: ${winnerInfo.winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next Turn: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(idx: number): void {
    if (squares[idx] || winnerInfo) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart(): void {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function renderSquare(idx: number) {
    const isWinning = winnerInfo?.line.includes(idx);
    return (
      <button
        className={"square" + (isWinning ? " highlight" : "")}
        onClick={() => handleClick(idx)}
        key={idx}
      >
        {squares[idx]}
      </button>
    );
  }

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{status}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="board-row" key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button className="restart" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

export default App;
