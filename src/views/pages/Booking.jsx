import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const nameMap = {
  carparka: "Carpark A",
  carparkb: "Carpark B",
  carparkc: "Carpark C",
};

function Booking() {
  const { carparkName } = useParams();
  const navigate = useNavigate();

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [hasTriedBooking, setHasTriedBooking] = useState(false);

  useEffect(() => {
    if (hasTriedBooking) return;

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const targetCarparkName = nameMap[carparkName];

    const hasOtherActiveBooking = bookings.some(
      (b) =>
        (b.status === "Booking pending" || b.status === "Booking confirmed") &&
        b.carpark !== targetCarparkName
    );

    if (hasOtherActiveBooking) {
      alert("⚠️ You already have an active booking. Please check in or check out before booking a new slot.");
      setHasTriedBooking(true);
      navigate("/home");
      return;
    }

    const bookingIndex = bookings.findIndex(
      (b) => b.carpark === targetCarparkName && b.status === "No booking"
    );

    if (bookingIndex !== -1) {
      bookings[bookingIndex] = {
        ...bookings[bookingIndex],
        slotsReserved: bookings[bookingIndex].slotsReserved + 1,
        slotsAvailable: Math.max(bookings[bookingIndex].slotsAvailable - 1, 0),
        status: "Booking pending",
        startTime: new Date().getTime() + 10 * 1000,
      };

      localStorage.setItem("bookings", JSON.stringify(bookings));
      setBookingSuccess(true);
      setHasTriedBooking(true);
      console.log("✅ Booking updated in localStorage.");
    }
  }, [carparkName, navigate, hasTriedBooking]);

  // ✅ Effect to handle delayed redirect AFTER booking success
  useEffect(() => {
    if (!bookingSuccess) return;

    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timeoutId); // Clean up if component unmounts early
  }, [bookingSuccess, navigate]);

  if (!hasTriedBooking) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Processing your booking...</h2>
      </div>
    );
  }

  if (bookingSuccess) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>✅ Booking Successful! 🚗</h2>
        <p>Redirecting you to Home...</p>
      </div>
    );
  }

  return null;
}

export default Booking;