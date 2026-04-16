import React, { useState } from 'react';
import './Board.css';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState(null);

  // Define all winning combinations
  const WINNING_LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Calculate winner and return winning line
  const calculateWinner = (squares) => {
    for (let i = 0; i < WINNING_LINES.length; i++) {
      const [a, b, c] = WINNING_LINES[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          line: [a, b, c]
        };
      }
    }
    return null;
  };

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const isBoardFull = squares.every((square) => square !== null);

  // Handle square click
  const handleSquareClick = (index) => {
    // Prevent clicking if square is filled or game is already won
    if (squares[index] !== null || winner) {
      return;
    }

    const newSquares = [...squares];
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);

    // Check for winner after the move
    const gameResult = calculateWinner(newSquares);
    if (gameResult) {
      setWinningLine(gameResult.line);
    }

    setIsXNext(!isXNext);
  };

  // Reset game
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
  };

  // Render square button
  const renderSquare = (index) => {
    const isWinningSquare = winningLine && winningLine.includes(index);
    return (
      <button
        className={`square ${squares[index] ? 'filled' : ''} ${isWinningSquare ? 'winning' : ''}`}
        onClick={() => handleSquareClick(index)}
      >
        {squares[index]}
      </button>
    );
  };

  // Get game status
  const getStatus = () => {
    if (winner) {
      return `🎉 Player ${winner} Won!`;
    } else if (isBoardFull) {
      return "🤝 It's a Draw!";
    } else {
      return `Current Player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="board-container">
      <h1>Tic Tac Toe</h1>
      <div className={`status ${winner ? 'winner-announcement' : ''}`}>
        {getStatus()}
      </div>

      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        New Game
      </button>

      <div className="instructions">
        <h3>How to Play:</h3>
        <ul>
          <li>Two players take turns clicking on the squares</li>
          <li>Player X goes first</li>
          <li>Get three of your symbols in a row (horizontally, vertically, or diagonally) to win</li>
          <li>Click "New Game" to restart</li>
        </ul>
      </div>
    </div>
  );
};

export default Board;
