import { useState, useEffect, useCallback } from "react";
import Header from "./header";
import "./TicTacToe.css";
import "./index.css";

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameMode, setGameMode] = useState("ai"); // "ai" for vs AI, "human" for vs human

  const handlePlay = useCallback(
    (nextSquares, isAIMove = false) => {
      console.log("handlePlay called:", {
        isAIMove,
        nextSquares,
        currentGameMode: gameMode,
      });
      setSquares(nextSquares);

      if (gameMode === "ai") {
        // In AI mode: player move -> AI's turn, AI move -> player's turn
        setIsPlayerTurn(isAIMove);
      } else {
        // In human mode: alternate turns
        setIsPlayerTurn(!isPlayerTurn);
      }
    },
    [gameMode, isPlayerTurn]
  );

  // AI move effect
  useEffect(() => {
    console.log("useEffect triggered:", {
      gameMode,
      isPlayerTurn,
      hasWinner: !!calculateWinner(squares),
      hasEmptySquares: squares.includes(null),
      shouldAIMove:
        gameMode === "ai" &&
        !isPlayerTurn &&
        !calculateWinner(squares) &&
        squares.includes(null),
    });

    if (
      gameMode === "ai" &&
      !isPlayerTurn &&
      !calculateWinner(squares) &&
      squares.includes(null)
    ) {
      console.log("AI will make a move in 800ms");
      const timer = setTimeout(() => {
        const aiMove = getAIMove(squares);
        console.log("AI selected move:", aiMove);
        if (aiMove !== -1) {
          const nextSquares = squares.slice();
          nextSquares[aiMove] = "O";
          handlePlay(nextSquares, true);
        }
      }, 800); // AI thinks for 800ms

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, squares, gameMode, handlePlay]);

  function resetGame() {
    console.log("Game reset");
    setSquares(Array(9).fill(null));
    setIsPlayerTurn(true);
  }

  function toggleGameMode() {
    const newMode = gameMode === "ai" ? "human" : "ai";
    console.log("Game mode changed to:", newMode);
    setGameMode(newMode);
    resetGame();
  }

  return (
    <div className="app">
      <div className="content">
        <Header />
        <h2>Tic Tac Toe Game</h2>
        <div className="game">
          <div className="game-controls">
            <button onClick={toggleGameMode} className="mode-button">
              {gameMode === "ai" ? "vs Human" : "vs AI"}
            </button>
            <button onClick={resetGame} className="reset-button">
              Reset
            </button>
          </div>
          <div className="game-board">
            <Board
              isPlayerTurn={isPlayerTurn}
              squares={squares}
              onPlay={handlePlay}
              gameMode={gameMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick, disabled }) {
  return (
    <button
      className={`square ${disabled ? "disabled" : ""}`}
      onClick={onSquareClick}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

function Board({ isPlayerTurn, squares, onPlay, gameMode }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // In AI mode, only allow player moves when it's player's turn
    if (gameMode === "ai" && !isPlayerTurn) {
      return;
    }

    console.log(
      "Player clicked square:",
      i,
      "Current isPlayerTurn:",
      isPlayerTurn
    );
    const nextSquares = squares.slice();
    if (gameMode === "ai") {
      // Player is always X
      nextSquares[i] = "X";
    } else {
      // Human vs human mode
      nextSquares[i] = isPlayerTurn ? "X" : "O";
    }

    onPlay(nextSquares, false);
  }

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((square) => square !== null);
  let status;

  if (winner) {
    if (gameMode === "ai") {
      status = winner === "X" ? "🎉 You Win!" : "🤖 AI Wins!";
    } else {
      status = `🏆 Winner: ${winner}`;
    }
  } else if (isBoardFull) {
    status = "😐 It's a Draw!";
  } else {
    if (gameMode === "ai") {
      status = isPlayerTurn ? "👤 Your Turn (X)" : "🤖 AI Thinking...";
    } else {
      status = `👤 Next Player: ${isPlayerTurn ? "X" : "O"}`;
    }
  }

  const isDisabled =
    gameMode === "ai" && !isPlayerTurn && !winner && !isBoardFull;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-container">
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() => handleClick(0)}
            disabled={isDisabled}
          />
          <Square
            value={squares[1]}
            onSquareClick={() => handleClick(1)}
            disabled={isDisabled}
          />
          <Square
            value={squares[2]}
            onSquareClick={() => handleClick(2)}
            disabled={isDisabled}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() => handleClick(3)}
            disabled={isDisabled}
          />
          <Square
            value={squares[4]}
            onSquareClick={() => handleClick(4)}
            disabled={isDisabled}
          />
          <Square
            value={squares[5]}
            onSquareClick={() => handleClick(5)}
            disabled={isDisabled}
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() => handleClick(6)}
            disabled={isDisabled}
          />
          <Square
            value={squares[7]}
            onSquareClick={() => handleClick(7)}
            disabled={isDisabled}
          />
          <Square
            value={squares[8]}
            onSquareClick={() => handleClick(8)}
            disabled={isDisabled}
          />
        </div>
      </div>
    </>
  );
}

// AI strategy function
function getAIMove(squares) {
  console.log("AI analyzing board:", squares);

  // 1. Try to win
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = squares.slice();
      testSquares[i] = "O";
      if (calculateWinner(testSquares) === "O") {
        console.log("AI found winning move:", i);
        return i;
      }
    }
  }

  // 2. Block player from winning
  for (let i = 0; i < 9; i++) {
    if (squares[i] === null) {
      const testSquares = squares.slice();
      testSquares[i] = "X";
      if (calculateWinner(testSquares) === "X") {
        console.log("AI blocking player at:", i);
        return i;
      }
    }
  }

  // 3. Strategic positions: center > corners > edges
  const strategicMoves = [4, 0, 2, 6, 8, 1, 3, 5, 7];

  for (const move of strategicMoves) {
    if (squares[move] === null) {
      console.log("AI choosing strategic move:", move);
      return move;
    }
  }

  console.log("No moves available for AI");
  return -1; // No moves available
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
