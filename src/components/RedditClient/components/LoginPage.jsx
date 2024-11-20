// LoginPage.jsx
import React from "react";
import { getRedditAuthUrl } from "../auth";

const LoginPage = ({ onClick }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => (window.location.href = getRedditAuthUrl())}>Login with Reddit</button>
    </div>
  );
};

export default LoginPage;
