import React, { useState } from 'react';
import EventCalendar from '../components/EventCalendar';
import SubmitEventForm from '../components/SubmitEventForm';
import "./Events.css";

const eventTypes = ["any", "class", "workshop", "performance", "other"];

function Events() {
    const [showForm, setShowForm] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const viewToday = () => {
        let formattedDate = new Date().toLocaleDateString('en-CA');
        window.open(`/events/#${formattedDate}`, "_self");
    };

    return (
        <div className="page events">

            <div className="heading">
                <h1>Community Events</h1>
                {/* <p>All in one place.</p> */}
            </div>

            <EventCalendar />
            
            <SubmitEventForm />
        </div>
    );
}

export default Events;
