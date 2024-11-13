// LoginPage.jsx
import React from "react";

const LoginPage = ({ onClick }) => {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={onClick}>Login with Reddit</button>
    </div>
  );
};

export default LoginPage;
