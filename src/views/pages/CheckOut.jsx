import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Check.css"; // Reusing same styles

function CheckOut() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
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

  const handleCheckOut = () => {
    if (!booking) {
      setError("No active booking found.");
      return;
    }

    if (booking.status !== "Booking confirmed") {
      setError("You do not have a confirmed booking to check out.");
      return;
    }

    alert("Check-out successful!");
    
    const updatedBookings = JSON.parse(localStorage.getItem("bookings")).map(
      (b) =>
        b.id === booking.id
          ? { ...b, status: "No booking", 
            slotsAvailable: b.slotsAvailable + 1
          }
          : b
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    navigate("/home");
  };

  return (
    <div className="checkin-container">
      <h2>Check-Out</h2>
      {error && <p className="error">{error}</p>}
      <p><strong>Carpark:</strong> {booking?.carpark || "Loading..."}</p>
      <p><strong>Status:</strong> {booking?.status || "Loading..."}</p>
      <button onClick={handleCheckOut} disabled={!booking}>
        Check Out
      </button>
    </div>
  );
}

export default CheckOut;
