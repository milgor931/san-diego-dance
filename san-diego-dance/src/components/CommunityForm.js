import React, { useState } from "react";
import "./CommunityForm.css";

function EventForm() {
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        image: '',
        website: '',
        linkedin: '',
        instagram: '',
        bio: '',
        approved: false
    });

    const [message, setMessage] = useState("");

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Submitting...");

        try {
            const response = await fetch("https://san-diego-dance-default-rtdb.firebaseio.com/community-members.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Thanks for submitting!");
                setFormData({
                    name: '',
                    title: '',
                    image: '',
                    website: '',
                    linkedin: '',
                    instagram: '',
                    bio: '',
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
        <div id="join-community" className="community-form-container gradient">
            <div className="form-heading">
                <h1>Join the Community</h1>
                <p>Fill out your details to get on the community board.</p>
            </div>
            <form className="community-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
                <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
                <input type="text" name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
                <input type="text" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleChange} />
                <textarea name="bio" placeholder="Short bio (200 chars)" value={formData.bio} onChange={handleChange} maxLength="200" required></textarea>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default EventForm;
