import React from "react";
import "./App.css"; // 引用样式文件
import "./BlogPage.css"; // 引用 BlogPage 样式文件
import Header from "./header"; // 引用 Header 组件

function BlogPage() {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <h2>3rd Oct, 2024</h2>
        <p>I start new intern position in FlyTogether as full-stack developer</p>
        <footer className="footer"></footer>
      </div>
      <div className="content">
        <h2>26th Aug, 2024</h2>
        <p>I have climbed the Gros Morne Mountain.</p>
        <div className="image-container">
          <img
            src={process.env.PUBLIC_URL + "/grosMorne1.jpg"}
            alt="Gros Morne Mountain View 1"
            className="responsive-image"
          />
          <img
            src={process.env.PUBLIC_URL + "/grosMorne2.jpg"}
            alt="Gros Morne Mountain View 2"
            className="responsive-image"
          />
        </div>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
export default BlogPage;
