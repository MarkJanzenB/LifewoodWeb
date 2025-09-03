import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import API_BASE_URL from '../apiConfig';
import '../styles/components/ApplicationForm.css';

const ApplicationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        degree: '',
        experience: '',
        email: '',
        project: '',
    });

    const [resume, setResume] = useState(null); // State for the resume file
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const project = params.get('project');
        if (project) {
            setFormData(prevData => ({ ...prevData, project }));
        }
    }, [location]);

    const projects = [
        'AI Data Extraction',
        'Machine Learning Enablement',
        'Genealogy',
        'Natural Language Processing',
        'AI-Enabled Customer Service',
        'Computer Vision',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        // Reset previous messages
        setError('');
        setSuccess('');
        // Set the selected file
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!resume) {
            setError("Please attach your resume to submit the application.");
            return;
        }

        // We use FormData to send a file and other data together
        const formDataPayload = new FormData();
        formDataPayload.append('resume', resume);
        // We must send the application data as a JSON string under the key "application"
        formDataPayload.append('application', JSON.stringify(formData));

        try {
            const response = await fetch(`${API_BASE_URL}/api/applications`, {
                method: 'POST',
                // IMPORTANT: When sending FormData, the browser automatically sets the
                // Content-Type header with the correct boundary. Do not set it manually.
                body: formDataPayload,
            });

            if (response.ok) {
                setSuccess('Application submitted successfully!');
                // Reset form fields
                setFormData({
                    firstName: '', lastName: '', age: '', degree: '',
                    experience: '', email: '', project: ''
                });
                // Reset the file input (requires a trick with the key or form reset)
                e.target.reset();
                setResume(null);
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit application.');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error submitting application:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="application-form">
            {/* Form Groups for text inputs */}
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
                <textarea name="experience" placeholder="Relevant Experience" value={formData.experience} onChange={handleChange} required />
            </div>

            {/* File Input Group */}
            <div className="form-group full-width">
                <label htmlFor="resume" className="file-label">
                    {resume ? `Selected: ${resume.name}` : 'Attach Resume (PDF, DOCX)'}
                </label>
                <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    required
                />
            </div>

            {error && <p className="error-message form-error">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <Button type="submit">Submit Application</Button>
        </form>
    );
};

export default ApplicationForm;