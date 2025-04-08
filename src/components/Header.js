import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Русские приключения</h1>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/level">Уровень</Link>
      </nav>
    </header>
  );
}

export default Header;