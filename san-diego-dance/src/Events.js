// src/App.js
import React from 'react';
import EventCalendar from './EventCalendar';
import SubmitEventForm from './SubmitEventForm';
import './App.css';

function Events() {
    const viewToday = () => {
        let formattedDate = new Date().toLocaleDateString('en-CA');
        window.open(`/events/#${formattedDate}`, "_self")
    }

    return (
        <div className="page events">
            <div className="headerWithButton">
                <h1>Community Events</h1>
                <button onClick={() => window.open("/events/#addEvent", "_self")}>Add Event</button>
            </div>


            <EventCalendar />

            <h1>Add an Event</h1>
            <SubmitEventForm />
        </div>
    );
}

export default Events;
