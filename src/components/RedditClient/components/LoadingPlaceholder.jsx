import React from "react";
import "./CSS/LoadingPlaceholder.css";

const LoadingPlaceholder = () => {
  return (
    <div className="container">
      <div className="loading-placeholder">
        <div className="placeholder-title"></div>
        <div className="placeholder-image"></div>
        <div className="placeholder-info"></div>
      </div>
    </div>
  );
};

export default LoadingPlaceholder;
