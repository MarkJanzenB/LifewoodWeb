import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to get the JWT token from storage
    const getToken = () => localStorage.getItem('authToken');

    // --- 1. REAL READ: Fetch all applications from the secure endpoint ---
    const fetchApplications = useCallback(async () => {
        setIsLoading(true);
        const token = getToken();

        // The protected route check remains, but now it's even more important
        if (!token) {
            navigate('/admin/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/admin/applications', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the JWT token in the header
                },
            });

            if (response.status === 401 || response.status === 403) {
                throw new Error('Unauthorized or session expired. Please log in again.');
            }
            if (!response.ok) {
                throw new Error('Failed to fetch application data.');
            }

            const data = await response.json();
            setApplications(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            // If the token is invalid, it's good practice to log the user out
            if (err.message.includes('Unauthorized')) {
                localStorage.removeItem('authToken');
                navigate('/admin/login');
            }
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    // --- 2. REAL DELETE: Handle deleting an application ---
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            const token = getToken();
            try {
                const response = await fetch(`http://localhost:8080/api/admin/applications/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete application.');
                }

                // On successful deletion, refetch the applications to update the UI
                fetchApplications();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    // Create and Edit still have alerts, as they require building modal UI components
    const handleCreate = () => {
        alert("This would open a 'Create New Application' form/modal.");
    };

    const handleEdit = (app) => {
        alert(`This would open an 'Edit' form/modal for ${app.firstName} ${app.lastName}.`);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/admin/login');
    };

    return (
        <div className="admin-container dashboard">
            <Helmet>
                <title>Admin Dashboard | Lifewood Data Technology</title>
            </Helmet>

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
                        <thead>
                        <tr><th>Name</th><th>Project Applied For</th><th>Email</th><th>Degree</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                        {applications.length > 0 ? (
                            applications.map(app => (
                                <tr key={app.id}>
                                    <td>{app.firstName} {app.lastName}</td>
                                    <td>{app.project}</td>
                                    <td>{app.email}</td>
                                    <td>{app.degree}</td>
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