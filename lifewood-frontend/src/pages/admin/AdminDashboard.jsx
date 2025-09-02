import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';
import '../../styles/pages/Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // This is the new "protected route" check
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/profile`);
                if (!response.ok) {
                    // If we get a 401 or any other error, the user is not logged in.
                    navigate('/admin/login');
                } else {
                    // If the profile fetch is successful, fetch the application data.
                    fetchApplications();
                }
            } catch (err) {
                navigate('/admin/login');
            }
        };
        checkAuthStatus();
    }, [navigate]);

    // Fetch applications (now without any auth headers)
    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/applications`);
            if (!response.ok) throw new Error('Failed to fetch data.');
            const data = await response.json();
            setApplications(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/applications/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Failed to delete.');
                fetchApplications();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleLogout = async () => {
        await fetch(`${API_BASE_URL}/api/auth/logout`, { method: 'POST' });
        navigate('/admin/login');
    };

    const handleCreate = () => alert("This would open a 'Create New Application' form/modal.");
    const handleEdit = (app) => alert(`This would open an 'Edit' form/modal for ${app.firstName} ${app.lastName}.`);

    return (
        <div className="admin-container dashboard">
            {/* ... rest of JSX is unchanged ... */}
            <div className="dashboard-header">
                <h1>Application Dashboard</h1>
                <div>
                    <button className="admin-button" onClick={handleCreate}>+ Add New</button>
                    <button className="admin-button logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            {isLoading && <p>Loading applications...</p>}
            {error && <div className="error-message">Error: {error}</div>}
            {!isLoading && !error && (
                <div className="table-container">
                    <table>
                        <thead><tr><th>Name</th><th>Project Applied For</th><th>Email</th><th>Degree</th><th>Actions</th></tr></thead>
                        <tbody>
                        {applications.length > 0 ? (
                            applications.map(app => (
                                <tr key={app.id}>
                                    <td>{app.firstName} {app.lastName}</td><td>{app.project}</td><td>{app.email}</td><td>{app.degree}</td>
                                    <td className="actions-cell">
                                        <button className="admin-button edit" onClick={() => handleEdit(app)}>Edit</button>
                                        <button className="admin-button delete" onClick={() => handleDelete(app.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="5">No applications found.</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;