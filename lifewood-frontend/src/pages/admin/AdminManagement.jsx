import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { useAlert } from '../../context/AlertProvider'; // Import the hook
import '../../styles/pages/AdminManagement.css';

const AdminManagement = () => {
    useDocumentTitle('Admin Management | Lifewood Data Technology');
    const { showAlert, showConfirm } = useAlert(); // Use the hook

    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [modalMessage, setModalMessage] = useState({ type: '', text: '' });

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error("No auth token found.");

            const decodedToken = jwtDecode(token);
            setCurrentUser(decodedToken.sub);

            const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (!response.ok) throw new Error('Failed to fetch users.');
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setModalMessage({ type: '', text: '' });
        if (!newUsername) {
            setModalMessage({ type: 'error', text: 'Username cannot be empty.' });
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ username: newUsername })
            });
            const message = await response.text();
            if (!response.ok) throw new Error(message);
            setModalMessage({ type: 'success', text: message });
            setNewUsername('');
            fetchUsers();
            setTimeout(() => {
                setIsCreateModalOpen(false);
                setModalMessage({ type: '', text: '' });
            }, 2000);
        } catch (err) {
            setModalMessage({ type: 'error', text: err.message });
        }
    };

    const handleDelete = async () => {
        if (!selectedUser) return;
        const confirmed = await showConfirm(
            `Are you sure you want to delete user: ${selectedUser.username}? This cannot be undone.`,
            'Confirm Deletion',
            'Delete',
            'Cancel'
        );
        if (confirmed) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${API_BASE_URL}/api/admin/users/${selectedUser.id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const message = await response.text();
                if (!response.ok) throw new Error(message);
                showAlert(message, 'Success');
                setSelectedUser(null);
                fetchUsers();
            } catch (err) {
                showAlert(err.message, 'Deletion Failed');
            }
        }
    };

    const handleResetPassword = async () => {
        if (!selectedUser) return;
        const confirmed = await showConfirm(
            `Are you sure you want to reset the password for ${selectedUser.username}?`,
            'Confirm Password Reset',
            'Reset Password',
            'Cancel'
        );
        if (confirmed) {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`${API_BASE_URL}/api/admin/users/${selectedUser.id}/reset-password`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const message = await response.text();
                if (!response.ok) throw new Error(message);
                showAlert(message, 'Success');
                setSelectedUser(null);
            } catch (err) {
                showAlert(err.message, 'Reset Failed');
            }
        }
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Admin User Management</h1>
                <button className="admin-button" onClick={() => setIsCreateModalOpen(true)}>
                    + Add New Admin
                </button>
            </div>
            {isLoading && <p>Loading users...</p>}
            {error && <p className="error-message">{error}</p>}
            <div className="admin-users-grid">
                {users.map(user => {
                    const isRoot = user.username === 'root';
                    const isSelf = user.username === currentUser;
                    const isDisabled = isRoot || isSelf;
                    return (
                        <div
                            key={user.id}
                            className={`user-card ${isDisabled ? 'disabled' : ''}`}
                            onClick={() => !isDisabled && setSelectedUser(user)}
                            title={isDisabled ? "This user cannot be modified." : `Manage ${user.username}`}
                        >
                            <span className="username">{user.username}</span>
                            {isRoot && <span className="user-tag root">ROOT</span>}
                            {isSelf && <span className="user-tag self">YOU</span>}
                        </div>
                    );
                })}
            </div>

            <Modal isOpen={!!selectedUser} onClose={() => setSelectedUser(null)}>
                {selectedUser && (
                    <div className="user-modal-content">
                        <h2>Manage User</h2>
                        <p className="modal-username">{selectedUser.username}</p>
                        <div className="modal-actions">
                            <button className="action-button reset" onClick={handleResetPassword}>Reset Password</button>
                            <button className="action-button delete" onClick={handleDelete}>Remove User</button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <div className="user-modal-content">
                    <h2>Create New Admin User</h2>
                    <p>A new admin will be created with the default password 'root'. They will be required to reset it on their first login.</p>
                    <form onSubmit={handleCreateAdmin} className="modal-form">
                        <div className="input-group">
                            <label htmlFor="new-username">Username</label>
                            <input
                                type="text"
                                id="new-username"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                placeholder="e.g., new.admin@lifewood.com"
                                required
                            />
                        </div>
                        {modalMessage.text && (
                            <p className={modalMessage.type === 'error' ? 'error-message form-error' : 'success-message'}>
                                {modalMessage.text}
                            </p>
                        )}
                        <Button type="submit">Create Admin</Button>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default AdminManagement;