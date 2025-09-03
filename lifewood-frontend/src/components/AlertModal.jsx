import React from 'react';
import Modal from './Modal'; // We'll reuse our existing Modal component
import Button from './Button';
import '../styles/components/AlertModal.css';

const AlertModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText, cancelText }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onCancel}>
            <div className="alert-modal-content">
                <h2 className="alert-title">{title}</h2>
                <p className="alert-message">{message}</p>
                <div className="alert-actions">
                    {onCancel && (
                        <button className="action-button cancel" onClick={onCancel}>
                            {cancelText || 'Cancel'}
                        </button>
                    )}
                    <button className="action-button confirm" onClick={onConfirm}>
                        {confirmText || 'OK'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AlertModal;