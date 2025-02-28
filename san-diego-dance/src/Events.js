import React, { useState } from 'react';
import EventCalendar from './EventCalendar';
import SubmitEventForm from './SubmitEventForm';
import './App.css';

function Events() {
    const [showForm, setShowForm] = useState(false);

    const viewToday = () => {
        let formattedDate = new Date().toLocaleDateString('en-CA');
        window.open(`/events/#${formattedDate}`, "_self");
    };

    return (
        <div className="page events">
            <div className="headerWithButton">
                {showForm ? (
                    <button onClick={() => setShowForm(false)}>Back to Events</button>
                ) : (
                    <button onClick={() => setShowForm(true)}>Add Event</button>
                )}
                <h1>{showForm ? "Add an Event" : "Community Events"}</h1>
            </div>

            {showForm ? (
                <SubmitEventForm />
            ) : (
                <EventCalendar />
            )}
        </div>
    );
}

export default Events;
