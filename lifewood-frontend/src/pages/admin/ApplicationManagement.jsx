import React, { useState, useEffect, useCallback } from 'react';
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';
import Modal from '../../components/Modal'; // Assuming Modal component exists
import '../../styles/pages/ApplicationManagement.css'; // Assuming this CSS exists

const ApplicationManagement = () => {
    useDocumentTitle('Application Management | Lifewood Data Technology');
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null); // For viewing/editing in a modal
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const getToken = () => localStorage.getItem('authToken');

    const fetchApplications = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = getToken();
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

    const handleStatusChange = async (appId, newStatus) => {
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/api/admin/applications/${appId}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!response.ok) throw new Error("Failed to update status.");
            fetchApplications(); // Refresh list
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async (appId) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                const token = getToken();
                const response = await fetch(`${API_BASE_URL}/api/admin/applications/${appId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                if (!response.ok) throw new Error("Failed to delete application.");
                fetchApplications(); // Refresh list
            } catch (err) {
                alert(err.message);
            }
        }
    };

    // Placeholder for handling creation from a modal
    const handleCreateApplication = () => {
        // This would involve a modal with a form similar to ApplicationForm.jsx
        // The submit handler would POST to /api/admin/applications (without a file)
        setIsCreateModalOpen(true);
        alert("This will open a modal to add a new application manually.");
    };

    // Placeholder for opening an edit modal
    const handleEditApplication = (app) => {
        setSelectedApp(app);
        alert("This will open a modal to edit the selected application.");
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Application Submissions</h1>
                <button className="admin-button" onClick={handleCreateApplication}>+ Add Application</button>
            </div>

            {isLoading && <p>Loading applications...</p>}
            {error && <p className="error-message">{error}</p>}

            {!isLoading && !error && (
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Project</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Resume</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.length > 0 ? applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.firstName} {app.lastName}</td>
                                <td>{app.project}</td>
                                <td>{app.email}</td>
                                <td>
                                        <span className={`status-badge ${app.status.toLowerCase()}`}>
                                            {app.status}
                                        </span>
                                </td>
                                <td>
                                    {app.resumeFilename ? (
                                        <a
                                            href={`${API_BASE_URL}/uploads/${app.resumeFilename}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="resume-link"
                                        >
                                            View
                                        </a>
                                    ) : "N/A"}
                                </td>
                                <td className="actions-cell">
                                    <div className="dropdown">
                                        <button className="dropbtn">Actions</button>
                                        <div className="dropdown-content">
                                            <a href="#" onClick={() => handleStatusChange(app.id, 'Approved')}>Approve</a>
                                            <a href="#" onClick={() => handleStatusChange(app.id, 'Rejected')}>Reject</a>
                                            <a href="#" onClick={() => handleEditApplication(app)}>Edit</a>
                                            <a href="#" onClick={() => handleDelete(app.id)}>Delete</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="6">No applications found.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* You would have modals here for creating/editing applications */}
        </div>
    );
};

export default ApplicationManagement;