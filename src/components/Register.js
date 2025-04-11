import React, { useState } from 'react';
// import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('http://localhost:5000/api/register', formData);
            alert('Регистрация успешна!');
        } catch (error) {
            alert('Ошибка регистрации: ' + error.response.data.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default Register;