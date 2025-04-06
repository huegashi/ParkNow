import React from 'react';

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
    <div className="browse-carpark" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ color: 'white', marginBottom: '5px', fontSize: '0.8em' }}>
        *Press Enter to show all relevant carparks
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for a carpark..."
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}

      {showTable && filteredOptions.length > 0 && (
        <>
          <div style={{ color: 'white', marginBottom: '5px', fontSize: '0.8em' }}>
            ! indicates low availability
          </div>
          <table className="filtered-options-table" style={{ margin: '0 auto', textAlign: 'left' }}>
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
                    <button onClick={() => handleChange(option)}>Select</button>
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
