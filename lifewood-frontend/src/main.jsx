import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertProvider } from './context/AlertProvider'; // <-- IMPORT
import './styles/index.css';
import './styles/Animations.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AlertProvider> {/* <-- WRAP YOUR APP */}
            <App />
        </AlertProvider>
    </React.StrictMode>
);