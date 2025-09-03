import React, { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // <-- NEW IMPORT
import useDocumentTitle from '../../components/useDocumentTitle';
import API_BASE_URL from '../../apiConfig';
import Modal from '../../components/Modal'; // <-- NEW IMPORT
import '../../styles/pages/AdminManagement.css'; // <-- NEW CSS FILE

const AdminManagement = () => {
    useDocumentTitle('Lifewood Admin | Admin Management');
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null); // For the modal
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error("No auth token found.");

            // Decode the token to get the current user's username
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

    const handleDelete = async () => {
        if (!selectedUser || !window.confirm(`Are you sure you want to delete user: ${selectedUser.username}?`)) {
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/users/${selectedUser.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const message = await response.text();
            if (!response.ok) throw new Error(message);
            alert(message);
            setSelectedUser(null); // Close modal
            fetchUsers(); // Refresh list
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    const handleResetPassword = async () => {
        if (!selectedUser || !window.confirm(`Are you sure you want to reset the password for ${selectedUser.username}?`)) {
            return;
        }
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/users/${selectedUser.id}/reset-password`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const message = await response.text();
            if (!response.ok) throw new Error(message);
            alert(message);
            setSelectedUser(null); // Close modal
        } catch (err) {
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <div className="admin-page-content">
            <div className="page-header">
                <h1>Admin User Management</h1>
                <p>Click on a user to manage their account.</p>
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
        </div>
    );
};

export default AdminManagement;