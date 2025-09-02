
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ServerStatusIndicator from '../ServerStatusIndicator';
import API_BASE_URL from '../../apiConfig';
import '../../styles/components/AdminLayout.css';

const AdminLayout = () => {
    const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'up', or 'down'

    useEffect(() => {
        const checkServerStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/message`);
                if (response.ok) {
                    setServerStatus('up');
                } else {
                    setServerStatus('down');
                }
            } catch (error) {
                setServerStatus('down');
            }
        };

        // Check status immediately on load
        checkServerStatus();

        // Then, check status every 15 seconds
        const intervalId = setInterval(checkServerStatus, 15000);

        // Cleanup function to stop the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="admin-layout">
            <div className="status-indicator-container">
                <ServerStatusIndicator status={serverStatus} />
            </div>
            <main>
                {/* Outlet is where the nested route (Login or Dashboard) will be rendered */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;