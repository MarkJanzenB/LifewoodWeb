import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import '../styles/components/ApplicationForm.css';

const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: '', degree: '',
        experience: '', email: '', project: '',
    });

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const project = params.get('project');
        if (project) {
            setFormData(prevData => ({ ...prevData, project }));
        }
    }, [location]);

    const projects = [
        'AI Data Extraction', 'Machine Learning Enablement', 'Genealogy',
        'Natural Language Processing', 'AI-Enabled Customer Service',
        'Computer Vision', 'Autonomous Driving Technology',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // --- This fetch call is live and correct ---
            const response = await fetch('http://localhost:8080/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Application submitted successfully!');
                setFormData({
                    firstName: '', lastName: '', age: '', degree: '',
                    experience: '', email: '', project: ''
                });
            } else {
                alert('Failed to submit application.');
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="application-form">
            <div className="form-group">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
                <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
                <select name="project" value={formData.project} onChange={handleChange} required>
                    <option value="">Select a Project</option>
                    {projects.map((proj) => (
                        <option key={proj} value={proj}>{proj}</option>
                    ))}
                </select>
            </div>
            <div className="form-group full-width">
                <textarea name="experience" placeholder="Relevant Experience" value={formData.experience} onChange={handleChange} required />
            </div>
            <Button type="submit">Submit Application</Button>
        </form>
    );
};

export default ApplicationForm;