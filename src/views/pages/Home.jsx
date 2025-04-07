import { useState, useEffect } from "react";
import "../../styles/Home.css";
import BrowseCarparkController from "../../controllers/BrowseCarparkController";
import NavigationMenu from "../components/NavigationMenu";
import { useNavigate } from "react-router-dom";
import { useCarpark } from "../../context/CarparkContext";

function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState([]);
  const carparkInstance = useCarpark(); // Instantiate the Carpark class

  // Fetch carpark data and store it in localStorage
  useEffect(() => {
    const fetchCarparkData = async () => {
      const storedBookings = localStorage.getItem("bookings");

      if (!storedBookings) {
        // If localStorage is empty, fetch data from the API
        await carparkInstance.loadCarparkData();
        const carparkData = carparkInstance.getCarparks();
        console.log("Fetched carpark data:", carparkData);

        // Format the data for the application
        const formattedBookings = carparkData.map((carpark, index) => ({
          id: index + 1,
          name: `Booking ${index + 1}`,
          carpark: carpark.carparkNumber,
          slotsAvailable: carpark.availableLots,
          slotsReserved: carpark.totalLots - carpark.availableLots,
          status: "No booking",
          startTime: null,
          location: carpark.location || "Unknown Location",
        }));

        // Save the formatted data to localStorage
        localStorage.setItem("bookings", JSON.stringify(formattedBookings));
        setBookings(formattedBookings); // Update the state
      } else {
        // If localStorage already has data, load it into state
        setBookings(JSON.parse(storedBookings));
      }
    };

    fetchCarparkData();
  }, [carparkInstance]);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
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
    booking.carpark.toLowerCase().includes(searchTerm.toLowerCase()) &&
    booking.status !== "No booking"
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