import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrowseCarparkUI from '../views/components/BrowseCarparkUI';

const BrowseCarparkManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [options, setOptions] = useState([]);
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
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setShowTable(true);
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
    />
  );
};

export default BrowseCarparkManager;