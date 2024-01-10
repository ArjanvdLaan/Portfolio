import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./GoalsDisplay.css";

const GoalsDisplay = ({ goals, removeGoal, setGoals }) => {
  const [draggedGoal, setDraggedGoal] = useState(null);

  const handleDragStart = (e, goal) => {
    setDraggedGoal(goal);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  
    // Check if the target is an li element
    if (e.target.tagName.toLowerCase() === 'li') {
      // Calculate the position of the mouse relative to the element
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
  
      // Remove existing borders
      e.target.style.borderLeft = '';
      e.target.style.borderRight = '';
  
      // Add border to the left or right side based on the mouse position
      if (x < rect.width / 2) {
        e.target.style.borderLeft = '2px solid black';
      } else {
        e.target.style.borderRight = '2px solid black';
      }
    }
  };

  const handleDrop = (e, goal) => {
    e.preventDefault();

    // Swap the goals in the goals array
    const goalsCopy = [...goals];
    const draggedGoalIndex = goalsCopy.findIndex(
      (g) => g.id === draggedGoal.id
    );
    const droppedGoalIndex = goalsCopy.findIndex((g) => g.id === goal.id);
    goalsCopy[draggedGoalIndex] = goal;
    goalsCopy[droppedGoalIndex] = draggedGoal;

    // Update the goals state
    setGoals(goalsCopy);

    // Remove borders from all li elements
    const lis = document.querySelectorAll(".goals-display li");
    lis.forEach((li) => {
      li.style.borderLeft = "";
      li.style.borderRight = "";
    });
  };

  const handleDragEnter = (e) => {
    e.target.style.borderLeft = "2px solid black"; // Add border to the left side
  };

  const handleDragLeave = (e) => {
    // Remove borders when the dragged element leaves the target
    e.target.style.borderLeft = "";
    e.target.style.borderRight = "";
  };

  return (
    <div className="goals-display">
      <ul onDragOver={handleDragOver}>
        {goals.map((goal) => (
          <li
            key={goal.id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, goal)}
            onDrop={(e) => handleDrop(e, goal)}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={{ backgroundColor: goal.color }}
          >
            {goal.text}
            <FontAwesomeIcon
              className="trash-icon"
              icon={faTrash}
              onClick={() => removeGoal(goal.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsDisplay;
