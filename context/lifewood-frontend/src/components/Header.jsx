import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import lifewoodLogo from '../assets/Lifewood Logo.png';
import Button from './Button';
import '../styles/components/Header.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/">
                <img src={lifewoodLogo} alt="Lifewood Logo" className="logo" />
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/projects">Projects</NavLink>
            </nav>
            <Link to="/apply">
                <Button>Apply Now</Button>
            </Link>
        </header>
    );
};

export default Header;