import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // We will use our central auth state
import Unauthorized from '../pages/admin/Unauthorized'; // We'll show this page if needed

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth(); // Get the loading and auth status

    // --- State 1: We are still checking the token ---
    // While the AuthContext is running its initial check, we show nothing (or a loading spinner).
    // This PREVENTS the child components (like the dashboard) from rendering and making API calls too early.
    if (isLoading) {
        return <div>Loading...</div>; // Or a proper spinner component
    }

    // --- State 2: The check is complete, and the user is NOT authenticated ---
    // If not authenticated, we redirect to the login page.
    // The "Unauthorized" page with a timer is a great idea, but for a direct guard like this,
    // a direct Navigate is more standard and reliable. Let's start with this.
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // --- State 3: The check is complete, and the user IS authenticated ---
    // If everything is fine, render the actual page they were trying to access.
    return children;
};

export default ProtectedRoute;