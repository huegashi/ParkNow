import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BrowseCarparkUI from './BrowseCarparkUI';

const BrowseCarparkManager = () => {
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