import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export const Footer = ({ showOverlay, toggleOverlay }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
};

  return (
    <footer className="footerHome">
      <FontAwesomeIcon
        icon={faEnvelope}
        className="emailIcon"
        onClick={toggleOverlay}
      />
      {showOverlay && (
        <div className="overlay">
          <button onClick={toggleOverlay}>Close</button>
          <form className="submitForm" onSubmit={handleSubmit} name="contact" data-netlify="true" >
            <label>
              Name:
              <input type="text" name="name" className="formInputTagHome" onChange={handleNameChange} />
            </label>
            <label>
              Message:
              <textarea
                type="text"
                name="message"
                className="formInputTagHome"
                onChange={handleMessageChange}
              />
            </label>
            <label>
              Email:
              <input type="email" name="email" className="formInputTagHome" onChange={handleEmailChange} />
            </label>
            <input type="submit" value="Submit" className="submitBtn" />
          </form>
        </div>
      )}
    </footer>
  );
};
