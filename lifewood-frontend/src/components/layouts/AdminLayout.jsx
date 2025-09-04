import React from 'react'; // Removed useState and useEffect
import { Outlet } from 'react-router-dom'; // Removed useLocation
import AdminHeader from '../AdminHeader';
// No longer importing Unauthorized here
import '../../styles/components/AdminLayout.css';

const AdminLayout = () => {
    // All of the old authentication logic that was here has been removed.
    // The ProtectedRoute component now handles all security checks.

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