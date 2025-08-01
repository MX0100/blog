import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Show back button on specific pages
  const showBackButton = ["/tictactoe", "/snake"].includes(location.pathname);

  return (
    <header className="header">
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blogpage">Blog</Link>
        <Link to="/hobby">Hobby</Link>
        <Link to="/games">Games</Link>
      </nav>
      {showBackButton && (
        <div className="back-section">
          <button
            className="back-button"
            onClick={() => navigate("/games")}
            aria-label="Back to Games"
          >
            ← Back to Games
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
