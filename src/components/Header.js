import React, { useState } from 'react';
import logo from "./img/icons8-rus64.png";
import AuthModal from "./AuthModal";
import Register from './Register';

function Header() {
  const [authModalState, setAuthModalState] = useState({ open: false, formType: 'register' });

  const openAuth = (formType) => {
    setAuthModalState({ open: true, formType });
  };

  const closeAuth = () => {
    setAuthModalState({ open: false, formType: 'register' }); // Возвращаемся к форме регистрации по умолчанию
  };

  return (
    <header>
      <div className='ltext'>
        <img src={logo} alt='humorussia' className='logoheader'/>
        <h1 className='ltxt'>ЮМОРóссия!</h1>
      </div>
      <div className='headbuts'>
        <button className='reg' onClick={() => openAuth('register')}>Регистрация</button>
        <button className='enter' onClick={() => openAuth('login')}>Вход</button>
        
        <AuthModal open={authModalState.open} onClose={closeAuth}>
          <Register 
            formType={authModalState.formType} 
            onClose={closeAuth} 
            onSwitchForm={(type) => openAuth(type)} // Передаем функцию для переключения форм
          />
        </AuthModal>
      </div>
    </header>
  );
}

export default Header;