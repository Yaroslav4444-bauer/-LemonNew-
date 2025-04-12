import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'boxicons';

function Register({ formType, onClose, onSwitchForm }) { // Принимаем props
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:5000/api/register', formData);
      alert('Регистрация успешна!');
      onClose(); // Закрываем модальное окно после регистрации
    } catch (error) {
      alert('Ошибка регистрации: ' + error.response?.data?.message);
    }
  };

  const [isOpen, setIsOpen ] = useState(false);
  
  const toggleForgetPassword = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='a-modal'>
      {/* Форма регистрации */}
      {formType === 'register' && (
        <div className='reg-modal'>
          <button className='auth-exit' onClick={onClose}>✕</button> {/* Кнопка закрытия */}
          <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='intro-auth'>Регистрация</h1>
            <div className='input-box'>
              <input
                type="text"
                placeholder="Погоняло"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              <box-icon type='solid' name='user'></box-icon>
            </div>
            <div className='input-box'>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <box-icon name='envelope' type='solid' ></box-icon>
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <box-icon type='solid' name='lock-alt'></box-icon>
            </div>
            <button className='auth-btn' type="submit">Зарегистрироваться</button>
            <p className='text-auth'>Регистрация через Google/VK:</p>
            <box-icon name='google' type='logo' ></box-icon>
            <box-icon name='vk' type='logo' ></box-icon>
            <p className='text-auth'>Уже есть аккаунт?</p>
            <button 
              className='auth-btn2' 
              onClick={() => onSwitchForm('login')} // Переключение на форму входа
            >
              Войти и играть!
            </button>
            </form>
        </div>
      )}

      {/* Форма входа */}
      {formType === 'login' && (
        <div className='login-modal'>
          <button className='auth-exit' onClick={onClose}>✕</button> {/* Кнопка закрытия */}
          <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='intro-auth'>Вход</h1>
            <div className='input-box'>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <box-icon name='envelope' type='solid' ></box-icon>
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <box-icon type='solid' name='lock-alt'></box-icon>
            </div>
            <li>
                <Link to="/forget-password" onClick={toggleForgetPassword}><strong>Забыли пароль?</strong></Link>
            </li>
            <button className='auth-btn' type="submit">Войти и играть!</button>
            <p className='text-auth'>Войти через Google/VK:</p>
            <box-icon name='google' type='logo' ></box-icon>
            <box-icon name='vk' type='logo' ></box-icon>
            <p className='text-auth'>Ещё нет аккаунта?</p>
            <button 
              className='auth-btn3' 
              onClick={() => onSwitchForm('register')} // Переключение на форму регистрации
            >
              Зарегистрируйся
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Register;