import React, { useState, URLSearchParams } from "react";
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

    // Create a FormData instance from the form event
    const formData = new FormData(event.target);
  
    // Add the form-name field for Netlify
    formData.append('form-name', 'contact');
  
    // Make a POST request to the form's action URL
    fetch('/', {
      method: 'POST',
      headers: { 'Accept': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      setIsSubmitted(true);
    })
    .catch((error) => {
      console.error(error);
    });
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
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                >
                  <label>
                    Name:
                    <input
                      type="text"
                      name="stateYourName"
                      className="formInputTagHome"
                      onChange={handleNameChange}
                    />
                  </label>
                  <label>
                    Message:
                    <textarea
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
                  <input type="submit" value="submit" className="submitBtn" />
                </form>
              </>
            )}
          </div>
        )}
      </footer>

      <form hidden name="contact" data-netlify="true"></form>
    </>
  );
};
