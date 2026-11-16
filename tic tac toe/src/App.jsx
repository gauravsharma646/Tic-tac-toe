
import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [winner, setWinner] = useState(null);

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function checkWinner(newBoard) {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;

      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  }

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({
        ...prev,
        [gameWinner]: prev[gameWinner] + 1
      }));
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner("Draw");
    } else {
      setIsXTurn(!isXTurn);
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
  }

  function resetScores() {
    setScores({ X: 0, O: 0 });
    resetGame();
  }

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <p className="subtitle">Let's Play Together!</p>

      <div className="scoreboard">
        <div className="score">
          <h3>Player X</h3>
          <h2>{scores.X}</h2>
        </div>

        <div className="score">
          <h3>Player O</h3>
          <h2>{scores.O}</h2>
        </div>
      </div>

      <h3 className="status">
        {winner
          ? winner === "Draw"
            ? "It's a Draw!"
            : `Player ${winner} Wins!`
          : `Player ${isXTurn ? "X" : "O"}'s Turn`}
      </h3>

      <div className="board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell ? cell : ""}`}
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="buttons">
        <button onClick={resetGame}>Restart Game</button>
        <button onClick={resetScores}>Reset Score</button>
      </div>
    </div>
  );
}

export default App;
