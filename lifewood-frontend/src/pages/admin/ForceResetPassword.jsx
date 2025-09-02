import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import Button from '../../components/Button';
import API_BASE_URL from '../../apiConfig';
import '../../styles/pages/Admin.css';

const ForceResetPassword = () => {
    useDocumentTitle('Reset Password | Lifewood Data Technology');
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Protect this route: if there's no token, you can't be here.
        if (!localStorage.getItem('authToken')) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 4) {
            setError('Password must be at least 4 characters long.');
            return;
        }

        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/api/auth/force-reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ newPassword }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to reset password.');
            }

            // Password reset was successful, proceed to the dashboard.
            navigate('/admin/dashboard');

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-box">
                <h2>Reset Your Password</h2>
                <p>As a new or temporary user, you must set a new password to continue.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    {error && <p className="error-message form-error">{error}</p>}
                    <Button type="submit">Set Password and Login</Button>
                </form>
            </div>
        </div>
    );
};

export default ForceResetPassword;