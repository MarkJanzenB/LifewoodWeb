import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import useDocumentTitle from '../components/useDocumentTitle'; // Import the hook
import lifewoodLogo from '../assets/Lifewood Logo.png';
import '../styles/pages/About.css';

const About = () => {
    useDocumentTitle('Lifewood Data Technology | About Us'); // Use the hook

    const [activeBackground, setActiveBackground] = useState('default');
    const { ref: visionRef, inView: visionInView } = useInView({ threshold: 0.4 });
    const { ref: missionRef, inView: missionInView } = useInView({ threshold: 0.4 });

    useEffect(() => {
        if (visionInView) {
            setActiveBackground('vision');
        } else if (missionInView) {
            setActiveBackground('mission');
        } else {
            setActiveBackground('default');
        }
    }, [visionInView, missionInView]);

    return (
        <>
            <div className="background-container">
                <div className={`bg-image vision-bg ${activeBackground === 'vision' ? 'active' : ''}`}></div>
                <div className={`bg-image mission-bg ${activeBackground === 'mission' ? 'active' : ''}`}></div>
            </div>

            <div className="page-container about-page">
                <section className="brand-showcase fade-in-up">
                    <img src={lifewoodLogo} alt="Lifewood company logo" className="logo" />
                    <h1 className="company-name">Lifewood Data Technology</h1>
                    <div className="motto-toggle-wrapper">
                        <div className="text-fader always-never">
                            <span>Always</span>
                            <span>Never</span>
                        </div>
                        <div className="toggle-switch">
                            <div className="toggle-thumb"></div>
                        </div>
                    </div>
                </section>

                <section className="about-section fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <p className="intro-text">
                        Lifewood Data Technology is a globally recognized leader in artificial intelligence and data-driven solutions. Our work is guided by two core principles: our Vision for the future and our Mission to achieve it.
                    </p>
                </section>

                <hr className="stylish-hr fade-in-up" style={{ animationDelay: '0.4s' }} />

                <section ref={visionRef} className="about-section">
                    <div className="section-header">
                        <h2 className="section-title">Vision</h2>
                    </div>
                    <p className="section-text">
                        To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.
                    </p>
                </section>

                <section ref={missionRef} className="about-section">
                    <div className="section-header">
                        <h2 className="section-title">Mission</h2>
                    </div>
                    <p className="section-text">
                        To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation, collaborating with stakeholders across sectors, and making a meaningful impact on society and the environment.
                    </p>
                </section>
            </div>
        </>
    );
};

export default About;