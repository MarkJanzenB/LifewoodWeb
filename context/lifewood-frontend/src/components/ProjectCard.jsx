import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/ProjectCard.css';

// --- The component now accepts imageUrl ---
const ProjectCard = ({ title, description, imageUrl }) => {
    return (
        <div className="project-card">
            {/* --- This is the new background image element --- */}
            <div
                className="card-background"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>

            {/* --- This content container sits on top --- */}
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <Link to={`/apply?project=${encodeURIComponent(title)}`} className="apply-link">
                    Apply for this project &rarr;
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;