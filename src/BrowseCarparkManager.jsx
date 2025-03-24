import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import BrowseCarparkUI from './BrowseCarparkUI';

const BrowseCarparkManager = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate();

  const mockCarparks = {
    carparkA: {
      name: "Carpark A",
      availableLots: 15,
      totalLots: 100,
      location: "Main Street",
      rates: "$2.50/hr"
    },
    carparkB: {
      name: "Carpark B",
      availableLots: 42,
      totalLots: 150,
      location: "Downtown",
      rates: "$3.00/hr"
    },
    carparkC: {
      name: "Carpark C",
      availableLots: 78,
      totalLots: 200,
      location: "West District",
      rates: "$2.00/hr"
    }
  };

  const options = Object.keys(mockCarparks).map(key => ({
    value: key,
    label: mockCarparks[key].name,
    availableLots: mockCarparks[key].availableLots,
    totalLots: mockCarparks[key].totalLots,
    location: mockCarparks[key].location,
    rates: mockCarparks[key].rates
  }));

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