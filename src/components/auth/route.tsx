import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = ({ isLoggedin = false }) => {
  return isLoggedin ? <Outlet /> : <Navigate to="/" replace />;
};

export const PublicRoute = ({ isLoggedin = false }) => {
  return isLoggedin ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
