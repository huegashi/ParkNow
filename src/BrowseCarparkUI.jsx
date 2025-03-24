import React from "react";

const BrowseCarparkUI = ({
  searchTerm,
  handleInputChange,
  handleKeyPress,
  filteredOptions,
  handleChange,
  showTable,
}) => {
  return (
    <div
      className="browse-carpark"
      style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}
    >
      <div style={{ color: "white", marginBottom: "5px", fontSize: "0.8em" }}>
        *Press Enter to show all relevant carparks
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for a carpark..."
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          backgroundColor: "white",
        }}
      />
      {showTable && filteredOptions.length > 0 && (
        <table
          className="filtered-options-table"
          style={{ margin: "0 auto", backgroundColor: "white" }}
        >
          <thead>
            <tr>
              <th style={{ paddingRight: "20px" }}>Carpark</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredOptions.map((option) => (
              <tr key={option.value}>
                <td style={{ paddingRight: "20px" }}>{option.label}</td>
                <td>
                  <button onClick={() => handleChange(option)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BrowseCarparkUI;
