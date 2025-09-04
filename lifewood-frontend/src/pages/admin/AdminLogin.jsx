import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import Button from '../../components/Button';
import API_BASE_URL from '../../apiConfig';
import '../../styles/pages/Admin.css';

const AdminLogin = () => {
    useDocumentTitle('Lifewood Admin |Admin Portal');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                throw new Error('Failed to parse response as JSON');
            }

            if (!response.ok) {
                // If the response is not OK, the JSON body contains the error message
                throw new Error(data.error || 'An error occurred.');
            }

            // If the response IS OK, proceed with login
            localStorage.setItem('authToken', data.jwt);

            if (data.passwordChangeRequired) {
                navigate('/admin/force-reset');
            } else {
                navigate('/admin/dashboard');
            }
        } catch (err) {
            // This will now correctly display errors like "Incorrect username or password"
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-box">
                <h2>Admin Login</h2>
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
                    <Button type="submit">Login</Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
