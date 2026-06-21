import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { adminRoutes, managerRoutes, receptionistRoutes, customerRoutes } from './roleRoutes';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import CustomerLayout from '../layouts/CustomerLayout';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  const { user, isAuthenticated } = useAuth();

  // Helper to get routes based on role
  const getRoleRoutes = () => {
    if (!user) return [];
    switch (user.role) {
      case 'admin': return adminRoutes;
      case 'manager': return managerRoutes;
      case 'receptionist': return receptionistRoutes;
      case 'customer': return customerRoutes;
      default: return [];
    }
  };

  const roleRoutes = getRoleRoutes();

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route 
        element={
          <ProtectedRoute>
            {user?.role === 'customer' ? <CustomerLayout /> : <MainLayout />}
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Render role-specific routes dynamically */}
        {roleRoutes.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={<route.element />} 
          />
        ))}

        {/* Catch-all route to redirect unknown paths back to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
