import React from "react";
import { Link } from "react-router-dom";
import linkIcon from "./link.png";
import "./App.css";
import Header from "./header";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Header /> {}
        <h1>Hey, I am Lucas Wang &#128075;</h1>
        <p>
          I am a computer engineer based in St John's Newfoundland 👨‍💻 who has
          strong background in OS and compuer architecture.
        </p>
        <p>
          My skill sets include{" "}
          <span className="highlight">Web Development🌐</span>,{" "}
          <span className="highlight">Data Science</span>, and &nbsp;
          <span className="highlight">Machine Learning</span>.
          <br />
          Programming languages I am proficient in include: Java, Python, C++,
          JavaScript, SQL, HTML/CSS, VHDL and Dafny.
          <br />
          <br />
          I have used frameworks such as React, Angular.js, Spring, and ASP .NET
          Core to build modern platforms.
          <br />
          <br />
          Regarding database work, I have worked with MySQL, PostgreSQL, Redis,
          MongoDB, and SQLite to manage data.
          <br />
          <br />
          Since you are here, you may want to check out my&nbsp;
          <Link to="/tictactoe" className="light-blue-link">
            {" "}
            Tic-Tac-Toe game
          </Link>
          &nbsp;to take a break from coding.
        </p>
        <p>Additional content will be added here as the blog grows.😀</p>
        <footer className="footer">
          <p>
            <a
              href="https://www.linkedin.com/in/wangwk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkIcon} alt="LinkedIn" className="footer-icon" />
              Connect Me
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a
              href="mailto:lucaswang0402@gmail.com?subject=Hello&body=Hi%20there!"
              target="_blank"
              rel="noopener noreferrer"
            >
              📧 Email Me
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
