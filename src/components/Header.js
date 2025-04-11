import React from 'react';
import logo from "./img/icons8-rus64.png"

function Header() {
  return (
    <header>
      <div className='ltext'>
        <img src={logo} alt='humorussia' className='logoheader'/>
        <h1 className='ltxt'>ЮМОРóссия!</h1>
      </div>
      <div className='headbuts'>
        <button className='enter'>Вход</button>
        <button className='reg'>Регистрация</button>
      </div>
    </header>
  );
}

export default Header;