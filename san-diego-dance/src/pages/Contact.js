import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Integrate EmailJS or another service here
    };

    return (
        <div className="page">

            <div className="heading">
                <h1>Contact us!</h1>
                <p>We want to hear your thoughts and needs.</p>
                <p>This is a <b>community effort</b> and a work in progess. Send us some feedback so we can serve you and the greater community even better. We would love to hear your thoughts!</p>

                {/* <div className="social-links">
                    <a href="#" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-envelope"></i></a>
                    <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                </div> */}
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                <label>
                    Email:
                </label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                <label>
                    Message:
                </label>
                <textarea name="message" value={formData.message} onChange={handleChange} required />
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default Contact;
