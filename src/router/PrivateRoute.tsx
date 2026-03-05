import { Outlet, Navigate } from 'react-router-dom';

export function PrivateRoute() {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
