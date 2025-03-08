import React, { useState, useEffect } from "react";
import "./Resources.css";
import { Link } from "react-router-dom";
import NewsletterSignupForm from "../components/NewsletterSignupForm"

const Resources = ({ resourceLinks }) => {
    const [formData, setFormData] = useState({
        name: "",
        link: "",
        description: "",
        tags: [],
        approved: false
    });
    const [message, setMessage] = useState("");

    // Extract unique tags
    const tags = [...new Set(resourceLinks.map(resource => resource.tag)), "other"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");

        try {
            const response = await fetch("https://san-diego-dance-default-rtdb.firebaseio.com/resources.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Thanks for submitting!");
                setFormData({
                    name: "",
                    link: "",
                    description: "",
                    tags: [],
                    approved: false
                });
            } else {
                setMessage("Error submitting. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="page resources">

            <div className="heading">
                <h1>Resources</h1>
                <p>Your Community Toolkit</p>
            </div>

            <div className="gallery">
                {resourceLinks.map((resource, index) => (
                    <div className="image-container" key={index}>
                        <Link to={resource.link}>
                            <img src={resource.image} alt={resource.name} />
                            <div className="image-overlay">
                                <h3>{resource.name}</h3>
                                {/* <p>{resource.description}</p> */}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* SUBMIT RESOURCE FORM */}
            <form onSubmit={handleSubmit} className="resource-form">
                <h2>Add a Resource</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Link:
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Tags (comma separated):
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Submit Resource</button>
                {message && <p>{message}</p>}
            </form>

            <div className="newsletter-signup-form">
                <NewsletterSignupForm />
            </div>
        </div>
    );
};

export default Resources;
