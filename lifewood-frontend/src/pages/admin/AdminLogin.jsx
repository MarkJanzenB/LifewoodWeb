import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '../../components/Button';
import API_BASE_URL from '../../apiConfig'; // <-- IMPORT THE CONFIG
import '../../styles/pages/Admin.css';

const AdminLogin = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const endpoint = isLoginView ? '/api/auth/login' : '/api/auth/register';
        const payload = { username, password };

        try {
            // --- USE THE LIVE URL FROM THE CONFIG FILE ---
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'An error occurred.');
            }

            if (isLoginView) {
                const data = await response.json();
                if (data.jwt) {
                    localStorage.setItem('authToken', data.jwt);
                    navigate('/admin/dashboard');
                } else {
                    throw new Error('Login successful, but no token was received.');
                }
            } else {
                setSuccess('Registration successful! Please log in.');
                setIsLoginView(true);
                setUsername('');
                setPassword('');
            }

        } catch (err) {
            setError(err.message);
        }
    };

    // ... (rest of the component is unchanged) ...
    return (
        <div className="admin-container">
            <Helmet><title>Admin Portal | Lifewood Data Technology</title></Helmet>
            <div className="admin-box">
                <h2>{isLoginView ? 'Admin Login' : 'Admin Registration'}</h2>
                <form onSubmit={handleSubmit}>
                    {/* ... form inputs ... */}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="error-message form-error">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                    <Button type="submit">{isLoginView ? 'Login' : 'Register'}</Button>
                </form>
                <p className="toggle-view">
                    {isLoginView ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(''); setSuccess(''); }}>
                        {isLoginView ? 'Register here' : 'Login here'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;