import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useDocumentTitle from '../components/useDocumentTitle';
import Button from '../components/Button';
import '../styles/pages/Home.css';

const Home = () => {
    useDocumentTitle('Lifewood Data Technology | Home');

    const [activeBackground, setActiveBackground] = useState('hero');

    const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 });
    const { ref: uniqueRef, inView: uniqueInView } = useInView({ threshold: 0.5 });
    const { ref: pillarsRef, inView: pillarsInView } = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (pillarsInView) {
            setActiveBackground('pillars');
        } else if (uniqueInView) {
            setActiveBackground('unique');
        } else {
            // Check heroInView specifically to handle scrolling back up
            if (heroInView) {
                setActiveBackground('hero');
            }
        }
    }, [heroInView, uniqueInView, pillarsInView]);

    return (
        <>
            <div className="home-background-container">
                {/* --- NEW: Video Background --- */}
                <video
                    className={`bg-video ${activeBackground === 'hero' ? 'active' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    {/* A high-quality, royalty-free stock video */}
                    <source src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4" type="video/mp4" />
                </video>

                {/* --- Image Backgrounds for other sections --- */}
                <div className={`bg-image unique-bg ${activeBackground === 'unique' ? 'active' : ''}`}></div>
                <div className={`bg-image pillars-bg ${activeBackground === 'pillars' ? 'active' : ''}`}></div>
            </div>

            <div ref={heroRef} className="home-container">
                <h1 className="fade-in-up">Welcome to Lifewood</h1>
                <p className="sub-headline fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Pioneering Data Technology
                </p>
                <p className="description fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Lifewood is at the forefront of technological innovation, driving global impact through cutting-edge projects in AI and machine learning. Join us to build the future.
                </p>
                <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Link to="/apply"><Button>Apply Now</Button></Link>
                </div>
            </div>

            <section ref={uniqueRef} className="info-section fade-in-up">
                <div className="info-container">
                    <h2>What makes Lifewood unique?</h2>
                    <div className="two-column-layout">
                        <div className="column">
                            <p>Lifewood is more than just a company that processes data, delivers at speed, and produces projects in multiple languages for some of the world’s largest organizations. While these capabilities are essential, they do not fully capture the essence of who we are. At our core, we must define and communicate our identity—both internally to our global teams and externally to our clients, investors, stakeholders, and friends spread across the world.</p>
                        </div>
                        <div className="column">
                            <p>With our headquarters in Malaysia, Lifewood is ideally situated to support the country's role as a super-bridge connecting China with other nations. Our vast data resources have the potential to analyze social and environmental challenges not only in Malaysia but also in Singapore and beyond, contributing to social progress and development.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section ref={pillarsRef} className="pillars-section fade-in-up">
                <div className="pillars-container">
                    <h2>Our Core Pillars</h2>
                    <div className="pillars-grid">
                        <div className="pillar-card">
                            <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Advanced Data Technology" />
                            <div className="pillar-content">
                                <h3>Advanced Technology</h3>
                                <p>Leveraging cutting-edge technology like AI, GPT, and Gemini to solve complex problems and deliver innovative solutions.</p>
                            </div>
                        </div>
                        <div className="pillar-card">
                            <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Global Collaboration" />
                            <div className="pillar-content">
                                <h3>Global Collaboration</h3>
                                <p>Acting as a builder of harmony and trust, we connect diverse people, cultures, and interests between the East and the West.</p>
                            </div>
                        </div>
                        <div className="pillar-card">
                            <img src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Social Impact & ESG" />
                            <div className="pillar-content">
                                <h3>Social Impact & ESG</h3>
                                <p>Committed to fostering positive change through strong ESG principles and creating inclusive, empowering environments.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;