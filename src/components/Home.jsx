// import React from "react";
import "./Home.css";
import photo from "./self.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faPython } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  return (
    <>
      <div className="thin-line"></div>
      <div className="parent-div">
        <div className="picture-text-div">
          <img className="picture" src={photo} alt="Arjan" />
          <div className="text-div">
            <h1>Hi! I'm Arjan, </h1>
            <blockquote className="tagline">
              {" "}
              A React-focused{" "}
              <FontAwesomeIcon className="react" icon={faReact} /> <br />{" "}
              Front-End Developer <br /> with a practical touch <br /> of Python
              backend <FontAwesomeIcon className="python" icon={faPython} />{" "}
              <br /> know-how."
            </blockquote>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
