import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Navigate to the home page
    
    navigate('/home');
  };

  return (
    <div className="login-form">
        <div className="park-now">Park Now</div>
          <input
            className="bg-white text-black rounded-xl shadow-lg"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="bg-white text-black rounded-xl shadow-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="mt-2 bold-button" onClick={handleLogin}>
            Login
          </button>
    </div>
  );
}


export default Login;