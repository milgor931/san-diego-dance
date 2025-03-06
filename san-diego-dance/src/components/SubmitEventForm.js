import React, { useState } from "react";
import "./SubmitEventForm.css";

const eventTypes = ["class", "workshop", "performance", "other"];

function EventForm() {
    const [formData, setFormData] = useState({
        eventTitle: "",
        eventOrganizer: "",
        eventDate: "",
        eventType: "one-time",
        eventStartTime: "",
        eventEndTime: "",
        eventLocation: "",
        eventImg: "",
        eventUrl: "",
        eventDescription: "",
        accessibilityNotes: "",
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
            const response = await fetch("https://san-diego-dance-default-rtdb.firebaseio.com/events.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage("Thanks for submitting your event!");
                setFormData({
                    eventTitle: "",
                    eventOrganizer: "",
                    eventDate: "",
                    eventType: "one-time",
                    eventStartTime: "",
                    eventEndTime: "",
                    eventLocation: "",
                    eventUrl: "",
                    eventImg: "",
                    eventDescription: "",
                    accessibilityNotes: "",
                });
            } else {
                setMessage("Error submitting event. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <form id="add-event" className="eventForm" onSubmit={handleSubmit}>

            <h1>Add an event</h1>
            <div className="form-group">
                <label htmlFor="eventTitle">Event Title</label>
                <input id="eventTitle" type="text" name="eventTitle" value={formData.eventTitle} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="eventOrganizer">Event Organizer</label>
                <input id="eventOrganizer" type="text" name="eventOrganizer" value={formData.eventOrganizer} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="eventDate">Event Date</label>
                <input id="eventDate" type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required />
            </div>

            <div className="form-group full-width">
                <label htmlFor="eventType">Event Type</label>
                <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} required>
                    { eventTypes.map((eventType) => (
                        <option value={eventType}>{eventType}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="eventStartTime">Start Time</label>
                <input id="eventStartTime" type="time" name="eventStartTime" value={formData.eventStartTime} onChange={handleChange} required />

                <label htmlFor="eventEndTime">End Time</label>
                <input id="eventEndTime" type="time" name="eventEndTime" value={formData.eventEndTime} onChange={handleChange} required />
            </div>

            <div className="form-group">
                <label htmlFor="eventLocation">Event Location</label>
                <input id="eventLocation" type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} required />

                <label htmlFor="eventUrl">Event URL (Optional)</label>
                <input id="eventUrl" type="text" name="eventUrl" value={formData.eventUrl} onChange={handleChange} />

                <label htmlFor="eventImg">Featured Image URL (Optional)</label>
                <input id="eventImg" type="text" name="eventImg" value={formData.eventImg} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
                <label htmlFor="eventDescription">Event Description</label>
                <textarea id="eventDescription" name="eventDescription" value={formData.eventDescription} onChange={handleChange} required />
            </div>

            <div className="form-group full-width">
                <label htmlFor="accessibilityNotes">Accessibility Notes</label>
                <textarea id="accessibilityNotes" name="accessibilityNotes" value={formData.accessibilityNotes} onChange={handleChange} />
            </div>

            <div className="button-container">
                <button type="submit">Submit</button>
            </div>

            {message && <p>{message}</p>}
        </form>
    );
}

export default EventForm;
