import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './context/AlertProvider';
import { AuthProvider } from './context/AuthContext'; // <-- IMPORT THE NEW PROVIDER
import './styles/index.css';
import './styles/animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AlertProvider>
            <AuthProvider> {/* <-- WRAP THE APP WITH THE AUTH PROVIDER */}
                <App />
            </AuthProvider>
        </AlertProvider>
    </React.StrictMode>
);