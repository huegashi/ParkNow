import { useState } from "react";
import "./App.css";
import { useNavigate } from 'react-router-dom';

function AdvancedSearch() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();

  const options = [
    { value: 'carparkA', label: 'Carpark A' },
    { value: 'carparkB', label: 'Carpark B' },
    { value: 'carparkC', label: 'Carpark C' },
  ];

  const handleChange = (option) => {
    setSelectedOption(option);
    navigate(`/carpark/${option.value}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowTable(true);
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="advanced-search" style={{ maxWidth: '400px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for a carpark..."
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />
      {showTable && filteredOptions.length > 0 && (
        <table className="filtered-options-table">
          <thead>
            <tr>
              <th>Carpark</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredOptions.map(option => (
              <tr key={option.value}>
                <td>{option.label}</td>
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
}

export default AdvancedSearch;