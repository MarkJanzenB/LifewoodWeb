import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Unauthorized from '../pages/admin/Unauthorized'; // We'll show this page

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('authToken');

    useEffect(() => {
        if (!isAuthenticated) {
            // If the user is not authenticated, wait 3 seconds...
            const timer = setTimeout(() => {
                // ...then redirect to the login page.
                navigate('/admin/login');
            }, 3000);

            // This is a cleanup function to cancel the timer if the component unmounts
            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, navigate]);

    // If the user is NOT authenticated, render the Unauthorized page.
    if (!isAuthenticated) {
        return <Unauthorized />;
    }

    // If the user IS authenticated, render the actual page they were trying to access.
    return children;
};

export default ProtectedRoute;