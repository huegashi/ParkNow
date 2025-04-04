import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookingUI from "../views/pages/BookingUI";
import Loading from "../views/components/Loading"; // Import a processing page component

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
  const [isProcessing, setIsProcessing] = useState(false); // State to handle processing page

  useEffect(() => {
    if (hasTriedBooking) return;

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const targetCarparkName = nameMap[carparkName];

    // Check for active bookings
    const hasOtherActiveBooking = bookings.some(
      (b) =>
        b.status === "Booking pending" || b.status === "Booking confirmed"
    );

    if (hasOtherActiveBooking) {
      alert(
        "⚠️ You already have an active booking. Please check in or check out before booking a new slot."
      );
      setHasTriedBooking(true);
      navigate("/home");
      return;
    }

    // Find the target carpark
    const bookingIndex = bookings.findIndex(
      (b) => b.carpark === targetCarparkName
    );

    if (bookingIndex !== -1) {
      const targetBooking = bookings[bookingIndex];

      // Exception: Status is null
      if (targetBooking.status === null) {
        alert("⚠️ The booking status for the selected carpark is null. Please contact support.");
        setHasTriedBooking(true);
        navigate("/home");
        return;
      }

      // Exception: Status is an empty string
      if (targetBooking.status === "") {
        alert("⚠️ The booking status for the selected carpark is empty. Please contact support.");
        setHasTriedBooking(true);
        navigate("/home");
        return;
      }

      // Update the target carpark's status
      if (targetBooking.status === "No booking") {
        setIsProcessing(true); // Show the processing page

        setTimeout(() => {
          bookings[bookingIndex] = {
            ...targetBooking,
            slotsReserved: targetBooking.slotsReserved + 1,
            slotsAvailable: Math.max(targetBooking.slotsAvailable - 1, 0),
            status: "Booking pending",
            startTime: new Date().getTime() + 10 * 1000,
          };

          localStorage.setItem("bookings", JSON.stringify(bookings));
          setBookingSuccess(true);
          setHasTriedBooking(true);
          setIsProcessing(false); // Hide the processing page
          console.log("✅ Booking updated in localStorage.");
        }, 2000); // Simulate a delay for processing
      }
    }
  }, [carparkName, navigate, hasTriedBooking]);

  useEffect(() => {
    if (!bookingSuccess) return;

    const timeoutId = setTimeout(() => {
      navigate("/home");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [bookingSuccess, navigate]);

  if (isProcessing) {
    return <Loading/>; 
  }

  return (
    <BookingUI
      bookingSuccess={bookingSuccess}
      hasTriedBooking={hasTriedBooking}
    />
  );
}

export default BookingController;