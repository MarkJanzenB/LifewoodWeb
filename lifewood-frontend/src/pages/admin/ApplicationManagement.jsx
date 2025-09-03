import React, { useState, useEffect, useCallback } from 'react';
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';
import Modal from '../../components/Modal';
import '../../styles/pages/ApplicationManagement.css';

const ApplicationManagement = () => {
    useDocumentTitle('Lifewood Admin | Application Management');
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);

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
            await fetch(`${API_BASE_URL}/api/admin/applications/${appId}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus }),
            });
            fetchApplications();
            setSelectedApp(null);
        } catch (err) {
            alert(`Error updating status: ${err.message}`);
        }
    };

    const handleDelete = async (appId) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                const token = getToken();
                await fetch(`${API_BASE_URL}/api/admin/applications/${appId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                fetchApplications();
                setSelectedApp(null);
            } catch (err) {
                alert(`Error deleting application: ${err.message}`);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Application Submissions</h1>
                <button className="admin-button">+ Add Application</button>
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
                            <th>Status</th>
                            <th>Application Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.length > 0 ? applications.map(app => (
                            <tr key={app.id} onClick={() => setSelectedApp(app)} className="clickable-row">
                                <td>{`${app.firstName} ${app.lastName}`}</td>
                                <td>{app.project}</td>
                                <td>
                                        <span className={`status-badge ${app.status ? app.status.toLowerCase() : 'new'}`}>
                                            {app.status || 'New'}
                                        </span>
                                </td>
                                <td>{formatDate(app.createdAt)}</td>
                            </tr>
                        )) : (
                            <tr><td colSpan="4">No applications found.</td></tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}

            <Modal isOpen={!!selectedApp} onClose={() => setSelectedApp(null)}>
                {selectedApp && (
                    <div className="app-modal-content">
                        <div className="modal-header">
                            <h2>{selectedApp.firstName} {selectedApp.lastName}</h2>
                            <span className={`status-badge ${selectedApp.status ? selectedApp.status.toLowerCase() : 'new'}`}>
                                {selectedApp.status || 'New'}
                            </span>
                        </div>
                        <div className="modal-details">
                            <p><strong>Project:</strong> {selectedApp.project}</p>
                            <p><strong>Email:</strong> {selectedApp.email}</p>
                            <p><strong>Degree:</strong> {selectedApp.degree}</p>
                            <p><strong>Age:</strong> {selectedApp.age}</p>
                            <p><strong>Experience:</strong> {selectedApp.experience}</p>
                            <hr/>
                            <p><strong>Application Date:</strong> {formatDate(selectedApp.createdAt)}</p>
                            <p><strong>Last Updated:</strong> {formatDate(selectedApp.updatedAt)}</p>
                        </div>

                        {/* --- NEW, DE-CROWDED BUTTON LAYOUT --- */}
                        <div className="modal-actions-footer">
                            {/* Group 1: Primary Action */}
                            <a href={selectedApp.resumeFilename} target="_blank" rel="noopener noreferrer" className="action-button view-resume">
                                View Resume
                            </a>

                            {/* Group 2: Status Actions */}
                            <div className="status-actions">
                                <button className="action-button approve" onClick={() => handleStatusChange(selectedApp.id, 'Approved')}>Approve</button>
                                <button className="action-button reject" onClick={() => handleStatusChange(selectedApp.id, 'Rejected')}>Reject</button>
                            </div>

                            {/* Group 3: Destructive Action */}
                            <button className="action-button delete" onClick={() => handleDelete(selectedApp.id)}>Delete Application</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ApplicationManagement;