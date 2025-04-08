import React from "react";
import { Navigate } from "react-router-dom";
import { useCarpark } from "../../context/CarparkContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useCarpark();

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children (protected route)
  return children;
};

export default ProtectedRoute;