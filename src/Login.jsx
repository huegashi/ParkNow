import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./App.css";
import supabase from "./supabase.js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

function Login() {
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  //const [isUploading, setIsUploading] = useState(false);

  const handleLogin = async (e) => {
    // Handle login logic here
    e.preventDefault();
    const { data: userInfo, error } = await supabase
      .from("Users")
      .select("*")
      .eq("Username", username)
      .single(); //without single , supabase will return an array

    console.log(error);

    //setIsUploading(false);

    if (!error && userInfo.Password === password) {
      navigate("/home");
    } else alert("Login failed. Please try again.");
    //4. Add the new fact to the UI
    //5. Reset input fields
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <div className="park-now">Park Now</div>
      <form className="login-form" onSubmit={handleLogin}>
        <p>*Username and Password are case sensitive!</p>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
