import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import '../../styles/pages/AdminDashboardLayout.css'; // New CSS file

const AdminDashboard = () => {
    useDocumentTitle('Lifewood Admin |Admin Dashboard');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/admin/login');
    };

    return (
        <div className="admin-dashboard-layout">
            <nav className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                </div>
                <div className="sidebar-links">
                    <NavLink to="/admin/dashboard/applications">Application Management</NavLink>
                    <NavLink to="/admin/dashboard/users">User Management</NavLink>
                </div>
                <button className="admin-button logout" onClick={handleLogout}>Logout</button>
            </nav>
            <main className="admin-main-content">
                {/* Child routes will be rendered here */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;