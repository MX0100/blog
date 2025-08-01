import React from "react";
import "./GameBoy.css";

function GameBoy({
  gameTitle,
  gameScreen,
  gameControls,
  score,
  highScore,
  onDirectionPress,
  showDirectionPad = true,
}) {
  return (
    <div className="gameboy-container">
      <div className="gameboy-shell">
        {/* Top Section with Title */}
        <div className="gameboy-header">
          <div className="gameboy-brand">NINTENDO</div>
          <div className="gameboy-model">GAME BOY</div>
        </div>

        {/* Screen Section */}
        <div className="gameboy-screen-section">
          <div className="gameboy-screen-frame">
            <div className="gameboy-screen">
              {/* Game Title */}
              <div className="game-title-bar">
                <span className="game-title">{gameTitle}</span>
                {(score !== undefined || highScore !== undefined) && (
                  <span className="game-score">
                    {score !== undefined && `Score: ${score}`}
                    {score !== undefined && highScore !== undefined && " | "}
                    {highScore !== undefined && `High: ${highScore}`}
                  </span>
                )}
              </div>

              {/* Game Content */}
              <div className="game-content">{gameScreen}</div>
            </div>
          </div>
          <div className="gameboy-speaker">
            <div className="speaker-hole"></div>
            <div className="speaker-hole"></div>
            <div className="speaker-hole"></div>
            <div className="speaker-hole"></div>
            <div className="speaker-hole"></div>
            <div className="speaker-hole"></div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="gameboy-controls">
          {/* Direction Pad */}
          {showDirectionPad && (
            <div className="gameboy-dpad">
              <div className="dpad-container">
                <button
                  className="dpad-btn dpad-up"
                  onMouseDown={() => onDirectionPress?.({ x: 0, y: -1 })}
                  onTouchStart={() => onDirectionPress?.({ x: 0, y: -1 })}
                >
                  ▲
                </button>
                <button
                  className="dpad-btn dpad-left"
                  onMouseDown={() => onDirectionPress?.({ x: -1, y: 0 })}
                  onTouchStart={() => onDirectionPress?.({ x: -1, y: 0 })}
                >
                  ◄
                </button>
                <div className="dpad-center"></div>
                <button
                  className="dpad-btn dpad-right"
                  onMouseDown={() => onDirectionPress?.({ x: 1, y: 0 })}
                  onTouchStart={() => onDirectionPress?.({ x: 1, y: 0 })}
                >
                  ►
                </button>
                <button
                  className="dpad-btn dpad-down"
                  onMouseDown={() => onDirectionPress?.({ x: 0, y: 1 })}
                  onTouchStart={() => onDirectionPress?.({ x: 0, y: 1 })}
                >
                  ▼
                </button>
              </div>
              <div className="dpad-label">Direction Pad</div>
            </div>
          )}

          {/* Game Controls */}
          <div className="gameboy-game-controls">{gameControls}</div>

          {/* Action Buttons */}
          <div className="gameboy-buttons">
            <div className="action-buttons">
              <button className="action-btn btn-b">B</button>
              <button className="action-btn btn-a">A</button>
            </div>
            <div className="button-labels">
              <span>B</span>
              <span>A</span>
            </div>
          </div>
        </div>

        {/* Bottom Labels */}
        <div className="gameboy-footer">
          <div className="footer-text">● BATTERY</div>
          <div className="footer-text">◎ SELECT START</div>
        </div>
      </div>
    </div>
  );
}

export default GameBoy;
