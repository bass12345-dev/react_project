// src/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Not_LoggedIn = (isAuthenticated  :any) => {

  if (!isAuthenticated.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default Not_LoggedIn;