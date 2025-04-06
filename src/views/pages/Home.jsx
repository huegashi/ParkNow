import { useState, useEffect } from "react";
import "../../styles/Home.css";
import BrowseCarparkController from "../../controllers/BrowseCarparkController";
import NavigationMenu from "../components/NavigationMenu";
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
            location: "Orchard Road" 
          },
          {
            id: 2,
            name: "Booking 2",
            carpark: "Carpark B",
            slotsAvailable: 8,
            slotsReserved: 3,
            status: "Booking pending",
            startTime: new Date().getTime() + 10 * 1000,
            location: "Marina Bay Sands" 
          },
          {
            id: 3,
            name: "Booking 3",
            carpark: "Carpark C",
            slotsAvailable: 15,
            slotsReserved: 7,
            status: "No booking",
            startTime: null,
            location: "Sentosa"
          }
        ];
  });

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Handle search selection
  const handleSearchSelect = (carpark) => {
    setSearchTerm(carpark ? carpark.label : "");
  };

  // Redirect to Check-In page
  const handleCheckInRedirect = (bookingId) => {
    navigate(`/checkin/${bookingId}`);
  };

  // Redirect to Check-Out page
  const handleCheckOutRedirect = (bookingId) => {
    navigate(`/checkout/${bookingId}`);
  };

  // Filter bookings based on the search term
  const filteredBookings = bookings.filter((booking) =>
    booking.carpark.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Search and Carpark List */}
      <div className="home-container">
        <BrowseCarparkController onSearchSelect={handleSearchSelect} />

        <div className="bookings-list">
          <h2 className="bookings-header">Current Carpark Bookings</h2>

          <table className="bookings-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Carpark</th>
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
                    {booking.status === "No booking" && (
                      <button className="action-button" disabled>
                        Not Available
                      </button>
                    )}
                    {booking.status === "Booking pending" && (
                      <button
                        className="action-button"
                        onClick={() => handleCheckInRedirect(booking.id)}
                      >
                        Check In
                      </button>
                    )}
                    {booking.status === "Booking confirmed" && (
                      <button
                        className="action-button"
                        onClick={() => handleCheckOutRedirect(booking.id)}
                      >
                        Check Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
