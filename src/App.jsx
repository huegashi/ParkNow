import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Authenticator from './controllers/Authenticator';
import Home from './views/pages/Home';
import CarparkDetails from './views/pages/CarparkDetails';
import CheckIn from './views/pages/CheckIn';
import CheckOut from './views/pages/CheckOut';
import BrowseCarparkManager from './controllers/BrowseCarparkManager'; // Import the new manager component
import Booking from './views/pages/Booking';


function App() {
  return (
    <Router>
      <div className="app-background">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Authenticator />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carpark/:carparkName" element={<CarparkDetails />} />
          <Route path="/booking/:carparkName" element={<Booking />} />
          <Route path="/checkin/:bookingId" element={<CheckIn />} />
          <Route path="/checkout/:bookingId" element={<CheckOut />} />
          <Route path="/browse-carpark" element={<BrowseCarparkManager />} /> {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
