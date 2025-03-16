import { useState, useEffect } from "react";
import "./App.css";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';

function AdvancedSearch() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const navigate = useNavigate();

  const options = [
    { value: 'carparkA', label: 'Carpark A' },
    { value: 'carparkB', label: 'Carpark B' },
    { value: 'carparkC', label: 'Carpark C' },
  ];

  // Update filtered options when input value changes
  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter(option => 
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    navigate(`/carpark/${selectedOption.value}`);
  };

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
    return newValue;
  };

  const CustomOption = (props) => {
    return (
      <button
        style={{
          backgroundColor: 'white',
          border: 'none',
          padding: '8px',
          textAlign: 'left',
          width: '100%',
          cursor: 'pointer',
          color: 'black',
        }}
        onClick={() => props.selectOption(props.data)}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = 'lightgrey';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'white';
        }}
      >
        {props.label}
      </button>
    );
  };

  return (
    <div className="advanced-search" style={{ maxWidth: '200px' }}>
      <Select
        options={filteredOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={inputValue}
        value={selectedOption}
        isLoading={false}
        components={{ Option: CustomOption }}
        filterOption={null} // Disable the default filtering
        isSearchable={true} // Enable search input
        placeholder="Search carparks..."
      />
    </div>
  );
}

export default AdvancedSearch;
