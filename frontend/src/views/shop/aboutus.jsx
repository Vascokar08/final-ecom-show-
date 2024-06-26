// AboutSection.js

import React from 'react';
import './aboutus.css'; // Import your CSS file for styling

function AboutSection() {
    return (
        <div id="about" className="lr-pad">
            <div className="about-container">
                <div className="about-left">
                    <div className="about-img"><img src="https://images.pexels.com/photos/3081173/pexels-photo-3081173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /></div>
                </div>
                <div className="about-right">
                    <div className="about-content">
                        <h2>About Us</h2>
                        <p>Welcome to CloudBazzar, your one-stop eCommerce solution provider. We specialize in empowering businesses by transforming their traditional operations into innovative, cloud-based marketplaces. Our mission is to simplify and enhance your online retail experience.</p>
                        <h3>Who We Are</h3>
                        <p>CloudBazzar is a team of dedicated professionals with extensive expertise in eCommerce, cloud computing, and digital transformation. We pride ourselves on our ability to tailor solutions to meet the unique needs of each client, ensuring a seamless transition to a more efficient and profitable online platform.</p>
                        <h3>Our Success</h3>
                        <p><i className="fa-solid fa-circle-check"></i> At CloudBazzar, success is measured by the achievements of our clients. We have helped numerous businesses expand their reach, streamline their operations, and boost their sales through our cutting-edge cloud-based solutions. </p>
                        <p><i className="fa-solid fa-circle-check"></i> Our proven track record speaks for itself, with countless satisfied customers and thriving online stores.</p>
                        <p><i className="fa-solid fa-circle-check"></i> we  Provide best services</p>
                        <h3>Our Mission</h3>
                        <p>Our mission at CloudBazzar is to provide businesses with the tools and support they need to succeed in the digital marketplace. We aim to convert data into actionable insights, enabling our clients to make informed decisions and stay ahead of the competition. By leveraging the power of cloud technology, we help businesses unlock their full potential and achieve sustained growth.</p>
                    </div>
                </div>
            </div>
            {/* <div className="c-box">
                <div className="box">
                    <div className="icon"><i className="fa-solid fa-envelope-open"></i></div>
                    <div className="text">
                        <h3>Mail Here</h3>
                        <p>hello@luaz.com</p>
                        <p>info@luaz.com</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon"><i className="fa-solid fa-map"></i></div>
                    <div className="text">
                        <h3>Visit Here</h3>
                        <p>27 Division St, New York,</p>
                        <p>NY 10002, USA</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon"><i className="fa-solid fa-headset"></i></div>
                    <div className="text">
                        <h3>Call Here</h3>
                        <p>+123 456 7890</p>
                        <p>+241 452 4526</p>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default AboutSection;
