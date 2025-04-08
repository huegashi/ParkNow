import React, { createContext, useContext, useState } from "react";
import { Carpark } from "../models/Carpark"; // Import the Carpark class

// Create the context
const CarparkContext = createContext();

// Create the provider component
export const CarparkProvider = ({ children }) => {
  const [carparkInstance] = useState(new Carpark()); // Create a single instance of Carpark
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Add authentication state

  return (
    <CarparkContext.Provider value={{ carparkInstance, isAuthenticated, setIsAuthenticated }}>
      {children}
    </CarparkContext.Provider>
  );
};

// Custom hook to use the Carpark context
export const useCarpark = () => {
  return useContext(CarparkContext);
};