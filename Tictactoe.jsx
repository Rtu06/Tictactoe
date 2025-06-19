import React, { useState, useEffect } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (squares) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: combination };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    }
  }, [board]);

  const getStatus = () => {
    if (winner) {
      return `🎉 Player ${winner} wins!`;
    } else if (board.every(cell => cell !== null)) {
      return "🤝 It's a tie!";
    } else {
      return `Player ${isXNext ? 'X' : 'O'}'s turn`;
    }
  };

  const renderCell = (index) => {
    const isWinningCell = winningLine.includes(index);
    return (
      <button
        key={index}
        className={`game-cell ${board[index]?.toLowerCase() || ''} ${isWinningCell ? 'winner-animation' : ''}`}
        onClick={() => handleClick(index)}
        disabled={board[index] || winner}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Tic Tac Toe
        </h1>
        
        <div className="status-text">
          {getStatus()}
        </div>

        <div className="game-board mb-6">
          {Array(9).fill(null).map((_, index) => renderCell(index))}
        </div>

        <div className="text-center">
          <button 
            className="reset-button"
            onClick={resetGame}
          >
            🔄 New Game
          </button>
        </div>

        <div className="mt-8 text-center text-white/80 text-sm">
          <p>First to get 3 in a row wins!</p>
          <p className="mt-2">
            <span className="text-red-300">X</span> vs <span className="text-blue-300">O</span>
          </p>
        </div>
      </div>
    </div>
  );
}

window.TicTacToe = TicTacToe;