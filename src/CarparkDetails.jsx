import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

//need change this part to carpark details based on carpark entity
//make booking entity for our end, booking entity should contain a carpark
//make global mock dataset of carpark A,b,C etc.
//add colour for availbaility, red for low!
// 
//create alt. : select on current carpark bookings -> carpark check out/cancel booking page?
//how to record 30mins??
//

function CarparkDetails({ booking }) {
  const { carparkName } = useParams();

  useEffect(() => {
    // Debug logs
    console.log('CarparkDetails mounted');
    console.log('Carpark name from params:', carparkName);
    console.log('Booking prop:', booking);
  }, [booking, carparkName]);

  if (!booking) {
    console.log('No booking data available');
    return <p>No booking selected.</p>;
  }

  return (
    <div className="carpark-details">
      <h2>Carpark Booking Details</h2>
      <p><strong>Name:</strong> {booking.name}</p>
      <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
      <p><strong>Location:</strong> {booking.carpark}</p>
      {/*temporary random number generator for lot number*/}
      <p><strong>Lot Number:</strong> {Math.floor(Math.random() * 100) + 1}</p>
      <button onClick={() => console.log('Check In clicked for booking:', booking)}>
        Check In
      </button>
    </div>
  );
}

export default CarparkDetails;