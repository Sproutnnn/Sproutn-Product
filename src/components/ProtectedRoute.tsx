import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: 'admin' | 'customer';
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roleRequired
}) => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (roleRequired && user?.role !== roleRequired) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;