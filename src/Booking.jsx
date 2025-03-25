import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const nameMap = {
  carparkA: "Carpark A",
  carparkB: "Carpark B",
  carparkC: "Carpark C",
};

function Booking() {
  const { carparkName } = useParams();
  const navigate = useNavigate();
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const targetCarparkName = nameMap[carparkName];

    // 🔒 Check if there's already an active booking
    const hasActiveBooking = bookings.some(
      (b) => b.status === "Booking pending" || b.status === "Booking confirmed"
    );

    if (hasActiveBooking) {
      alert("⚠️ You already have an active booking. Please check in or check out before booking a new slot.");
      navigate("/home");
      return;
    }

    let bookingUpdated = false;

    const updatedBookings = bookings.map((booking) => {
      if (
        booking.carpark === targetCarparkName &&
        booking.status === "No booking"
      ) {
        bookingUpdated = true;
        return {
          ...booking,
          slotsReserved: booking.slotsReserved + 1,
          slotsAvailable: Math.max(booking.slotsAvailable - 1, 0),
          status: "Booking pending",
          startTime: new Date().getTime() + 10 * 1000, // for check-in
        };
      }
      return booking;
    });

    if (bookingUpdated) {
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setBookingSuccess(true);
      console.log("✅ Booking updated in localStorage.");
    } else {
      console.log("⚠️ No matching booking found or booking already active.");
    }

    const timeout = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [carparkName, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      {bookingSuccess ? (
        <>
          <h2>✅ Booking Successful! 🚗</h2>
          <p>Redirecting you to Home...</p>
        </>
      ) : (
        <h2>Processing your booking...</h2>
      )}
    </div>
  );
}

export default Booking;
