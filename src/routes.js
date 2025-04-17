// src/routes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Level from './pages/Level';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Menu from './components/Menu';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = ({ isAuthenticated }) => {
  return (
    <>
      <Header />
      <Menu />
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Level />} />

        {/* Защищенные маршруты */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />

         

        {/* Перенаправление неизвестных маршрутов на главную */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;