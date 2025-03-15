import { useState } from 'react';
import './App.css';
import AdvancedSearch from './AdvancedSearch';
  
function NavigationMenu() {
    return (
    <div className="home-page">
      <nav className="navigation-row">
        <button>Search Booking</button>
        <button>Cancel Booking</button>
        <button>Check In</button>
        <button>Check Out</button>
      </nav>
    </div>
    );
    
}

export default NavigationMenu; 