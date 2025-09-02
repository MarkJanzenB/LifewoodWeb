import React from 'react';
import '../styles/components/ServerStatusIndicator.css';

const ServerStatusIndicator = ({ status }) => {
    // Determine text and class based on the status prop ('up', 'down', or 'checking')
    let statusText = 'Checking...';
    let statusClass = 'checking';

    if (status === 'up') {
        statusText = 'Server Active';
        statusClass = 'up';
    } else if (status === 'down') {
        statusText = 'Server Down';
        statusClass = 'down';
    }

    return (
        <div className={`status-indicator ${statusClass}`}>
            <div className="status-dot"></div>
            <span className="status-text">{statusText}</span>
        </div>
    );
};

export default ServerStatusIndicator;