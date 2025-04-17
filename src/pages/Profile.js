// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
    const { isAuthenticated, user} = useAuth();
    

    if (!user) {
        return <p>Загрузка...</p>;
    }

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <p>ID: {user.iduser}</p>
            <p>Email: {user.email}</p>
            <p>Имя пользователя: {user.nickname}</p>
            <p>Дата регистрации: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
    );
}

export default Profile;