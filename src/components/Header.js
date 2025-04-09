import React from 'react';
import Menu from './Menu';

function Header() {
  return (
    <header>
      <h1>ЮМОРóссия!</h1>
      <div className='headbuts'>
        <button className='enter'>Вход</button>
        <button className='reg'>Регистрация</button>
      </div>
    </header>
  );
}

export default Header;