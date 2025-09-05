import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import lifewoodLogo from '../assets/lifewood Logo.png';
import Button from './Button';
import '../styles/components/Header.css';

const Header = () => {
    // State to manage the open/closed state of the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <Link to="/" className="logo-link">
                <img src={lifewoodLogo} alt="Lifewood Logo" className="logo" />
            </Link>

            {/* Desktop Navigation (will be hidden on mobile) */}
            <nav className="desktop-nav">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </nav>

            {/* Desktop Apply Button (will be hidden on mobile) */}
            <div className="desktop-apply-button">
                <Link to="/apply">
                    <Button>Apply Now</Button>
                </Link>
            </div>

            {/* --- NEW: Burger Menu Icon (only visible on mobile) --- */}
            <div className="burger-menu" onClick={toggleMenu}>
                <span className={`bar ${isMenuOpen ? 'animate' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'animate' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'animate' : ''}`}></span>
            </div>

            {/* --- NEW: Mobile Navigation Overlay --- */}
            <div className={`mobile-nav-overlay ${isMenuOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-links">
                    <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/about" onClick={toggleMenu}>About Us</NavLink>
                    <NavLink to="/projects" onClick={toggleMenu}>Projects</NavLink>
                </nav>
                <div className="mobile-apply-button">
                    <Link to="/apply" onClick={toggleMenu}>
                        <Button>Apply Now</Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;