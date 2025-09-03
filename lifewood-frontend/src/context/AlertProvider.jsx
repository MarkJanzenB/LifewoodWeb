import React, { createContext, useState, useContext } from 'react';
import AlertModal from '../components/AlertModal';

// Create the context
const AlertContext = createContext();

// Create a custom hook to easily use the context
export const useAlert = () => {
    return useContext(AlertContext);
};

// Create the Provider component that will wrap our app
export const AlertProvider = ({ children }) => {
    const [alertState, setAlertState] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null,
        onCancel: null,
        confirmText: 'OK',
        cancelText: 'Cancel'
    });

    const showAlert = (message, title = 'Alert') => {
        return new Promise((resolve) => {
            setAlertState({
                isOpen: true,
                title,
                message,
                confirmText: 'OK',
                onConfirm: () => {
                    setAlertState({ isOpen: false });
                    resolve(true);
                },
                onCancel: null, // No cancel button for a simple alert
            });
        });
    };

    const showConfirm = (message, title = 'Confirmation', confirmText = 'OK', cancelText = 'Cancel') => {
        return new Promise((resolve) => {
            setAlertState({
                isOpen: true,
                title,
                message,
                confirmText,
                cancelText,
                onConfirm: () => {
                    setAlertState({ isOpen: false });
                    resolve(true); // User clicked confirm
                },
                onCancel: () => {
                    setAlertState({ isOpen: false });
                    resolve(false); // User clicked cancel
                },
            });
        });
    };

    const value = { showAlert, showConfirm };

    return (
        <AlertContext.Provider value={value}>
            {children}
            <AlertModal
                isOpen={alertState.isOpen}
                title={alertState.title}
                message={alertState.message}
                onConfirm={alertState.onConfirm}
                onCancel={alertState.onCancel}
                confirmText={alertState.confirmText}
                cancelText={alertState.cancelText}
            />
        </AlertContext.Provider>
    );
};