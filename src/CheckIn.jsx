import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CheckIn.css';

function CheckIn() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const foundBooking = savedBookings.find(
      (booking) => booking.id.toString() === bookingId
    );

    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      setError("No active booking found.");
      setTimeout(() => navigate("/home"), 2000); // Redirect after 2 seconds
    }
  }, [bookingId, navigate]);

  useEffect(() => {
    if (booking && booking.startTime) {
      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = (booking.startTime - currentTime) / 1000; // Convert to seconds

        if (timeDifference < 0) {
          setError("Check-in window expired! Booking canceled.");

          // Update localStorage
          const updatedBookings = JSON.parse(localStorage.getItem("bookings")).map(
            (b) =>
              b.id === booking.id
                ? { 
                    ...b, 
                    status: "No booking", 
                    slotsAvailable: b.slotsAvailable + 1,
                    slotsReserved: Math.max(0, b.slotsReserved - 1)
                  }
                : b
          );          
          localStorage.setItem("bookings", JSON.stringify(updatedBookings));

          // Redirect after showing message
          setTimeout(() => navigate("/home"), 2000);
          clearInterval(interval); // Stop checking
        }
      }, 1000); // Check every second

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [booking, navigate]);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError("");
        },
        () => {
          setError("Please enable location permissions to check in.");
        }
      );
    }
  };

  const handleCheckIn = () => {
    if (!booking) {
      setError("No active booking found.");
      return;
    }

    const currentTime = new Date().getTime();
    const timeDifference = (booking.startTime - currentTime) / 1000; // Convert to seconds

    if (timeDifference > 10) {
      setError("You can only check in within 10 seconds of the booking start time.");
      return;
    }

    if (!currentLocation) {
      getLocation();
      return;
    }

    alert("Check-in successful!");
    // Update localStorage: Change status & reduce reserved slots by 1
    const updatedBookings = JSON.parse(localStorage.getItem("bookings")).map(
        (b) => 
          b.id === booking.id 
            ? { ...b, status: "Booking confirmed", slotsReserved: Math.max(0, b.slotsReserved - 1) } 
            : b
      );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    navigate("/home");
  };

  return (
    <div className="checkin-container">
      <h2>Check-In</h2>
      {error && <p className="error">{error}</p>}
      <p><strong>Carpark:</strong> {booking?.carpark || "Loading..."}</p>
      <p><strong>Check-in Window:</strong> 10 seconds</p>
      <button onClick={handleCheckIn} disabled={!booking}>
        Check In
      </button>
    </div>
  );
}

export default CheckIn;
