import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BrowseCarparkUI from "../views/components/BrowseCarparkUI";

const BrowseCarparkController = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [options, setOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 10; // Limit items per page
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
    setCurrentPage(1); // Reset to the first page when search term changes
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

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredOptions.length / itemsPerPage);
  const paginatedOptions = filteredOptions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <BrowseCarparkUI
      searchTerm={searchTerm}
      handleInputChange={handleInputChange}
      handleKeyPress={handleKeyPress}
      filteredOptions={paginatedOptions} // Pass only paginated options
      handleChange={handleChange}
      showTable={showTable}
      errorMessage={errorMessage} // Pass error message to UI
      currentPage={currentPage} // Pass current page
      totalPages={totalPages} // Pass total pages
      handleNextPage={handleNextPage} // Pass next page handler
      handlePreviousPage={handlePreviousPage} // Pass previous page handler
    />
  );
};

export default BrowseCarparkController;