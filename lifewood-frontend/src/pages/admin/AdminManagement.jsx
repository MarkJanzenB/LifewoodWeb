import React, { useState, useEffect, useCallback } from 'react';
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { useAlert } from '../../context/AlertProvider';
import '../../styles/pages/ApplicationManagement.css';

const ApplicationManagement = () => {
    useDocumentTitle('Application Management | Lifewood Data Technology');
    const { showAlert, showConfirm } = useAlert();

    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);

    const [activeTab, setActiveTab] = useState('New'); // Default to "New"

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newAppData, setNewAppData] = useState({
        firstName: '', lastName: '', age: '', degree: '',
        experience: '', email: '', project: '', status: 'New', resumeLink: ''
    });
    const [modalMessage, setModalMessage] = useState({ type: '', text: '' });

    const getToken = () => localStorage.getItem('authToken');

    const fetchApplications = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/api/admin/applications/status/${activeTab}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(`Failed to fetch ${activeTab} applications.`);
            const data = await response.json();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        setModalMessage({ type: '', text: '' });
        try {
            const token = getToken();
            const response = await fetch(`${API_BASE_URL}/api/admin/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newAppData),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to create application.');
            }
            setModalMessage({ type: 'success', text: 'Application created successfully!' });
            fetchApplications();
            setTimeout(() => {
                setIsCreateModalOpen(false);
                setModalMessage({ type: '', text: '' });
                setNewAppData({ firstName: '', lastName: '', age: '', degree: '', experience: '', email: '', project: '', status: 'New', resumeLink: '' });
            }, 1500);
        } catch (err) {
            setModalMessage({ type: 'error', text: err.message });
        }
    };

    const handleNewAppChange = (e) => {
        setNewAppData({ ...newAppData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = async (appId, newStatus) => {
        try {
            const token = getToken();
            await fetch(`${API_BASE_URL}/api/admin/applications/${appId}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus }),
            });
            showAlert(`Application successfully marked as ${newStatus}.`, 'Status Updated');
            fetchApplications();
            setSelectedApp(null);
        } catch (err) {
            showAlert(err.message, 'Update Failed');
        }
    };

    const handleDelete = async (appId) => {
        const confirmed = await showConfirm(
            'This action cannot be undone. Are you sure you want to permanently delete this application?',
            'Confirm Deletion', 'Delete', 'Cancel'
        );
        if (confirmed) {
            try {
                const token = getToken();
                await fetch(`${API_BASE_URL}/api/admin/applications/${appId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                showAlert('The application has been deleted successfully.', 'Success');
                fetchApplications();
                setSelectedApp(null);
            } catch (err) {
                showAlert(err.message, 'Deletion Failed');
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    const handleViewResume = (appId) => {
        window.open(`${API_BASE_URL}/api/admin/applications/${appId}/resume`, '_blank');
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Application Submissions</h1>
                <button className="admin-button" onClick={() => setIsCreateModalOpen(true)}>+ Add Application</button>
            </div>

            <div className="tabs-container">
                <button
                    className={`tab-button ${activeTab === 'New' ? 'active' : ''}`}
                    onClick={() => setActiveTab('New')}
                >
                    New Applications
                </button>
                <button
                    className={`tab-button ${activeTab === 'Approved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Approved')}
                >
                    Approved
                </button>
                <button
                    className={`tab-button ${activeTab === 'Rejected' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Rejected')}
                >
                    Rejected
                </button>
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
                            <tr><td colSpan="4">No applications found in this category.</td></tr>
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
                        <div className="modal-actions-footer">
                            <button
                                className="action-button view-resume"
                                onClick={() => handleViewResume(selectedApp.id)}
                                disabled={!selectedApp.resumeData}
                            >
                                View Resume
                            </button>
                            <div className="status-actions">
                                {/* Only show relevant buttons based on the current status */}
                                {selectedApp.status === 'New' && (
                                    <>
                                        <button className="action-button approve" onClick={() => handleStatusChange(selectedApp.id, 'Approved')}>Approve</button>
                                        <button className="action-button reject" onClick={() => handleStatusChange(selectedApp.id, 'Rejected')}>Reject</button>
                                    </>
                                )}
                            </div>
                            <button className="action-button delete" onClick={() => handleDelete(selectedApp.id)}>Delete Application</button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <div className="app-modal-content">
                    <div className="modal-header">
                        <h2>Add New Application</h2>
                    </div>
                    <form onSubmit={handleCreateSubmit} className="modal-form">
                        <div className="form-group">
                            <input type="text" name="firstName" placeholder="First Name" value={newAppData.firstName} onChange={handleNewAppChange} required />
                            <input type="text" name="lastName" placeholder="Last Name" value={newAppData.lastName} onChange={handleNewAppChange} required />
                        </div>
                        <div className="form-group">
                            <input type="number" name="age" placeholder="Age" value={newAppData.age} onChange={handleNewAppChange} required />
                            <input type="text" name="degree" placeholder="Degree" value={newAppData.degree} onChange={handleNewAppChange} required />
                        </div>
                        <div className="form-group full-width">
                            <input type="email" name="email" placeholder="Email Address" value={newAppData.email} onChange={handleNewAppChange} required />
                        </div>
                        <div className="form-group full-width">
                            <select name="project" value={newAppData.project} onChange={handleNewAppChange} required>
                                <option value="">Select a Project</option>
                                <option value="AI Data Extraction">AI Data Extraction</option>
                                <option value="Machine Learning Enablement">Machine Learning Enablement</option>
                                <option value="Genealogy">Genealogy</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <textarea name="experience" placeholder="Relevant Experience" rows="3" value={newAppData.experience} onChange={handleNewAppChange} required />
                        </div>
                        <div className="form-group full-width">
                            <input type="url" name="resumeLink" placeholder="Public Resume Link (e.g., Google Drive)" value={newAppData.resumeLink} onChange={handleNewAppChange} required />
                        </div>
                        {modalMessage.text && (
                            <p className={modalMessage.type === 'error' ? 'error-message form-error' : 'success-message'}>
                                {modalMessage.text}
                            </p>
                        )}
                        <div className="form-submit-container">
                            <Button type="submit">Create Application</Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default ApplicationManagement;