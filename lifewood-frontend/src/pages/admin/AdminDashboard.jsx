import React, { useState } from 'react'; // Import useState
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages/AdminDashboardLayout.css';

const AdminDashboard = () => {
    useDocumentTitle('Admin Dashboard | Lifewood Data Technology');
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // --- NEW: State for mobile sidebar visibility ---
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const hasRole = (role) => user?.roles?.includes(role);

    return (
        <div className="admin-dashboard-layout">
            {/* --- NEW: Burger menu for mobile --- */}
            <div className="admin-burger-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* --- UPDATED: Sidebar now has a class to control visibility --- */}
            <nav className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    {/* Add a close button for mobile */}
                    <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)}>&times;</button>
                </div>
                <div className="sidebar-links">
                    <NavLink to="/admin/dashboard/applications" onClick={() => setIsSidebarOpen(false)}>Application Management</NavLink>
                    {hasRole('ROLE_ROOT') && (
                        <NavLink to="/admin/dashboard/users" onClick={() => setIsSidebarOpen(false)}>User Management</NavLink>
                    )}
                </div>
                <button className="admin-button logout" onClick={handleLogout}>Logout</button>
            </nav>

            <main className="admin-main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminDashboard;