// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(() => {
    // Проверяем localStorage при инициализации
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
});

  useEffect(() => {
    // Проверяем наличие токена при загрузке
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setUser({
        nickname: localStorage.getItem('nickname'),
        email: localStorage.getItem('email'),
        iduser: localStorage.getItem('iduser'),
        created_at: localStorage.getItem('created_at'),
        token: token
      });
    }
  }, []);

  const login = (token, nickname, email, iduser, created_at) => {
    localStorage.setItem('token', token);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('email', email);
    localStorage.setItem('iduser', iduser);
    localStorage.setItem('created_at', created_at);
    setIsAuthenticated(true);
    setUser({ nickname, token, email, iduser, created_at });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('email');
    localStorage.removeItem('iduser');
    localStorage.removeItem('created_at');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};