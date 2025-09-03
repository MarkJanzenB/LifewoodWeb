import React from 'react';
import { Link } from 'react-router-dom';
import lifewoodLogo from '../assets/Lifewood Logo.png';
import '../styles/components/AdminHeader.css'; // New dedicated CSS file

const AdminHeader = () => {
    return (
        <header className="admin-header">
            <div className="logo-container">
                <Link to="/admin/dashboard/applications">
                    <img src={lifewoodLogo} alt="Lifewood Logo" className="admin-logo" />
                </Link>
            </div>
        </header>
    );
};

export default AdminHeader;