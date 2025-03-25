import React from 'react';

const BrowseCarparkUI = ({ searchTerm, handleInputChange, handleKeyPress, filteredOptions, handleChange, showTable }) => {
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
      {showTable && filteredOptions.length > 0 && (
        <>
          <div style={{ color: 'white', marginBottom: '5px', fontSize: '0.8em' }}>
            ! indicates low availability
          </div>
          <table className="filtered-options-table" style={{ margin: '0 auto', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ paddingRight: '40px' }}>Carpark</th>
                <th style={{ paddingRight: '40px' }}>Available Lots</th>
                <th style={{ paddingRight: '40px' }}>Location</th>
                <th style={{ paddingRight: '40px' }}>Rate</th>
                <th style={{ paddingRight: '40px' }}>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredOptions.map(option => {
                const isLowAvailability = (option.availableLots / option.totalLots) < 0.25;
                return (
                  <tr key={option.value}>
                    <td style={{ paddingRight: '40px' }}>{option.label}</td>
                    <td>
                      {option.availableLots}
                      {isLowAvailability && <span style={{ color: 'red', marginLeft: '5px' }}>!</span>}
                    </td>
                    <td style={{ paddingRight: '40px' }}>{option.location}</td>
                    <td style={{ paddingRight: '40px' }}>{option.rates}</td>
                    <td style={{ paddingRight: '40px' }}>
                      <button onClick={() => handleChange(option)}>Select</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BrowseCarparkUI;