import React from 'react';
import ApplicationForm from '../components/ApplicationForm';
import useDocumentTitle from '../components/useDocumentTitle'; // Import the hook
import '../styles/pages/Apply.css';

const Apply = () => {
    useDocumentTitle('Lifewood | Apply Now'); // Use the hook

    return (
        <div className="apply-container">
            <h2>Join Our Team</h2>
            <p>Fill out the form below to apply for one of our exciting projects. We're looking for passionate individuals to help us push the boundaries of technology.</p>
            <ApplicationForm />
        </div>
    );
};

export default Apply;