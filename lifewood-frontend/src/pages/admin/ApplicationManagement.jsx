import React, { useState, useEffect, useCallback } from 'react';
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';

// This is essentially the old AdminDashboard.jsx, now focused on applications
const ApplicationManagement = () => {
    useDocumentTitle('Application Management | Lifewood Data Technology');
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApplications = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/applications`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error('Failed to fetch applications.');
            const data = await response.json();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    // ... (handleDelete, etc. for applications)

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Application Submissions</h1>
            </div>
            {isLoading && <p>Loading applications...</p>}
            {error && <p className="error-message">{error}</p>}
            {/* Table of applications goes here */}
        </div>
    );
};

export default ApplicationManagement;