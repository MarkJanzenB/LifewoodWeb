import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../AdminHeader';
import '../../styles/components/AdminLayout.css';

// This component is now extremely simple. Its only job is to provide the layout.
const AdminLayout = () => {
    // All of the old authentication logic that was here has been removed.
    // The ProtectedRoute component now handles all security.
    return (
        <div className="admin-layout-wrapper">
            <AdminHeader />
            <div className="admin-content-area">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;