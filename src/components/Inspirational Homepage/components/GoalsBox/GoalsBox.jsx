import { useState } from "react";
import GoalsInputBar from "../GoalsInputBar/GoalsInputBar";
import GoalsDisplay from "../GoalsDisplay/GoalsDisplay";
import { v4 as uuidv4 } from "uuid";

function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export const GoalsBox = () => {
  const [goals, setGoals] = useState([
    { id: uuidv4(), text: 'Lorem', color: getRandomColor() },
    { id: uuidv4(), text: 'Ipsum', color: getRandomColor() }
  ]);

  const removeGoal = (id) => {
    setGoals((oldGoals) => oldGoals.filter((goal) => goal.id !== id));
  };

  return (
    <div className="goals-box"  >
      <GoalsInputBar setGoals={setGoals} />
      <GoalsDisplay goals={goals} removeGoal={removeGoal} setGoals={setGoals} />
    </div>
  );
};
