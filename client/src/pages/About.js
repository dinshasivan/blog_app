"use client";  

import React, { useState } from "react";

const About = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-5 bg-gradient" id="about" style={{ background: "linear-gradient(135deg, #f9f9f9, #ececec)" }}>
            <div className="container">
                <div className="row align-items-center">
                    
                    {/* Left - Text Section */}
                    <div className="col-lg-6 text-lg-start text-center">
                        <h1 className="display-4 fw-bold text-dark mb-4">About Us</h1>
                        <p className="lead text-secondary mb-4">
                            Discover the story behind our passion for food and how we strive to bring you the best culinary experiences.
                            Our mission is to inspire, share, and celebrate the joy of cooking and eating together.
                        </p>
                        <a href="#explore" className="btn btn-dark btn-lg rounded-pill px-4">
                            Learn More <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>

                    {/* Right - Image Section with Full Coverage */}
                    <div className="col-lg-6">
                        <div className="position-relative overflow-hidden rounded-4 shadow-lg" style={{ width: "100%", height: "400px" }}>
                            <img 
                                src="/pictures/Food.jpg" 
                                alt="About Us" 
                                className="w-100 h-100"
                                style={{
                                    objectFit: "cover",
                                    transition: "transform 0.4s ease-in-out",
                                    transform: isHovered ? "scale(1.05)" : "scale(1)"
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
