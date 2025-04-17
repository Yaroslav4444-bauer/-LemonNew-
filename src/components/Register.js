import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import 'boxicons';
import axios from 'axios';

function Register({ formType, onClose, onSwitchForm }) {
  const [formData, setFormData] = useState({ 
    nickname: '', 
    email: '', 
    password: '' 
  });

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        // Вход
        const response = await axios.post('http://localhost:8000/token', 
          new URLSearchParams({
            username: formData.email, // FastAPI ожидает username
            password: formData.password
          }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        
        // Сохраняем токен
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('nickname', response.data.nickname);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('iduser', response.data.iduser);
        localStorage.setItem('created_at', response.data.created_at);
        navigate('/profile');
        alert('Успешный вход!');
        onClose();
      } else {
        // Регистрация
        const response = await axios.post('http://localhost:8000/register', {
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname
        });
        
        alert(`Регистрация успешна! Добро пожаловать, ${response.data.nickname}!`);
        setIsLogin(true); // Переключаемся на форму входа
      }
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Произошла ошибка';
      setError(errorMessage);
      alert(errorMessage);
      setIsLogin(false);
    }
  };

  const [isOpen, setIsOpen ] = useState(false);
  
  const [hasError, setHasError] = useState({
    nickname: false,
    email: false,
    password: false
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    setHasError({
      ...hasError,
      [field]: value.trim().length === 0
    });
  };

  const toggleForgetPassword = () => {
    setIsOpen(!isOpen);
  };

  const changeForm = () => {
    setIsLogin(!isLogin);
  }

  return (
    <div className='a-modal'>
      {/* Форма регистрации */}
      {formType === 'register' && (
        <div className='reg-modal'>
          <button className='auth-exit' onClick={onClose}>✕</button>
          <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='intro-auth'>Регистрация</h1>
            <div className='input-box'>
              <input
                type="text"
                placeholder="Погоняло"
                value={formData.nickname}
                style={{
                  backgroundColor: hasError.nickname ? '#ffcbcb' : null,
                }}
                onChange={(e) => handleInputChange('nickname', e.target.value)}
              />
              <box-icon className='icons-auth' type='solid' name='user'></box-icon>
            </div>
            <div className='input-box'>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                style={{
                  backgroundColor: hasError.email ? '#ffcbcb' : null,
                }}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <box-icon className='icons-auth' name='envelope' type='solid' ></box-icon>
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder="Пароль"
                value={formData.password}
                style={{
                  backgroundColor: hasError.password ? '#ffcbcb' : null,
                }}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              <box-icon className='icons-auth' type='solid' name='lock-alt'></box-icon>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button 
              className='auth-btn' 
              type="submit"
              disabled={Object.values(hasError).some(Boolean) || 
                       Object.values(formData).some(value => !value.trim())}
            >
              Зарегистрироваться
            </button>
            <p className='text-auth'>Регистрация через Google/VK:</p>
            <Link to="#" className='social-link'><box-icon name='google' type='logo' ></box-icon></Link>
            <Link to="#" className='social-link'><box-icon name='vk' type='logo' ></box-icon></Link>
            <p className='text-auth'>Уже есть аккаунт?</p>
            <button 
              className='auth-btn2' 
              onClick={() => onSwitchForm('login') && {changeForm}}
            >
              Войти и играть!
            </button>
          </form>
        </div>
      )}

      {/* Форма входа */}
      {formType === 'login' && (
        <div className='login-modal'>
          <button className='auth-exit' onClick={onClose}>✕</button>
          <form className='auth-form' onSubmit={handleSubmit}>
            <h1 className='intro-auth'>Вход</h1>
            <div className='input-box'>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                style={{
                  backgroundColor: hasError.email ? '#ffcbcb' : null,
                }}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
              <box-icon className='icons-auth' name='envelope' type='solid' ></box-icon>
            </div>
            <div className='input-box'>
              <input
                type="password"
                placeholder="Пароль"
                value={formData.password}
                style={{
                  backgroundColor: hasError.password ? '#ffcbcb' : null,
                }}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              <box-icon className='icons-auth' type='solid' name='lock-alt'></box-icon>
            </div>
            {error && <p className="error-message">{error}</p>}
            <li>
              <Link to="/forget-password" onClick={toggleForgetPassword}>
                <strong>Забыли пароль?</strong>
              </Link>
            </li>
            <button 
              className='auth-btn' 
              type="submit" 
              onClick={changeForm}
              disabled={hasError.email || hasError.password || 
                       !formData.email.trim() || !formData.password.trim()}
            >
              Войти и играть!
            </button>
            <p className='text-auth'>Войти через Google/VK:</p>
            <Link to="#" className='social-link'><box-icon name='google' type='logo' ></box-icon></Link>
            <Link to="#" className='social-link'><box-icon name='vk' type='logo' ></box-icon></Link>
            <p className='text-auth'>Ещё нет аккаунта?</p>
            <button 
              className='auth-btn3' 
              onClick={() => onSwitchForm('register')}
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