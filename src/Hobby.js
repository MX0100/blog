import React from "react";
//import { Link } from "react-router-dom";
import "./App.css"; // 引用样式文件
import Header from "./header";
function Hobby() {
  return (
    <div className="app">
      <div className="content">
        <Header /> {/* 添加 Header 只需一行代码*/}
        <h2>My Hobbies</h2>
        <p>
          I am an official Fc bayern football fan and enjoy a varity of sports.
        </p>
        {/* 兴趣内容 */}
      </div>
    </div>
  );
}

export default Hobby;
