import React from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../components/useDocumentTitle';
import Button from '../components/Button';
import '../styles/pages/ErrorPages.css'; // Shared stylesheet

const NotFound = () => {
    useDocumentTitle('404 Not Found | Lifewood Data Technology');

    return (
        <div className="error-page-container">
            <div className="error-box">
                <div className="error-code">404</div>
                <h1 className="error-title">Page Not Found</h1>
                <p className="error-message">
                    Sorry, we couldn't find the page you were looking for. It might have been moved or deleted.
                </p>
                <Link to="/">
                    <Button>Return to Homepage</Button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;