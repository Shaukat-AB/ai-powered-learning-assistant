import { useAuth } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router';

export const ProtectedRoute = () => {
  const isLoggedin = !!useAuth().user;

  return isLoggedin ? <Outlet /> : <Navigate to="/" replace />;
};

export const PublicRoute = () => {
  const isLoggedin = !!useAuth().user;

  return isLoggedin ? <Navigate to="/dashboard" replace /> : <Outlet />;
};
