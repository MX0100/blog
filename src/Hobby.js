import React from "react";
import "./App.css";
import Header from "./header";

function Hobby() {
  return (
    <div className="app">
      <div className="content">
        <Header />
        <h2>My Hobbies</h2>
        <p>
          I am an official FC Bayern football fan and enjoy a variety of sports such as hiking, swimming, and badminton.
        </p>
        <p>
          I also enjoy studying history, as I believe we can learn valuable lessons from the mistakes made by people in the past.
        </p>
      </div>
    </div>
  );
}

export default Hobby;
