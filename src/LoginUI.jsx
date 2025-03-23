import React from 'react';

const LoginUI = ({ username, setUsername, password, setPassword, handleLogin }) => {
  return (
    <div>
      <div className="park-now">Park Now</div>
      <form className="login-form" onSubmit={handleLogin}>
        <p>*Username and Password are case sensitive!</p>
        <input
          className="bg-white text-black rounded-xl shadow-lg"
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="bg-white text-black rounded-xl shadow-lg"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="mt-2 bold-button">Login</button>
      </form>
    </div>
  );
};

export default LoginUI;