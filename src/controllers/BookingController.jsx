import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingUI from "../views/pages/BookingUI";

const nameMap = {
  carparka: "Carpark A",
  carparkb: "Carpark B",
  carparkc: "Carpark C",
};

function BookingController() {
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

  useEffect(() => {
    if (!bookingSuccess) return;

    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [bookingSuccess, navigate]);

  return (
    <BookingUI
      bookingSuccess={bookingSuccess}
      hasTriedBooking={hasTriedBooking}
    />
  );
}

export default BookingController;