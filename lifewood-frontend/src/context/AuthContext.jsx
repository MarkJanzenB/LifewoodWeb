import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import API_BASE_URL from '../apiConfig';

// Create the context that components will consume
const AuthContext = createContext();

// Create a simple custom hook to make using the context easier
export const useAuth = () => useContext(AuthContext);

// Create the provider component that will wrap your entire application
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Will store user data { username, roles }
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // To handle the initial check

    // This function runs once when the app loads to check if a valid token exists
    const validateToken = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setIsLoading(false);
            return;
        }
        try {
            // Ask the backend for the current user's profile using the token
            const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data); // Store the user's profile { username, roles }
                setIsAuthenticated(true);
            } else {
                // If the token is invalid or expired, log the user out
                logout();
            }
        } catch (error) {
            console.error("Authentication check failed:", error);
            logout();
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        validateToken();
    }, [validateToken]);

    // Function to call after a successful login
    const login = async (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        await validateToken(); // Fetch the user's profile immediately after login
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setIsAuthenticated(false);
    };

    // The value that will be provided to all child components
    const value = { user, isAuthenticated, isLoading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};