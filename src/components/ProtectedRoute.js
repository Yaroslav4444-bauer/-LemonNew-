// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    // Перенаправляем на главную страницу, если пользователь не авторизован
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;