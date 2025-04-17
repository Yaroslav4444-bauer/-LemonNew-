// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  // Проверяем наличие токена для определения статуса аутентификации
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <AppRoutes isAuthenticated={isAuthenticated} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;