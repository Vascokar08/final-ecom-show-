import React, { useRef } from 'react';
import emailjs from 'emailjs-com'; // Correct import for emailjs

import styles from './contactus.css'; // Adjust path based on your project structure

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_3ns98ue', 'template_pvzt7yc', form.current, '0IMlTmiWuX9NM8Erq')
      .then(
        (result) => {
          console.log('Email successfully sent!', result.text);
        },
        (error) => {
          console.error('Failed to send email. Error:', error.text);
        }
      );
  };

  return (
    <div id="contact" className="lr-pad">
      <div className="c-container">
        <div className="head-text">
          <h2 className="head-title">Get in <span>Touch</span></h2>
          <p className="head-desc">We'd love to hear from you. Please fill out the form below to get in touch with us.</p>
        </div>
        <div className="contact">
          <div className="left-form">
          
            </div>
          </div>
          <div className="right-form">
            <form ref={form} onSubmit={sendEmail}>
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <input type="text" name="subject" placeholder="Subject" required />
              <textarea name="message" rows="6" placeholder="Your Message" required></textarea>
              <button type="submit" className="get-btn">Send Message</button>
            </form>
          </div>
        </div>
        <br></br>
        <div className="c-box">
          <div className="box">
            <div className="icon">📞</div>
            <div className="text">
              <h3>Phone</h3>
              <p>+91 7507986584</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">📧</div>
            <div className="text">
              <h3>Email</h3>
              <p>shivamkorgaonkar2021@gmail.com</p>
            </div>
          </div>
          <div className="box">
            <div className="icon">📍</div>
            <div className="text">
              <h3>Address</h3>
              <p>Vasco-Da-Gama,Goa</p>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default ContactUs;
