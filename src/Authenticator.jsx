import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase.js";
import LoginUI from "./LoginUI";
import './App.css';
import { DotLottiePlayer } from '@dotlottie/react-player';

const Authenticator = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    try {
      const { data: userInfo, error } = await supabase
        .from("Users")
        .select("*")
        .eq("Username", username)
        .single();

      if (!error && userInfo.Password === password) {
        // Add a delay before navigating
        setTimeout(() => {
          navigate("/home");
        }, 3000); // Delay for 3 seconds (3000 milliseconds)
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Authentication error:", err);
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Set loading to false when login finishes
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <DotLottiePlayer
            src="/loading-car.lottie"
            autoplay
            loop
            className="loading-animation"
          />
          <p>Authenticating...</p>
        </div> // Render loading indicator with DotLottie animation
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