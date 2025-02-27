// Make sure to run npm install @formspree/react
// For more help visit https://formspr.ee/react-help
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import './SubmitEventForm.css';

function EventForm() {
    const [state, handleSubmit] = useForm("movjogda");
    if (state.succeeded) {
        return <p>Thanks for submitting your event!</p>;
    }
    return (
        <form className="eventForm" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="eventTitle">Event Title</label>
                <input id="eventTitle" type="text" name="eventTitle" required />
            </div>

            <div className="form-group">
                <label htmlFor="eventOrganizer">Event Organizer</label>
                <input id="eventOrganizer" type="text" name="eventOrganizer" required />
            </div>

            <div className="form-group">
                <label htmlFor="eventDate">Event Date</label>
                <input id="eventDate" type="date" name="eventDate" required />
            </div>

            <div className="form-group full-width">
                <label htmlFor="eventRecurrence">Event Recurrence</label>
                <select id="eventRecurrence" name="eventRecurrence" required>
                    <option value="one-time">One Time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="eventStartTime">Start Time</label>
                <input id="eventStartTime" type="time" name="eventStartTime" required />

                <label htmlFor="eventEndTime">End Time</label>
                <input id="eventEndTime" type="time" name="eventEndTime" required />
            </div>

            <div className="form-group">
                <label htmlFor="eventLocation">Event Location</label>
                <input id="eventLocation" type="text" name="eventLocation" required />

                <label htmlFor="eventUrl">Event URL</label>
                <input id="eventUrl" type="url" name="eventUrl" required />
            </div>

            <div className="form-group full-width">
                <label htmlFor="eventDescription">Event Description</label>
                <textarea id="eventDescription" name="eventDescription" required />
            </div>

            <div className="form-group full-width">
                <label htmlFor="accessibilityNotes">Accessibility Notes</label>
                <textarea id="accessibilityNotes" name="accessibilityNotes" />
            </div>


            <ValidationError field="eventTitle" errors={state.errors} />
            <ValidationError field="eventOrganizer" errors={state.errors} />
            <ValidationError field="eventDate" errors={state.errors} />
            <ValidationError field="eventStartTime" errors={state.errors} />
            <ValidationError field="eventEndTime" errors={state.errors} />
            <ValidationError field="eventDescription" errors={state.errors} />
            <ValidationError field="eventUrl" errors={state.errors} />
            <ValidationError field="eventLocation" errors={state.errors} />
            <ValidationError field="accessibilityNotes" errors={state.errors} />
            <ValidationError field="eventRecurrence" errors={state.errors} />

            <div className="button-container">
                <button type="submit" disabled={state.submitting}>Submit</button>
            </div>
        </form>
    );
}


export default EventForm;
