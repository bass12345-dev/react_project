// src/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Is_LoggedIn = (isAuthenticated  :any) => {

  if (isAuthenticated.isAuthenticated) {
    return <Navigate to="/debt" replace />;
  }

  return <Outlet />;
};

export default Is_LoggedIn;