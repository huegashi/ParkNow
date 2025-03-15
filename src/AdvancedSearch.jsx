import { useState } from "react";
import "./App.css";
import Select from "react-select";
import { useNavigate } from 'react-router-dom';

function AdvancedSearch() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    navigate(`/carpark/${selectedOption.value}`);
  };

  const options = [
    { value: 'carparkA', label: 'Carpark A' },
    { value: 'carparkB', label: 'Carpark B' },
    { value: 'carparkC', label: 'Carpark C' },
  ];

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
        options={options}
        onChange={handleChange}
        value={selectedOption}
        isLoading={false}
        components={{ Option: CustomOption }}
      />
    </div>
  );
}

export default AdvancedSearch;