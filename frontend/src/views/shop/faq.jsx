import React, { useState } from 'react';
import styles from "./faq.css";



function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div id="faq" className="lr-pad">
            <div className="b-container">
                <div className="head-text">
                    <h2 className="head-title">Frequently Asked <span>Questions</span></h2>
                    <p className="head-desc">Find answers to the most common questions about our products and services.</p>
                </div>
                <div className="faq-box">
                    <div className="faq-item" onClick={() => handleItemClick(0)}>
                        <h3>What is CloudBazaar?</h3>
                        {activeIndex === 0 && <p>CloudBazaar is an online marketplace where you can find a variety of products at competitive prices.</p>}
                    </div>
                    <div className="faq-item" onClick={() => handleItemClick(1)}>
                        <h3>How do I place an order?</h3>
                        {activeIndex === 1 && <p>Browse our products, add your desired items to the cart, and proceed to checkout to place your order.</p>}
                    </div>
                    <div className="faq-item" onClick={() => handleItemClick(2)}>
                        <h3>What payment methods do you accept?</h3>
                        {activeIndex === 2 && <p>We accept various payment methods, including credit/debit cards, PayPal, and other online payment options.</p>}
                    </div>
                    <div className="faq-item" onClick={() => handleItemClick(3)}>
                        <h3>How can I track my order?</h3>
                        {activeIndex === 3 && <p>Once your order is shipped, we will send you a tracking number via email, which you can use to track your order.</p>}
                    </div>
                </div>
            </div>
            {/* Contact Card and Footer sections */}
            {/* Include your existing code for contact card and footer here */}
        </div>
    );
}

export default FAQSection;
