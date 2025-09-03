import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import API_BASE_URL from '../apiConfig';
import { useAlert } from '../context/AlertProvider'; // Import the hook
import '../styles/components/ApplicationForm.css';

const ApplicationForm = () => {
    const { showAlert } = useAlert(); // Use the hook to get the showAlert function

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: '', degree: '',
        experience: '', email: '', project: '', resumeLink: ''
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
        'Natural Language Processing', 'AI-Enabled Customer Service', 'Computer Vision',
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                showAlert('Your application has been submitted successfully! We will be in touch.', 'Success!');
                e.target.reset();
                setFormData({ firstName: '', lastName: '', age: '', degree: '', experience: '', email: '', project: '', resumeLink: '' });
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit application.');
            }
        } catch (err) {
            showAlert(err.message, 'Submission Error');
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
                    {projects.map((proj) => (<option key={proj} value={proj}>{proj}</option>))}
                </select>
            </div>
            <div className="form-group full-width">
                <textarea name="experience" placeholder="Relevant Experience" rows="5" value={formData.experience} onChange={handleChange} required />
            </div>
            <div className="form-group full-width">
                <input
                    type="url"
                    name="resumeLink"
                    placeholder="Resume Link (e.g., Google Drive, must be public)"
                    value={formData.resumeLink}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* The old error/success message tags are no longer needed */}
            <div className="form-submit-container">
                <Button type="submit">Submit Application</Button>
            </div>
        </form>
    );
};

export default ApplicationForm;