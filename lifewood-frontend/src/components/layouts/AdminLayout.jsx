import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from '../AdminHeader'; // <-- Use the new AdminHeader
import '../../styles/components/AdminLayout.css';

// This component now provides the overall structure for the entire admin area
const AdminLayout = () => {
    return (
        <div className="admin-layout-wrapper">
            <AdminHeader />
            <div className="admin-content-area">
                {/* The child route (Login, Dashboard, etc.) will render here */}
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;