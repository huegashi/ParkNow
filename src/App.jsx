import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import CarparkDetails from './CarparkDetails'; // Add this import
import CheckIn from "./CheckIn"; 
import CheckOut from "./CheckOut"; 

function App() {
  return (
    <Router>
      <div className="app-background">
        <Routes>
          <Route path="/" element={<Navigate to= "/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carpark/:carparkName" element={<CarparkDetails />} />
          <Route path="/checkin/:bookingId" element={<CheckIn />} />
          <Route path="/checkout/:bookingId" element={<CheckOut />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
