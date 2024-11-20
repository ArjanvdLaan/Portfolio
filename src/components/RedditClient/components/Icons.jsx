import React from "react";
import "./CSS/Icons.css";
import CodecademyLogo from "../Images/codecademy-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";

const Icons = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`icons ${isOpen ? 'icons-open' : ''}`}>
      <a
        href="https://www.codecademy.com"
        target="_blank"
        rel="noopener noreferrer"
        className="Codecademy-logo-container"
      >
        <img
          className="Codecademy-logo"
          src={CodecademyLogo}
          alt="Codecademy logo"
        />
      </a>
      <a
        href="https://www.reddit.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={faReddit}
          className="reddit-icon"
          alt="Reddit logo"
          style={{ color: "#f55019" }}
        />
      </a>
    </div>
  );
};

export default Icons;
