import React, { useState, useEffect, useCallback } from 'react';
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { useAlert } from '../../context/AlertProvider';
import '../../styles/pages/ApplicationManagement.css';

const ApplicationManagement = () => {
    // Corrected the document title as requested
    useDocumentTitle('Lifewood Admin | Application Management');
    const { showAlert, showConfirm } = useAlert();

    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApp, setSelectedApp] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [summary, setSummary] = useState({ New: 0, Approved: 0, Rejected: 0 });
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newAppData, setNewAppData] = useState({
        firstName: '', lastName: '', age: '', degree: '',
        experience: '', email: '', project: '', status: 'New', resumeLink: ''
    });
    const [modalMessage, setModalMessage] = useState({ type: '', text: '' });

    const projects = [
        'AI Data Extraction', 'Machine Learning Enablement', 'Genealogy',
        'Natural Language Processing', 'AI-Enabled Customer Service', 'Computer Vision'
    ];

    const getToken = () => localStorage.getItem('authToken');

    const fetchApplicationsAndSummary = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const token = getToken();
            const endpoint = activeTab === 'All'
                ? `${API_BASE_URL}/api/admin/applications`
                : `${API_BASE_URL}/api/admin/applications/status/${activeTab}`;

            const [appsResponse, summaryResponse] = await Promise.all([
                fetch(endpoint, { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch(`${API_BASE_URL}/api/admin/applications/summary`, { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (!appsResponse.ok) throw new Error(`Failed to fetch ${activeTab} applications.`);
            const appsData = await appsResponse.json();
            setApplications(appsData);

            if (summaryResponse.ok) {
                const summaryData = await summaryResponse.json();
                setSummary({
                    New: summaryData.New || 0,
                    Approved: summaryData.Approved || 0,
                    Rejected: summaryData.Rejected || 0,
                });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchApplicationsAndSummary();
    }, [fetchApplicationsAndSummary]);

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
            fetchApplicationsAndSummary();
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
            fetchApplicationsAndSummary();
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
                fetchApplicationsAndSummary();
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

    const handleViewResume = (resumeLink) => {
        if (resumeLink) {
            window.open(resumeLink, '_blank');
        } else {
            showAlert("No resume link was provided for this application.", "Resume Not Found");
        }
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Application Submissions</h1>
                <button className="admin-button" onClick={() => setIsCreateModalOpen(true)}>+ Add Application</button>
            </div>

            <div className="status-cards-container">
                <div className="status-card new-card" onClick={() => setActiveTab('New')}>
                    <div className="card-icon">
                        {/* --- INLINE SVG REPLACES REACT ICON --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div className="card-info">
                        <h4>New Applications</h4>
                        <span className="count">{summary.New}</span>
                    </div>
                </div>
                <div className="status-card approved-card" onClick={() => setActiveTab('Approved')}>
                    <div className="card-icon">
                        {/* --- INLINE SVG REPLACES REACT ICON --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div className="card-info">
                        <h4>Approved</h4>
                        <span className="count">{summary.Approved}</span>
                    </div>
                </div>
                <div className="status-card rejected-card" onClick={() => setActiveTab('Rejected')}>
                    <div className="card-icon">
                        {/* --- INLINE SVG REPLACES REACT ICON --- */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                    </div>
                    <div className="card-info">
                        <h4>Rejected</h4>
                        <span className="count">{summary.Rejected}</span>
                    </div>
                </div>
            </div>

            <div className="tabs-container">
                <button className={`tab-button ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All Applications</button>
                <button className={`tab-button ${activeTab === 'New' ? 'active' : ''}`} onClick={() => setActiveTab('New')}>New</button>
                <button className={`tab-button ${activeTab === 'Approved' ? 'active' : ''}`} onClick={() => setActiveTab('Approved')}>Approved</button>
                <button className={`tab-button ${activeTab === 'Rejected' ? 'active' : ''}`} onClick={() => setActiveTab('Rejected')}>Rejected</button>
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
                                onClick={() => handleViewResume(selectedApp.resumeLink)}
                                disabled={!selectedApp.resumeLink}
                            >
                                View Resume
                            </button>
                            <div className="status-actions">
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
                <div className="app-modal-content create-modal">
                    <div className="modal-header">
                        <h2>Add New Application</h2>
                    </div>
                    <form onSubmit={handleCreateSubmit} className="application-form">
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
                                {projects.map(proj => <option key={proj} value={proj}>{proj}</option>)}
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