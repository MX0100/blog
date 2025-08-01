import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "./header";
import GameBoy from "./GameBoy";
import "./Snake.css";
import "./index.css";

const BOARD_SIZE = 20; // 20x20 grid
const CELL_SIZE = 12; // Smaller cells for GameBoy screen
const MOBILE_CELL_SIZE = 10; // Even smaller for mobile GameBoy screen
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving up
const GAME_SPEED = 220; // milliseconds (slower for better control)

function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 10, y: 10 }); // Center of safe zone
  const [gameState, setGameState] = useState("ready"); // 'ready', 'playing', 'paused', 'gameOver'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("snakeHighScore")) || 0
  );
  const [isMobile, setIsMobile] = useState(false);

  const gameLoopRef = useRef();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate random food position in safe zone
  const generateFood = useCallback((currentSnake) => {
    let newFood;
    let attempts = 0;
    const maxAttempts = 100; // Prevent infinite loop

    // Clear safe zone: 3 cells from each edge (range 3-16 for 20x20 board)
    const SAFE_MIN = 3;
    const SAFE_MAX = BOARD_SIZE - 4; // 16 for 20x20 board

    const isPositionOccupied = (x, y) => {
      return currentSnake.some((segment) => segment.x === x && segment.y === y);
    };

    do {
      // Generate food only in clearly safe area (3 cells from any edge)
      newFood = {
        x: Math.floor(Math.random() * (SAFE_MAX - SAFE_MIN + 1)) + SAFE_MIN,
        y: Math.floor(Math.random() * (SAFE_MAX - SAFE_MIN + 1)) + SAFE_MIN,
      };
      attempts++;
    } while (
      attempts < maxAttempts &&
      isPositionOccupied(newFood.x, newFood.y)
    );

    console.log(
      `Food generated at (${newFood.x}, ${newFood.y}) - Safe zone: ${SAFE_MIN}-${SAFE_MAX}`
    );
    return newFood;
  }, []);

  // Start game
  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameState("playing");
  }, [generateFood]);

  // Pause/Resume game
  const togglePause = useCallback(() => {
    if (gameState === "playing") {
      setGameState("paused");
    } else if (gameState === "paused") {
      setGameState("playing");
    }
  }, [gameState]);

  // Reset game
  const resetGame = useCallback(() => {
    setGameState("ready");
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
  }, [generateFood]);

  // Change direction (with validation to prevent reversing)
  const changeDirection = useCallback((newDirection) => {
    setDirection((prevDirection) => {
      // Prevent reversing direction
      if (
        newDirection.x === -prevDirection.x &&
        newDirection.y === -prevDirection.y
      ) {
        return prevDirection;
      }
      return newDirection;
    });
  }, []);

  // Handle direction input from GameBoy
  const handleDirectionPress = useCallback(
    (newDirection) => {
      if (gameState === "playing") {
        changeDirection(newDirection);
      }
    },
    [gameState, changeDirection]
  );

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== "playing") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          changeDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          changeDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          changeDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          changeDirection({ x: 1, y: 0 });
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
        default:
          // No action for other keys
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameState, changeDirection, togglePause]);

  // Game loop
  useEffect(() => {
    if (gameState !== "playing") return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Move head
        head.x += direction.x;
        head.y += direction.y;

        // Check wall collision
        if (
          head.x < 0 ||
          head.x >= BOARD_SIZE ||
          head.y < 0 ||
          head.y >= BOARD_SIZE
        ) {
          setGameState("gameOver");
          return prevSnake;
        }

        // Check self collision
        if (
          newSnake.some(
            (segment) => segment.x === head.x && segment.y === head.y
          )
        ) {
          setGameState("gameOver");
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore((prevScore) => {
            const newScore = prevScore + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem("snakeHighScore", newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoopRef.current);
  }, [gameState, direction, food, generateFood, highScore]);

  // Get game status message
  const getStatusMessage = () => {
    switch (gameState) {
      case "ready":
        return "Press START to begin!";
      case "playing":
        return "Use D-Pad to control snake";
      case "paused":
        return "Game Paused";
      case "gameOver":
        return `Game Over! Score: ${score}`;
      default:
        return "";
    }
  };

  // Game screen content
  const gameScreen = (
    <div className="snake-game-screen">
      <div
        className="snake-board"
        style={{
          width: BOARD_SIZE * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE),
          height: BOARD_SIZE * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE),
          position: "relative",
          margin: "5px auto",
          background: "#000",
          border: "2px solid #555",
        }}
      >
        {/* Render safe zone border (visual guide) */}
        <div
          className="safe-zone-border"
          style={{
            position: "absolute",
            left: 3 * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE) - 1,
            top: 3 * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE) - 1,
            width:
              (BOARD_SIZE - 6) * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE) + 2,
            height:
              (BOARD_SIZE - 6) * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE) + 2,
            border: "1px dashed #444",
            pointerEvents: "none",
            opacity: 0.3,
          }}
        />

        {/* Render snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className={`snake-cell ${
              index === 0 ? "snake-head" : "snake-segment"
            }`}
            style={{
              position: "absolute",
              left: segment.x * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE),
              top: segment.y * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE),
              width: isMobile ? MOBILE_CELL_SIZE : CELL_SIZE,
              height: isMobile ? MOBILE_CELL_SIZE : CELL_SIZE,
            }}
          />
        ))}

        {/* Render food */}
        <div
          className="snake-cell snake-food"
          style={{
            position: "absolute",
            left: food.x * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE),
            top: food.y * (isMobile ? MOBILE_CELL_SIZE : CELL_SIZE),
            width: isMobile ? MOBILE_CELL_SIZE : CELL_SIZE,
            height: isMobile ? MOBILE_CELL_SIZE : CELL_SIZE,
          }}
        />

        {/* Game status overlay - only show when not playing */}
        {gameState !== "playing" && (
          <div
            className="game-status-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0, 0, 0, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div
              className="status-message"
              style={{
                background: "#333",
                color: "#fff",
                padding: "15px 20px",
                borderRadius: "8px",
                border: "2px solid #666",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {getStatusMessage()}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Game controls
  const gameControls = (
    <div className="snake-controls">
      {gameState === "ready" && (
        <button onClick={startGame} className="gameboy-control-btn">
          START
        </button>
      )}

      {(gameState === "playing" || gameState === "paused") && (
        <>
          <button onClick={togglePause} className="gameboy-control-btn">
            {gameState === "playing" ? "PAUSE" : "RESUME"}
          </button>
          <button onClick={resetGame} className="gameboy-control-btn">
            RESET
          </button>
        </>
      )}

      {gameState === "gameOver" && (
        <>
          <button onClick={startGame} className="gameboy-control-btn">
            RESTART
          </button>
          <button onClick={resetGame} className="gameboy-control-btn">
            RESET
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="app">
      <div className="content">
        <Header />
        <GameBoy
          gameTitle="Snake"
          gameScreen={gameScreen}
          gameControls={gameControls}
          score={score}
          highScore={highScore}
          onDirectionPress={handleDirectionPress}
          showDirectionPad={true}
        />
      </div>
    </div>
  );
}

export default Snake;
