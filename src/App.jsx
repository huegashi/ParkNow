import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Authenticator from "./controllers/Authenticator";
import Home from "./views/pages/Home";
import CarparkDetails from "./views/pages/CarparkDetails";
import CheckIn from "./controllers/CheckInController";
import CheckOut from "./controllers/CheckOutController";
import BrowseCarparkController from "./controllers/BrowseCarparkController"; // Import the new manager component
import Booking from "./controllers/BookingController";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Authenticator />} />
          <Route path="/home" element={<Home />} />
          <Route path="/carpark/:carparkName" element={<CarparkDetails />} />
          <Route path="/booking/:carparkName" element={<Booking />} />
          <Route path="/checkin/:bookingId" element={<CheckIn />} />
          <Route path="/checkout/:bookingId" element={<CheckOut />} />
          <Route
            path="/browse-carpark"
            element={<BrowseCarparkController />}
          />{" "}
          {/* Add the new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
