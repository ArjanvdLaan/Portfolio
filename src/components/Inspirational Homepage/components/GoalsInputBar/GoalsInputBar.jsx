// import React from 'react';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./GoalsInputBar.css";

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const GoalsInputBar = ({ setGoals }) => {
  const [goal, setGoal] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Check if the input field is empty
    if (goal.length === 0) {
      alert("Input field is empty");
      return;
    }
    const newGoal = {
      id: uuidv4(),
      text: goal,
      color: getRandomColor(), 
    };

    setGoals((oldGoals) => [...oldGoals, newGoal]);
    setGoal("");
  };
  return (
    <div className="goals-input-bar">
      <input
        className="input-bar"
        type="text"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        id="goals"
        placeholder="What's on your mind?"
      />
      <button className="button-thought" onClick={onSubmit}>
        Add Thought
      </button>
    </div>
  );
};

export default GoalsInputBar;
