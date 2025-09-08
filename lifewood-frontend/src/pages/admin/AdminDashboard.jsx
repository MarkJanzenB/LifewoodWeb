import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages/AdminDashboardLayout.css';

const AdminDashboard = () => {
    useDocumentTitle('Admin Dashboard | Lifewood Data Technology');
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    // This helper function checks if the user's roles array includes the required role
    const hasRole = (role) => {
        // The optional chaining (?.) prevents errors if the user object is not yet loaded
        return user?.roles?.includes(role);
    };

    return (
        <div className="admin-dashboard-layout">
            <nav className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>
                <div className="sidebar-links">
                    <NavLink to="/admin/dashboard/applications">Application Management</NavLink>

                    {/* The "User Management" link will only be rendered if the user has the 'ROLE_ROOT' */}
                    {hasRole('ROLE_ROOT') && (
                        <NavLink to="/admin/dashboard/users">User Management</NavLink>
                    )}
                </div>
                <button className="admin-button logout" onClick={handleLogout}>Logout</button>
            </nav>
            <main className="admin-main-content">
                {/* The child routes (ApplicationManagement or AdminManagement) will be rendered here */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;