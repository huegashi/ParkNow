import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase.js";
import LoginUI from "../views/pages/LoginUI.jsx";
import '../App.css';
import Loading from "../views/components/Loading.jsx"; // Import the new Loading component
import {Carpark} from "../models/Carpark.jsx"; // Import the Carpark model

const Authenticator = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [carpark, setCarpark] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const carparkInstance = new Carpark();
    await carparkInstance.loadCarparkData();
    setCarpark(carparkInstance);

    try {
      const { data: userInfo, error } = await supabase
        .from("Users")
        .select("*")
        .eq("Username", username)
        .single();

      if (!error && userInfo.Password === password) {
        navigate("/home");
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading /> // Use the new Loading component
      ) : (
        <LoginUI
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default Authenticator;