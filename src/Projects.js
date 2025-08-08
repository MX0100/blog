import React from "react";
import "./App.css";
import Header from "./header";

function Projects() {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <h2>
          These are the projects I have completed and am currently working on.
        </h2>
        <div className="container">
          <div className="project">
            <div className="title">Course Project</div>
            <div className="sub-title">
              <a
                href="https://github.com/MX0100/TodoList"
                target="_blank"
                rel="noopener noreferrer"
              >
                TodoList Based on Python and tkinter
              </a>
            </div>
            <div className="sub-title">
              <a
                href="https://github.com/MX0100/CarPlateRecognizer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Car plate recognition system Based on Python and OpenCV
              </a>
            </div>
            <div className="sub-title">
              <a
                href="https://github.com/MX0100/life-fpga"
                target="_blank"
                rel="noopener noreferrer"
              >
                "Game of Life" Implementation on FPGA using VHDL
              </a>
            </div>
          </div>
          <div className="project">
            <div className="title">Collaborative Project ：TBD</div>
          </div>
          <div className="project">
            <div className="title">Graduation Project</div>
            <div className="sub-title">
              Undergraduate : Book donation platform based on SpringMVC 
            </div>
            <div className="sub-title">
            Graduate : The International Air Transport Association(IATA) NDC Engine Development and Flight delay predication based on ASP.net Core and MLP
            </div>
          </div>
          <div className="project">
            <div className="title">Personal Projects</div>
            <div className="sub-title">Coming soon!</div>
            <div className="sub-title">
                My GitHub: <a href="https://github.com/MX0100" target="_blank" rel="noopener noreferrer">github.com/MX0100</a>
            </div>
          </div>
        </div>
        <p>Additional content will be added here as the blog grows.</p>
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

export default Projects;
