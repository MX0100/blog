// src/index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./styles.css";
import App from "./App";
import BlogPage from "./BlogPage";
import TicTacToePage from "./TicTacToePage";
import Projects from "./Projects";
import Games from "./Games";
import Snake from "./Snake";
import Hobby from "./Hobby";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blogpage" element={<BlogPage />} />
        <Route path="/tictactoe" element={<TicTacToePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/games" element={<Games />} />
        <Route path="/snake" element={<Snake />} />
        <Route path="/hobby" element={<Hobby />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
