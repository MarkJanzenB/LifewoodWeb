import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../components/useDocumentTitle';
import Button from '../../components/Button';
import '../../styles/pages/ErrorPages.css'; // We'll use a shared stylesheet

const Unauthorized = () => {
    useDocumentTitle('Lifewood Admin | Access Denied');

    return (
        <div className="error-page-container">
            <div className="error-box">
                <div className="error-code">403</div>
                <h1 className="error-title">Access Denied</h1>
                <p className="error-message">
                    You do not have permission to view this page. This area is for authorized administrators only.
                </p>
                <Link to="/admin/login">
                    <Button>Return to Login</Button>
                </Link>
            </div>
        </div>
    );
};

export default Unauthorized;