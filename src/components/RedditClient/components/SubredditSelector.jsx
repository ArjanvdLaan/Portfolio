import React, { useState } from "react";
import "./CSS/SubredditSelector.css";

// Define the list of subreddits that can be selected
const subredditOptions = [
  { name: "r/Pics", value: "pics" },
  { name: "r/Aww", value: "aww" },
  { name: "r/EarthPorn", value: "EarthPorn" },
  { name: "r/Itookapicture", value: "itookapicture" },
  { name: "r/Art", value: "Art" },
  { name: "r/FoodPorn", value: "foodporn" },
  { name: "r/DesignPorn", value: "DesignPorn" },
  { name: "r/ImaginaryLandscapes", value: "ImaginaryLandscapes" },
  { name: "r/CityPorn", value: "CityPorn" },
  { name: "r/Wallpaper", value: "wallpaper" },
  { name: "r/SpacePorn", value: "SpacePorn" },
];

const SubredditSelector = ({ onSubredditChange }) => {
  const [selectedSubreddit, setSelectedSubreddit] = useState("pics");

  // Handle change event when the user selects a new subreddit
  const subredditSelectionHandler = (event) => {
    const subreddit = event.target.value;
    console.log("different subreddit is selected", subreddit);
    setSelectedSubreddit(subreddit);
    onSubredditChange(subreddit); // Pass the selected subreddit to the parent component
  };

  return (
    <div className="style-container">
      <div className="select-container">
        <div className="dropdown">
          <select
            id="subreddit-select"
            value={selectedSubreddit}
            onChange={subredditSelectionHandler}
          >
            {subredditOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SubredditSelector;
