import React from 'react';
import useDocumentTitle from '../components/useDocumentTitle'; // Import the hook
import ProjectCard from '../components/ProjectCard';
import '../styles/pages/Projects.css';

const Projects = () => {
    useDocumentTitle('Lifewood Data Technology | Our Projects'); // Use the hook

    const projectList = [
        {
            title: 'AI Data Extraction',
            description: 'Developing intelligent algorithms to extract and structure complex data from unstructured sources.',
            imageUrl: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            title: 'Machine Learning Enablement',
            description: 'Building platforms that empower businesses to integrate machine learning into their core operations.',
            imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            title: 'Genealogy',
            description: 'Using AI to analyze historical records and help people uncover their family histories with unprecedented accuracy.',
            imageUrl: 'https://images.pexels.com/photos/8086333/pexels-photo-8086333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            title: 'Natural Language Processing',
            description: 'Creating advanced models that understand and generate human language for a variety of applications.',
            imageUrl: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            title: 'AI-Enabled Customer Service',
            description: 'Revolutionizing customer support with intelligent chatbots and automated resolution systems.',
            imageUrl: 'https://images.pexels.com/photos/8141168/pexels-photo-8141168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            title: 'Computer Vision',
            description: 'Training machines to interpret and understand the visual world, from image recognition to real-time video analysis.',
            imageUrl: 'https://images.pexels.com/photos/8353610/pexels-photo-8353610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Our Projects</h1>
                <p>Driving Innovation Across Industries</p>
            </div>
            <div className="projects-grid">
                {projectList.map(project => (
                    <ProjectCard
                        key={project.title}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;