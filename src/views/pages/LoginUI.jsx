import React from 'react';
import "../../styles/login.css";

const LoginUI = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <div className="login-container">
      <h1 className="park-now">ParkNow</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          className="input-text"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input-text"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginUI;