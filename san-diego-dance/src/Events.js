// src/App.js
import React from 'react';
import EventCalendar from './EventCalendar';
import SubmitEventForm from './SubmitEventForm';
import './App.css';

function Events() {
    return (
        <div className="page events">
            <h1>Community Events</h1>
            <EventCalendar />

            <h1>Add an Event</h1>
            <SubmitEventForm />
        </div>
    );
}

export default Events;
