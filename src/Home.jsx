import { useState, useEffect } from "react";
import "./App.css";
import BrowseCarparkManager from "./BrowseCarparkManager";
import NavigationMenu from "./NavigationMenu";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem("bookings");
    return savedBookings
      ? JSON.parse(savedBookings)
      : [
          {
            id: 1,
            name: "Booking 1",
            carpark: "Carpark A",
            slotsAvailable: 10,
            slotsReserved: 5,
            status: "No booking",
            startTime: null,
          },
          {
            id: 2,
            name: "Booking 2",
            carpark: "Carpark B",
            slotsAvailable: 8,
            slotsReserved: 3,
            status: "Booking pending",
            startTime: new Date().getTime() + 10 * 1000,
          },
          {
            id: 3,
            name: "Booking 3",
            carpark: "Carpark C",
            slotsAvailable: 15,
            slotsReserved: 7,
            status: "No booking",
            startTime: null,
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const handleSearchSelect = (carpark) => {
    setSearchTerm(carpark ? carpark.label : "");
  };

  const handleCheckInRedirect = (bookingId) => {
    navigate(`/checkin/${bookingId}`);
  };

  const handleCheckOutRedirect = (bookingId) => {
    navigate(`/checkout/${bookingId}`);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.carpark.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavigationMenu />
      <BrowseCarparkManager onSearchSelect={handleSearchSelect} />
      <div className="bookings-list">
        <h2 style={{ marginTop: "10px" }}>Current Carpark Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Slots Available</th>
              <th>Slots Reserved</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.carpark}</td>
                <td>{booking.slotsAvailable}</td>
                <td>{booking.slotsReserved}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "No booking" ? (
                    <button disabled>Not Available</button>
                  ) : booking.status === "Booking pending" ? (
                    <button
                      onClick={() => {
                        handleCheckInRedirect(booking.id);
                      }}
                    >
                      Check In
                    </button>
                  ) : booking.status === "Booking confirmed" ? (
                    <button
                      onClick={() => {
                        handleCheckOutRedirect(booking.id);
                      }}
                    >
                      Check Out
                    </button>
                  ) : (
                    <button disabled>Not Available</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
