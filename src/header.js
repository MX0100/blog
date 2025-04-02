import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/blogpage">Blog</Link>
        <Link to="/hobby">Hobby</Link>
        <Link to="/tictactoe">Game</Link>
      </nav>
    </header>
  );
}

export default Header;
