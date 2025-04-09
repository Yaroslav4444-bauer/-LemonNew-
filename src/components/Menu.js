import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="menu">
      {/* Кнопка для мобильного меню */}
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      {/* Список меню */}
      <ul className={`menu-list ${isOpen ? 'active' : ''}`}>
        <li>
          <Link to="/" onClick={toggleMenu}>Главная</Link>
        </li>
        <li>
          <Link to="/levels" onClick={toggleMenu}>Начать игру</Link>
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
    </nav>
  );
}

export default Menu;