// LoginPage.jsx
import React from "react";
import { getRedditAuthUrl } from "../auth";
import "./CSS/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReddit } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-title-container">
        <h1 className="login-title">
          Reddit Client
          <FontAwesomeIcon
            icon={faReddit}
            className="reddit-icon-login"
            alt="Reddit logo"
            style={{ color: "#f55019" }}
          />
        </h1>
      </div>
      <button
        className="login-button"
        onClick={() => (window.location.href = getRedditAuthUrl())}
      >
        Login with Reddit
      </button>
    </div>
  );
};

export default LoginPage;
