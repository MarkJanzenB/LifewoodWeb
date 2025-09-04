import React from 'react';
import Modal from './Modal';
import '../styles/components/EasterEgg.css';

const EasterEgg = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="easter-egg-content">
                <img src="/dev-photo.png" alt="The Developer" className="dev-photo" />
                <h2 className="egg-title">Meet the Developer</h2>
                <p className="egg-name">Mark Janzen Bandola</p>
                <p className="egg-message">
                    Thank you for exploring the Lifewood web application!
                </p>
                {/* Optional: Add a link to your portfolio or LinkedIn */}
                <a
                    href="https://meet-markjanzenbandola.my.canva.site/" // Replace with your actual link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                >
                    Know More about me
                </a>
            </div>
        </Modal>
    );
};

export default EasterEgg;