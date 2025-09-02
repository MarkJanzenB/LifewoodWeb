import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import Button from '../../components/Button';
import API_BASE_URL from '../../apiConfig';
import '../../styles/pages/Admin.css';

const AdminLogin = () => {
    useDocumentTitle('Admin Portal | Lifewood Data Technology');

    // State is now simpler: no need for isLoginView or success
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // The endpoint is now hardcoded to the login route
        const endpoint = '/api/auth/login';
        const payload = { username, password };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch (jsonError) {
                    const errorText = await response.text();
                    throw new Error(errorText || 'An unknown server error occurred.');
                }
                throw new Error(errorData.error || errorData.message || 'An error occurred.');
            }

            // The logic for handling the response is now only for login
            const data = await response.json();
            if (data.jwt) {
                localStorage.setItem('authToken', data.jwt);
                if (data.passwordChangeRequired) {
                    navigate('/admin/force-reset');
                } else {
                    navigate('/admin/dashboard');
                }
            } else {
                throw new Error('Login successful, but no token was received.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-box">
                {/* The h2 is now static */}
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message form-error">{error}</p>}
                    {/* The success message is no longer needed */}
                    <Button type="submit">Login</Button>
                </form>
                {/* The toggle view paragraph has been completely removed */}
            </div>
        </div>
    );
};

export default AdminLogin;