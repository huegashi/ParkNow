import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase.js";
import LoginUI from "./LoginUI.jsx";

const Authenticator = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data: userInfo, error } = await supabase
      .from("Users")
      .select("*")
      .eq("Username", username)
      .single();

    console.log(error);

    if (!error && userInfo.Password === password) {
      navigate("/home");
    } else {
      alert("Login failed. Please try again.");
    }

    setUsername("");
    setPassword("");
  };

  return (
    <LoginUI
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
};

export default Authenticator;