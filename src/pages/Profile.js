// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

function Profile() {
    const { isAuthenticated, user} = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/user/${user.iduser}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                setProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ошибка при загрузке профиля');
                setLoading(false);
                console.error('Error fetching profile:', err);
            }
        };

        fetchUserProfile();
    }, [user.iduser, user.token]);

    if (!user) {
        return <div>Пожалуйста, войдите в систему</div>;
    }
    
    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">{error}</div>;

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return 'Дата не указана';
        const date = new Date(dateString);
        return date.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="profile-container">
            <h1 className='profile-title'>Профиль пользователя</h1>
            {profile && (
                <div className="profile-info">
                    <div className="profile-field">
                        <label>Имя пользователя:</label>
                        <span><strong>{profile.nickname}</strong></span>
                    </div>
                    <div className="profile-field">
                        <label>ID:</label>
                        <span><strong>{profile.iduser}</strong></span>
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        <span><strong>{profile.email}</strong></span>
                    </div>
                    <div className="profile-field">
                        <label>Дата регистрации:</label>
                        <span><strong>{formatDate(profile.created_at)}</strong></span>
                    </div>
                    <div className="profile-field">
                        <label>Количество очков:</label>
                        
                    </div>
                    <div className="profile-field">
                        <label>Пройдено уровней:</label>
                        
                    </div>
                </div>
            )}
            <h1 className='profile-title'>Достижения:</h1>
        </div>
    );
}

export default Profile;