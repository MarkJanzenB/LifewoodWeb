import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '../components/Button';
import '../styles/pages/Home.css';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Lifewood Data Technology | Home</title>
            </Helmet>

            {/* Section 1: Hero Welcome */}
            <div className="home-container">
                <h1 className="fade-in-up">Welcome to Lifewood</h1>
                <p className="sub-headline fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Pioneering Data Technology
                </p>
                <p className="description fade-in-up" style={{ animationDelay: '0.4s' }}>
                    Lifewood is at the forefront of technological innovation, driving global impact through cutting-edge projects in AI and machine learning. Join us to build the future.
                </p>
                <div className="fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <Link to="/apply">
                        <Button>Apply Now</Button>
                    </Link>
                </div>
            </div>

            {/* Section 2: "What Makes Lifewood Unique?" Text Section */}
            <section className="info-section fade-in-up">
                <div className="info-container">
                    <h2>What makes Lifewood unique?</h2>
                    <div className="two-column-layout">
                        <div className="column">
                            <p>
                                Lifewood is more than just a company that processes data, delivers at speed, and produces projects in multiple languages for some of the world’s largest organizations. While these capabilities are essential, they do not fully capture the essence of who we are. At our core, we must define and communicate our identity—both internally to our global teams and externally to our clients, investors, stakeholders, and friends spread across the world.
                            </p>
                            <p>
                                The communications team began this journey by revisiting the Lifewood Strategic Positioning document presented in Malaysia in November 2023. This document outlines important themes and ideas that encapsulate Lifewood's approach to business, highlighting the role we play in Malaysia, Singapore, mainland China, and across South-East Asia and the world.
                            </p>
                        </div>
                        <div className="column">
                            <p>
                                With our headquarters in Malaysia, Lifewood is ideally situated to support the country's role as a super-bridge connecting China with other nations, especially during these times of tension between East and West. Our vast data resources have the potential to analyze social and environmental challenges not only in Malaysia but also in Singapore and beyond, contributing to social progress and development.
                            </p>
                            <p>
                                Moreover, Lifewood places a strong emphasis on ESG (Environmental, Social, and Governance) principles, which are evident in our HR policies. In countries like Bangladesh, our Pottya team has taken significant steps to employ a high percentage of women and people with disabilities, particularly in an environment where these groups are often underrepresented.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Core Pillars with Stock Images */}
            <section className="pillars-section fade-in-up">
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