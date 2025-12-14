import React from "react";
import { Navigate } from "react-router-dom";

// Check if user is logged in using localStorage token
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // User not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  // User logged in, show page
  return children;
};

export default ProtectedRoute;
