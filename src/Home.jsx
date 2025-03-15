import { useState } from 'react';
import './App.css';
import AdvancedSearch from './AdvancedSearch';
import NavigationMenu from './NavigationMenu';


function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState(() => {
    // Retrieve bookings from local storage or set initial state
    const savedBookings = localStorage.getItem('bookings');
    return savedBookings ? JSON.parse(savedBookings) : [
      { id: 1, name: 'Booking 1', carpark: 'Carpark A', slotsAvailable: 10, slotsReserved: 5 },
      { id: 2, name: 'Booking 2', carpark: 'Carpark B', slotsAvailable: 8, slotsReserved: 3 },
      { id: 3, name: 'Booking 3', carpark: 'Carpark C', slotsAvailable: 15, slotsReserved: 7 },
    ];
  });

  const handleSearchSelect = (carpark) => {
    setSearchTerm(carpark ? carpark.label : '');
    const booking = bookings.find((b) => b.carpark === carpark.label);
    setSelectedBooking(booking || null);
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.carpark.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavigationMenu />
      <AdvancedSearch onSearchSelect={handleSearchSelect} />
      <div className="bookings-list">
        <h2>Current Carpark Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Slots Available</th>
              <th>Slots Reserved</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.name}</td>
                <td>{booking.carpark}</td>
                <td>{booking.slotsAvailable}</td>
                <td>{booking.slotsReserved}</td>
                <td><button>Select</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;