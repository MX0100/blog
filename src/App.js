import React from "react";
import { Link } from "react-router-dom";
import linkIcon from "./link.png"; // 引入图片
import "./App.css"; // 引用样式文件
import Header from "./header";

function App() {
  return (
    <div className="app">
      <div className="content">
        <Header /> {/* 添加 Header 只需一行代码*/}
        <h1>Hey, I am Lucas Wang &#128075;</h1>
        <p>
          I am a computer engineering graduate student currently studying in
          Memorial University of Newfoundland 👨‍💻.
        </p>
        <p>
          My skill sets include <span class="highlight">Web Development🌐</span>
          , <span class="highlight">Image Processing</span>, and &nbsp;
          <span class="highlight">Hardware Design</span>.
          <br />
          Programming languages I am proficient in include: C++, Python, Java,
          JavaScript, SQL, and HTML/CSS.
          <br />
          I also have experience of using frameworks such as React⚛️, Node.js,
          SpringMVC, and Django.
          <br />I have a strong background in database, I have worked with
          MySQL, MongoDB, Redis, and SQLite.
        </p>
        <p>
          Since you are here, you may want to check out my
          <Link to="/tictactoe"> Tic-Tac-Toe game</Link>
          to take a break from coding.
        </p>
        <p>Additional content will be added here as the blog grows.😀</p>
        <footer className="footer">
          <p>
            <a
              href="https://www.linkedin.com/in/wenkai-wang-367aa228a/"
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
