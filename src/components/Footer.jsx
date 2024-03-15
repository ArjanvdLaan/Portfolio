import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

export const Footer = ({ showOverlay, toggleOverlay }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    setIsSubmitted(true);
  };

  return (
    <>
      <footer className="footerHome">
        <FontAwesomeIcon
          icon={faEnvelope}
          className="emailIcon"
          onClick={toggleOverlay}
        />
        {showOverlay && (
          <div className="overlay">
            {isSubmitted ? (
              <div className="submitForm">
                <h1>Form successfully submitted!</h1>
                <p>Thanks for your submission. I'll get back to you soon.</p>
                <button
                  onClick={() => {
                    toggleOverlay();
                    setIsSubmitted(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <button onClick={toggleOverlay}>Close</button>
                <form
                  className="submitForm"
                  onSubmit={handleSubmit}
                  name="contact"
                  method= "POST"
                  data-netlify="true"
                >
                  <label>
                    Name:
                    <input
                      type="text"
                      name="name"
                      className="formInputTagHome"
                      onChange={handleNameChange}
                    />
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
                    <input
                      type="email"
                      name="email"
                      className="formInputTagHome"
                      onChange={handleEmailChange}
                    />
                  </label>
                  <input type="submit" value="Submit" className="submitBtn" />
                </form>
              </>
            )}
          </div>
        )}
      </footer>
      <div style={{ display: "none" }}>
        <form name="contact" data-netlify="true"></form>
      </div>
    </>
  );
};
