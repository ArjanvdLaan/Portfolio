import { useState } from "react";
import "./Home.css";
import photo from "./self.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faPython,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CodecademyIcon from "./codecademy-icon.svg";
import { Footer } from "./Footer";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setCurrentPage((currentPage % 3) + 1);
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <div className="parent-div">
        <div className="picture-text-div">
          <img className="picture" src={photo} alt="Arjan" />
          <div className="text-div">
            <div></div>
            <div className="name">
              Hi! I'm Arjan
              <span className="loader__dot">.</span>
              <span className="loader__dot">.</span>
              <span className="loader__dot">.</span>
            </div>
            <div className="dynamic-content">
              {currentPage === 1 && (
                <>
                  <div className="sub-text">
                    <blockquote className="tagline">
                      {" "}
                      A React-focused{" "}
                      <FontAwesomeIcon className="react" icon={faReact} />{" "}
                      <br /> frontend Developer <br /> with a practical touch{" "}
                      <br /> of Python backend{" "}
                      <FontAwesomeIcon className="python" icon={faPython} />{" "}
                      <br /> know-how.
                    </blockquote>
                    <FontAwesomeIcon
                      className="arrow"
                      icon={faChevronRight}
                      onClick={handleClick}
                    />
                  </div>
                  <div></div>
                </>
              )}
              {currentPage === 2 && (
                <>
                  <div className="sub-text">
                    <blockquote className="tagline">
                      Check the responsive <br /> pages in the menu <br /> for
                      some of my <br />
                      projects!
                    </blockquote>
                    <FontAwesomeIcon
                      className="arrow"
                      icon={faChevronRight}
                      onClick={handleClick}
                    />
                  </div>
                  <div></div>
                </>
              )}
              {currentPage === 3 && (
                <>
                  <div className="sub-text">
                    <blockquote className="tagline">
                      For more of my work, <br /> check: <br />{" "}
                      <div className="icons">
                        <a
                          href="https://github.com/ArjanvdLaan?tab=repositories"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faGithub} className="icon" />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/arjan-van-der-laan-555463136/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FontAwesomeIcon icon={faLinkedin} className="icon" />
                        </a>
                        <a
                          href="https://www.codecademy.com/users/parapaa/achievements"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={CodecademyIcon}
                            className="codecademy-icon"
                          />
                        </a>
                      </div>
                    </blockquote>
                    <FontAwesomeIcon
                      className="arrow"
                      icon={faChevronRight}
                      onClick={handleClick}
                    />
                  </div>
                  <div></div>
                </>
              )}
            </div>
          </div>
        </div>
        <Footer showOverlay={showOverlay} toggleOverlay={toggleOverlay} />
      </div>
    </>
  );
};

export default Home;
