import React from 'react';
import "../../styles/BrowseCarparkUI.css"; // Import a CSS file for better styling

const BrowseCarparkUI = ({ 
  searchTerm, 
  handleInputChange, 
  handleKeyPress, 
  filteredOptions, 
  handleChange, 
  showTable,
  errorMessage
}) => {
  return (
    <div className="browse-carpark-container">
      <div className="browse-carpark-header">
        {/* <p>*Press Enter to show all relevant carparks</p> */}
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for a carpark..."
        className="browse-carpark-input"
      />

      {errorMessage && (
        <div className="browse-carpark-error">
          {errorMessage}
        </div>
      )}

      {showTable && filteredOptions.length > 0 && (
        <>
          <div className="browse-carpark-note">
            {/* <p>! indicates low availability</p> */}
          </div>
          <table className="browse-carpark-table">
            <thead>
              <tr>
                <th>Carpark</th>
                <th>Available Lots</th>
                <th>Location</th>
                <th>Rate</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredOptions.map(option => (
                <tr key={option.value}>
                  <td>{option.label}</td>
                  <td>{option.availableLots}</td>
                  <td>{option.location}</td>
                  <td>{option.rates}</td>
                  <td>
                    <button className="select-button" onClick={() => handleChange(option)}>Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BrowseCarparkUI;