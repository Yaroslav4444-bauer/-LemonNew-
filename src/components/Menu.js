import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Menu() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen ] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [contentType, setContentType] = useState(null);

  const IsActive = true

  function handleClick(type) {
    setContentType(type);
  };

  return (
    <nav className="menu">
      {/* Кнопка для мобильного меню */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Список меню */}
      {isAuthenticated ? (
        <>
          <ul className={`menu-list ${isOpen ? 'active' : ''}`}>
            <li>
              <Link to="/"  onClick={toggleMenu}>Главная</Link>
            </li>
            <li>
              <Link to="/levels" onClick={toggleMenu}>Уровни</Link>
            </li>
            <li>
              <Link to="/profile" onClick={toggleMenu}>Профиль</Link>
            </li>
            <li>
              <Link to="/rating" onClick={toggleMenu}>Рейтинг</Link>
            </li>
            <li>
              <Link to="/chats" onClick={toggleMenu}>Чаты</Link>
            </li>
            <li>
              <Link to="/notifications" onClick={toggleMenu}>Уведомления</Link>
            </li>
            <li>
              <Link to="/connaction-with-us" onClick={toggleMenu}>Связь с нами</Link>
            </li>
          </ul>
        </>
      ) : (
        <>
          <ul className={`menu-list ${isOpen ? 'active' : ''}`}>
            <li>
              <Link to="/"  onClick={toggleMenu}>Главная</Link>
            </li>
            <li>
              <Link to="/levels" onClick={toggleMenu}>Уровни</Link>
            </li>
            <li>
              <Link to="/rating" onClick={toggleMenu}>Рейтинг</Link>
            </li>
            <li>
              <Link to="/connaction-with-us" onClick={toggleMenu}>Связь с нами</Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}

export default Menu;