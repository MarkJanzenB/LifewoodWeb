import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import Button from '../../components/Button';
import API_BASE_URL from '../../apiConfig';
import '../../styles/pages/Admin.css';

const AdminLogin = () => {
    useDocumentTitle('Admin Portal | Lifewood Data Technology');
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
                // If login is successful (200 OK), just navigate to the dashboard.
                // The browser has automatically received and stored the session cookie.
                navigate('/admin/dashboard');
            } else {
                setSuccess('Registration successful! Please log in.');
                setIsLoginView(true);
                setUsername('');
                setPassword('');
            }
        } catch (err) {
            setError(err.message || "Incorrect username or password.");
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-box">
                <h2>{isLoginView ? 'Admin Login' : 'Admin Registration'}</h2>
                <form onSubmit={handleSubmit}>
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