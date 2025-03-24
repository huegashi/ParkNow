import {  BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Home from './Home';
import CarparkDetails from './CarparkDetails'; // Add this import
import CheckIn from "./CheckIn"; 
import CheckOut from "./CheckOut";
import CancelBooking from "./CancelBooking";
import BrowseCarparkManager from './BrowseCarparkManager'; // Import the new manager component

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
          <Route path="/cancelbooking/:bookingId" element={<CancelBooking />} />
          <Route path="/browse-carpark" element={<BrowseCarparkManager />} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App
