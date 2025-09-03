import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminHeader from '../AdminHeader';
import Unauthorized from '../../pages/admin/Unauthorized'; // <-- IMPORT THE UNAUTHORIZED PAGE
import '../../styles/components/AdminLayout.css';

const AdminLayout = () => {
    // We get the user's current location to know which page they are trying to access
    const location = useLocation();

    // This is a simple check to see if a token exists.
    // In a real app, you might validate the token with an API call here.
    const isAuthenticated = !!localStorage.getItem('authToken');

    // These are the pages an unauthenticated user IS allowed to see
    const publicAdminRoutes = ['/admin/login', '/admin/force-reset'];
    const isPublicAdminRoute = publicAdminRoutes.includes(location.pathname);

    // If the user is NOT authenticated AND is trying to access a protected admin page...
    if (!isAuthenticated && !isPublicAdminRoute) {
        // ...show them the Unauthorized page.
        return (
            <div className="admin-layout-wrapper">
                <AdminHeader />
                <div className="admin-content-area">
                    <Unauthorized />
                </div>
            </div>
        );
    }

    // Otherwise, show the page they requested (Login, Dashboard, etc.)
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