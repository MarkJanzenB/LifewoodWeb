import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';
import API_BASE_URL from '../apiConfig';
import { useAlert } from '../context/AlertProvider';
import '../styles/components/ApplicationForm.css';

const ApplicationForm = () => {
    const { showAlert } = useAlert();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: '', degree: '',
        experience: '', email: '', project: ''
    });
    const [resume, setResume] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const project = params.get('project');
        if (project) {
            setFormData(prev => ({ ...prev, project }));
        }
    }, [location]);

    const projects = [
        'AI Data Extraction', 'Machine Learning Enablement', 'Genealogy',
        'Natural Language Processing', 'AI-Enabled Customer Service', 'Computer Vision',
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            showAlert("Please attach your resume to submit.", "Missing File");
            return;
        }

        const formDataPayload = new FormData();
        formDataPayload.append('resume', resume);
        formDataPayload.append('application', JSON.stringify(formData));

        try {
            const response = await fetch(`${API_BASE_URL}/api/applications`, {
                method: 'POST',
                body: formDataPayload,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to submit application.');
            }

            showAlert('Application submitted successfully! We will be in touch.', 'Success!');
            e.target.reset();
            setFormData({ firstName: '', lastName: '', age: '', degree: '', experience: '', email: '', project: '' });
            setResume(null);
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
                <label htmlFor="resume" className="file-label">
                    <span>Attach Resume (PDF, DOCX)</span>
                    <span className="file-name">{resume ? resume.name : 'No file chosen'}</span>
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

            <div className="form-submit-container">
                <Button type="submit">Submit Application</Button>
            </div>
        </form>
    );
};

export default ApplicationForm;