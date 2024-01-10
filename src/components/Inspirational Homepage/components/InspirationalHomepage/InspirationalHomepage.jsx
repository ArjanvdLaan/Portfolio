// import React from "react";
import { WeatherBox } from "../WeatherBox/WeatherBox";
import { GoalsBox } from "../GoalsBox/GoalsBox";
import { QuoteBox } from "../QuoteBox/QuoteBox";
import "./InspirationalHomepage.css";

export const InspirationalHomepage = () => {
  return (
    <div className="parent-div">
      <div className="fill-up-space-div"></div>
      <div className="goals-and-weather">
        <WeatherBox className="weather-box" />
        <GoalsBox className="goals-box" />
      </div>
      <div className="quote-box-div">
        <QuoteBox className="quote-box" />
      </div>
    </div>
  );
};

// export default InspirationalHomepage;
