import React from 'react';
import '../styles/components/Button.css';

const Button = ({ children, onClick, type = 'button' }) => {
    return (
        <button type={type} onClick={onClick} className="apply-button">
            {children}
        </button>
    );
};

export default Button;