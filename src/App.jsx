import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { CarparkProvider } from "./context/CarparkContext"; // Import the CarparkProvider
import Authenticator from "./controllers/Authenticator";
import Home from "./views/pages/Home";
import CarparkDetails from "./views/pages/CarparkDetails";
import CheckIn from "./controllers/CheckInController";
import CheckOut from "./controllers/CheckOutController";
import BrowseCarparkController from "./controllers/BrowseCarparkController";
import Booking from "./controllers/BookingController";
import CancelBooking from "./controllers/CancelBookingController";
import Register from "./controllers/Register";
import ProtectedRoute from "./views/components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <CarparkProvider>
      <Router>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Authenticator />} />
            <Route path="/login/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carpark/:carparkName"
              element={
                <ProtectedRoute>
                  <CarparkDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking/:carparkName"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cancelbooking/:bookingId"
              element={
                <ProtectedRoute>
                  <CancelBooking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkin/:bookingId"
              element={
                <ProtectedRoute>
                  <CheckIn />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/:bookingId"
              element={
                <ProtectedRoute>
                  <CheckOut />
                </ProtectedRoute>
              }
            />
            <Route
              path="/browse-carpark"
              element={
                <ProtectedRoute>
                  <BrowseCarparkController />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CarparkProvider>
  );
}

export default App;