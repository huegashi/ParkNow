import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import AdvancedSearch from "./AdvancedSearch";

function NavigationMenu() {
  const navigate = useNavigate();
  const [pendingBooking, setPendingBooking] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const activeCheckIn = savedBookings.find((b) => b.status === "Booking pending");
    const activeCheckOut = savedBookings.find((b) => b.status === "Booking confirmed");

    setPendingBooking(activeCheckIn);
    setConfirmedBooking(activeCheckOut);
  }, []);

  const handleCheckInNavigation = () => {
    if (pendingBooking) {
      navigate(`/checkin/${pendingBooking.id}`);
    } else {
      alert("No active bookings available for check-in.");
    }
  };

  const handleCheckOutNavigation = () => {
    if (confirmedBooking) {
      navigate(`/checkout/${confirmedBooking.id}`);
    } else {
      alert("No confirmed bookings available for check-out.");
    }
  };

  return (
    <div className="home-page">
      <nav className="navigation-row">
        <button onClick={() => navigate("/home")}>Search Booking</button>
        <button onClick={() => navigate("/home")}>Cancel Booking</button>
        <button onClick={handleCheckInNavigation}>Check In</button>
        <button onClick={handleCheckOutNavigation}>Check Out</button>
      </nav>
    </div>
  );
}

export default NavigationMenu;
