import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrowseCarparkUI from "../views/components/BrowseCarparkUI";

const BrowseCarparkController = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [options, setOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const navigate = useNavigate();

  // Load carpark data from localStorage (bookings)
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Convert bookings into the format expected by UI
    const formattedOptions = bookings.map((booking) => {
      const totalLots = booking.slotsAvailable + booking.slotsReserved;

      return {
        value: booking.carpark.toLowerCase().replace(/\s+/g, ""), // carparkA, carparkB
        label: booking.carpark,
        availableLots: booking.slotsAvailable,
        totalLots: totalLots,
        location: booking.location || "Unknown Location", // Fallback if not provided
        rates: booking.rates || "$2.50/hr", // Default rate if not set
      };
    });

    setOptions(formattedOptions);
  }, []); // Only run on initial mount

  const handleChange = (option) => {
    navigate(`/carpark/${option.value}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setErrorMessage(""); // Clear error message on typing
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.trim() === "") { // Check for empty input
        setErrorMessage("❌ No carpark selected. Please enter a valid carpark name.");
        setShowTable(false); // Prevent displaying the table
        return;
      }

      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredOptions.length === 0) { // Check if no valid carparks match
        setErrorMessage(`❌ Invalid Carpark Name: "${searchTerm}". Please enter a valid carpark name.`);
        setShowTable(false); // Prevent displaying the table
        return;
      }

      setShowTable(true); // Proceed to show table if valid options exist
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <BrowseCarparkUI
      searchTerm={searchTerm}
      handleInputChange={handleInputChange}
      handleKeyPress={handleKeyPress}
      filteredOptions={filteredOptions}
      handleChange={handleChange}
      showTable={showTable}
      errorMessage={errorMessage} // Pass error message to UI
    />
  );
};

export default BrowseCarparkController;
