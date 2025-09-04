import React from 'react';
import { Link } from 'react-router-dom';
import lifewoodLogo from '../assets/lifewood Logo.png';
import '../styles/components/AdminHeader.css';

const AdminHeader = () => {
    // Check for the authentication token directly in this component
    const isAuthenticated = !!localStorage.getItem('authToken');

    // Define the content for the logo
    const logoContent = (
        <img src={lifewoodLogo} alt="Lifewood Logo" className="admin-logo" />
    );

    return (
        <header className="admin-header">
            <div className="logo-container">
                {isAuthenticated ? (
                    // If authenticated, the logo is a link to the dashboard
                    <Link to="/admin/dashboard/applications">
                        {logoContent}
                    </Link>
                ) : (
                    <div>{logoContent}</div>
                )}
            </div>
        </header>
    );
};

export default AdminHeader;