import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            {/* --- MOVED ADMIN LOGIN LINK TO THE TOP --- */}
            <div className="admin-login-link">
                <Link to="/admin/login">Admin Login</Link>
            </div>

            <p>&copy; {new Date().getFullYear()} Lifewood Data Technology. All Rights Reserved.</p>
            <p className="footer-motto">Always On, Never Off</p>
        </footer>
    );
};

export default Footer;