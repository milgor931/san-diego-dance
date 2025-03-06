import React, { useState, useEffect } from "react";
import './EventCalendar.css';

const eventTypes = ["any", "class", "workshop", "performance"];

const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Set up the options for the desired date format
    const options = {
        // year: 'numeric',
        month: 'long',
        // day: 'numeric',
        // timeZone: 'America/Los_Angeles', // Specifies the time zone
    };

    // Use Intl.DateTimeFormat to format the date in the specified time zone
    const formatter = new Intl.DateTimeFormat('en-US', options);


    // return formatter.format(date);

    return `${formatter.format(date)} ${date.getDate() + 1}, ${date.getFullYear()} `
};



// Helper function to get the month and year in a format like "February 2025"
const getMonthYear = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
};

function convertTime(time24) {
    let [hours, minutes] = time24.split(":").map(Number);
    let period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

const EventCalendar = () => {

    const [events, setEvents] = useState([]);
    const [eventsByDate, setEventsByDate] = useState([]);
    const [eventsByMonth, setEventsByMonth] = useState([]);
    const [selectedType, setSelectedType] = useState("any");

    useEffect(() => {

        fetch("https://san-diego-dance-default-rtdb.firebaseio.com/events.json")
            .then(response => response.json())
            .then(data => {
                let upcomingEvents = filterUpcomingEvents(Object.values(data));

                const filteredEvents = selectedType === "any"
                    ? upcomingEvents
                    : upcomingEvents.filter(event => event.eventType === selectedType);

                setEvents(filteredEvents);

                // Group events by their eventDate
                const byDate = filteredEvents.reduce((acc, event) => {
                    if (!acc[event.eventDate]) {
                        acc[event.eventDate] = [];
                    }
                    acc[event.eventDate].push(event);
                    return acc;
                }, {});

                setEventsByDate(byDate);

                // Group events by month-year (e.g., "February 2025")
                const byMonth = filteredEvents.reduce((acc, event) => {
                    const monthYear = getMonthYear(event.eventDate);
                    if (!acc[monthYear]) {
                        acc[monthYear] = {};
                    }

                    // Now group events by the exact date within each month-year
                    const eventDate = event.eventDate;
                    if (!acc[monthYear][eventDate]) {
                        acc[monthYear][eventDate] = [];
                    }

                    acc[monthYear][eventDate].push(event);
                    return acc;
                }, {});
                setEventsByMonth(byMonth);
            })
            .catch(error => console.error("Error fetching events:", error));
    }, [selectedType])

    // Filter events to show only those that are after or on today's date
    const filterUpcomingEvents = (events) => {
        const todayDate = new Date().getTime();
        const filteredEvents = events.filter(event => new Date(event.eventDate).getTime() >= todayDate && event.approved);

        // Sort events by eventDate in ascending order
        return filteredEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    };

    const addEvent = () => {
        document.getElementById('add-event').scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="event-calendar-container">

            <div class="events-navbar">
                <div>
                    {/* <input type="date" id="eventDate" /> */}

                    <select
                        id="eventType"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)} // Updates the selected type
                    >
                        {eventTypes.map((eventType) => (
                            <option key={eventType} value={eventType}>{eventType}</option>
                        ))}
                    </select>
                </div>


                <button onClick={addEvent}>Add Event</button>
            </div>

            {events.length > 0
                ?
                <div>
                    {Object.keys(eventsByMonth).map((monthYear) => (
                        <div key={monthYear} className="event-month-group">
                            <h2 className="event-month-header">{monthYear}</h2>
                            {Object.keys(eventsByMonth[monthYear]).map((eventDate) => (
                                <div key={eventDate} className="event-date-group">
                                    <h3 className="event-date-header">{formatDate(eventDate)}</h3>
                                    <div className="event-cards">
                                        {eventsByMonth[monthYear][eventDate].map((event, index) => (
                                            <div key={index} className="event-card">
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                : <p className="no-events">No events to show</p>
            }
        </div>
    );
};

const EventCard = ({ event }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const addToGoogleCalendar = () => {
        const title = event.eventTitle;
        const date = event.eventDate;
        const start = event.eventStartTime;
        const end = event.eventEndTime;
        const location = event.eventLocation;

        const eventType = event.eventType;
        const description = event.eventDescription;

        // Format Date & Time for Google Calendar (YYYYMMDDTHHMMSSZ format)
        const eventStart = new Date(`${date}T${start}:00`);
        const eventEnd = new Date(`${date}T${end}:00`);
        const formattedStart = eventStart.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
        const formattedEnd = eventEnd.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

        // Google Calendar Event URL
        const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formattedStart}/${formattedEnd}&details=${encodeURIComponent(description)}!&location=${location}&sf=true&output=xml`;

        // Open Google Calendar
        window.open(googleCalendarUrl, "_blank");
    }

    const addToAppleCalendar = () => {
        const title = event.eventTitle;
        const date = event.eventDate;
        const start = event.eventStartTime;
        const end = event.eventEndTime;
        const location = event.eventLocation;
        const description = event.eventDescription;

        // Format Date & Time for iCalendar (YYYYMMDDTHHMMSSZ format)
        const eventStart = new Date(`${date}T${start}:00`).toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
        const eventEnd = new Date(`${date}T${end}:00`).toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";

        // iCalendar File Content
        const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//Your App//EN
    BEGIN:VEVENT
    UID:${Date.now()}@yourdomain.com
    DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15)}Z
    DTSTART:${eventStart}
    DTEND:${eventEnd}
    SUMMARY:${title}
    DESCRIPTION:${description}
    LOCATION:${location}
    END:VEVENT
    END:VCALENDAR`;

        // Create and Download .ics File
        const blob = new Blob([icsContent], { type: "text/calendar" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.ics`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <div className={`event-card-content ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
            {/* Event Image */}
            <div className="event-card-header">
                {event.eventImg === ""
                    ? <div className="event-card-img-container">
                        <img src="/assets/event-default.png" alt="Event" />
                    </div>
                    : <div className="event-card-img-container">
                        <img src={event.eventImg} alt="Event" />
                    </div>
                }

                <div className="event-card-body">
                    <div>
                        <h3 className="event-title">{event.eventTitle}</h3>
                        <p><a className="event-location" href={event.eventLocationLink} target="_blank">
                            <i class="fa-solid fa-location-pin"></i> {event.eventLocation}
                        </a></p>
                        <p className="event-time">{convertTime(event.eventStartTime)} - {convertTime(event.eventEndTime)}</p>

                        <button className="add-to-calendar-btn google" onClick={addToGoogleCalendar}>Add to Google Calendar</button>
                        <button className="add-to-calendar-btn apple" onClick={addToAppleCalendar}>Add to Apple Calendar</button>
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="event-details">
                {isOpen && (
                    <>
                        <p>{event.eventDescription}</p>
                        <br />
                        <p><strong>Organizer:</strong> {event.eventOrganizer}</p>
                        {event.accessibilityNotes !== "" && <p><strong>Accessibility Notes:</strong>  <br />{event.accessibilityNotes}</p>}
                        <button className="learn-more-btn" onClick={() => window.open(event.eventUrl, "_blank")}>
                            Learn More
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};



export default EventCalendar;
