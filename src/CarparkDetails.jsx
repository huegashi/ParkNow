import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from './NavigationMenu';


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


function CarparkDetails() {
  const { carparkName } = useParams();
  const [carparkData, setCarparkData] = useState(null);

  useEffect(() => {
    // Get data from mock dataset based on URL parameter
    const data = mockCarparks[carparkName];
    setCarparkData(data);
    
    console.log('Loaded data for:', carparkName);
  }, [carparkName]);

  if (!carparkData) {
    return <p>Loading carpark details...</p>;
  }

  const capacityPercentage = Math.floor(
    (carparkData.availableLots / carparkData.totalLots) * 100
  );
  console.log(capacityPercentage);

  const availabilityColor = carparkData.availableLots < 20 
    ? 'red' 
    : carparkData.availableLots < 50 
    ? 'orange' 
    : 'green';

  return (
    <div className="carpark-details">
      <NavigationMenu/>
      <h2>{carparkData.name} Details</h2>
      
      {/* Flex container for details and notification */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        {/* Left side - Carpark details */}
        <div style={{ flex: '1' }}>
          <p><strong>Location:</strong> {carparkData.location}</p>
          <p style={{ color: availabilityColor }}>
            <strong>Available Lots:</strong> {carparkData.availableLots}/{carparkData.totalLots}
          </p>
          <p><strong>Hourly Rate:</strong> {carparkData.rates}</p>
        </div>
        
        {/* Right side - Notification box */}
        <div style={{ 
          flex: '1',
          border: '2px solid #000',
          borderRadius: '5px',
          padding: '10px',
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <p style={{ 
            textAlign: 'center', 
            margin: '0' 
          }}>
            Upon check-in, a 30-minute allowance will be given for you to arrive at the reserved lot, after which the lot will be released for others to reserve.
          </p>
          <p style={{ 
            textAlign: 'center', 
            margin: '10px 0 0 0',
            fontWeight: 'bold' 
          }}>
            Please click on the "Book Now" button below to reserve your slot.
          </p>
        </div>
      </div>

      {/* Capacity Bar - Kept at the bottom */}
      <div style={{ marginTop: '20px' }}>
        <h3>Current Capacity</h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '5px',
          overflow: 'hidden',
          backgroundColor: '#e0e0e0',
          height: '30px',
          width: '100%',
        }}>
          {/* Filled portion */}
          <div style={{
            width: `${capacityPercentage}%`,
            backgroundColor: capacityPercentage > 30 ? '#f5a623' : '#7ed321',
            height: '100%',
            textAlign: 'center',
            color: '#fff',
            fontWeight: 'bold',
            lineHeight: '30px',
          }}>
            {capacityPercentage}%
          </div>
          {/* Remaining portion */}
          <div style={{
            width: `${100 - capacityPercentage}%`,
            backgroundColor: '#808080',
            height: '100%',
          }}></div>
        </div>
      </div>

      <button
        style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#007bff', 
          color: '#fff', 
          borderRadius: '5px', 
          borderColor: '#007bff', 
          cursor: 'pointer',
          width: '10%' 
        }}
        onClick={() => console.log('Initiate booking for:', carparkName)}
      >
        Book Now
      </button>
    </div>
  );
}

export default CarparkDetails;