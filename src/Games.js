import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import Header from "./header";

function Games() {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <h2>
          Welcome to the Games Collection! Play and have fun with these
          interactive games.
        </h2>
        <div className="container">
          <div className="project">
            <div className="title">Classic Board Games</div>
            <div className="sub-title">
              <Link to="/tictactoe" className="light-blue-link">
                Tic-Tac-Toe - Challenge yourself against AI or play with a
                friend
              </Link>
            </div>
            <div className="sub-title">
              Strategic turn-based game with smart AI opponent
            </div>
          </div>

          <div className="project">
            <div className="title">Arcade Games</div>
            <div className="sub-title">
              <Link to="/snake" className="light-blue-link">
                Snake - Classic arcade game with modern controls
              </Link>
            </div>
            <div className="sub-title">
              Control the snake to eat food and grow longer. Use mouse clicks on
              PC or touch buttons on mobile.
            </div>
          </div>

          <div className="project">
            <div className="title">Coming Soon</div>
            <div className="sub-title">
              More exciting games are in development!
            </div>
            <div className="sub-title">
              Stay tuned for puzzle games, action games, and more interactive
              experiences.
            </div>
          </div>
        </div>
        <p>More games will be added as the collection grows. Enjoy playing!</p>
        <footer className="footer">
          <p>
            <a
              href="https://www.linkedin.com/in/wenkai-wang-367aa228a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={require("./link.png")}
                alt="LinkedIn"
                className="footer-icon"
              />
              Connect Me
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Games;
