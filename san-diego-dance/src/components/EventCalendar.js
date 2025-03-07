import React, { useState, useEffect } from "react";
import './EventCalendar.css';
import { DateTime } from "luxon";

const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const eventTypes = ["any", "class", "workshop", "performance"];

const formatDate = (dateString) => {
    const date = DateTime.fromISO(dateString, { zone: "America/Los_Angeles" });

    // Use Luxon to format the date
    const formattedDate = date.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const dayOfWeek = daysOfTheWeek[date.weekday - 1]; // Luxon uses 1-7 for weekdays (1 = Monday)

    return `${formattedDate}`;
};


function getDayOfWeek(dateString) {
    const date = DateTime.fromISO(dateString); // Parse the date string into a Luxon DateTime object
    return date.toFormat('cccc'); // Get the full name of the day
}

// Helper function to get the next weekday date (e.g., next Monday)
const getNextWeekdayDate = (targetDay) => {
    const today = DateTime.now().setZone("America/Los_Angeles");
    const targetDayIndex = daysOfTheWeek.indexOf(targetDay);
    const currentDayIndex = today.weekday - 1; // Luxon uses 1-7 for weekdays (1 = Monday)

    // If the target day is the same as today, we want to get the next week's same day
    let daysToAdd = targetDayIndex - currentDayIndex;
    if (daysToAdd <= 0) {
        daysToAdd += 7; // Move to the next week
    }

    return today.plus({ days: daysToAdd });
};

// Helper function to get the month and year in a format like "February 2025"
const getMonthYear = (dateString) => {
    const date = DateTime.fromISO(dateString, { zone: "America/Los_Angeles" });
    return date.toLocaleString({ year: 'numeric', month: 'long' });
};

function convertTime(time24) {
    const time = DateTime.fromFormat(time24, 'HH:mm', { zone: 'America/Los_Angeles' });
    return time.toFormat('h:mm a'); // Luxon will handle AM/PM formatting
}

const EventCalendar = () => {

    const [eventsData, setEventsData] = useState([]);
    const [events, setEvents] = useState([]);
    const [eventsByDate, setEventsByDate] = useState([]);
    const [eventsByMonth, setEventsByMonth] = useState([]);
    const [selectedType, setSelectedType] = useState("any");

    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        fetch("https://san-diego-dance-default-rtdb.firebaseio.com/events.json")
            .then(response => response.json())
            .then(data => {
                setEventsData(Object.values(data));
            })
            .catch(error => console.error("Error fetching events:", error));
    }, [])

    useEffect(() => {

        let classEvents = [];

        eventsData.forEach(event => {
            if (event.eventType === "class") {
                const weekday = getDayOfWeek(event.eventDate);
                const nextClassDate = getNextWeekdayDate(weekday); // Get the next weekday (e.g., Monday)
                for (let i = 0; i <= 3; i++) {
                    let newDate = nextClassDate.plus({ weeks: i }); // Add 1 week each iteration
                    
                    let newEvent = { ...event, eventDate: newDate.toISODate() };
                    classEvents.push(newEvent);
                }
            }
        });

        let nonClassEvents = eventsData.filter(event => event.eventType !== "class")

        // Combine original events with the auto-generated class events
        let allEvents = [...nonClassEvents, ...classEvents];

        let upcomingEvents = filterUpcomingEvents(allEvents).slice(0, visibleCount);

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
    }, [eventsData, selectedType, visibleCount])

    // Filter events to show only those that are after or on today's date
    const filterUpcomingEvents = (events) => {
        const now = DateTime.now();
        const filteredEvents = events.filter(event => {
            const eventDateTime = DateTime.fromISO(`${event.eventDate}T${event.eventStartTime}`, { zone: "America/Los_Angeles" });
            return eventDateTime >= now && event.approved;
        });

        // Sort events by eventDate in ascending order
        return filteredEvents.sort((a, b) => {
            const eventADateTime = DateTime.fromISO(`${a.eventDate}T${a.eventStartTime}`, { zone: "America/Los_Angeles" });
            const eventBDateTime = DateTime.fromISO(`${b.eventDate}T${b.eventStartTime}`, { zone: "America/Los_Angeles" });
            return eventADateTime - eventBDateTime;
        });
    };

    const addEvent = () => {
        document.getElementById('add-event').scrollIntoView({ behavior: 'smooth' })
    }

    const loadMore = () => {
        setVisibleCount(visibleCount + 10);
    };

    return (
        <div className="event-calendar-container">
            <div className="events-navbar">
                <div>
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
                ? <div>
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
                    {visibleCount < eventsData.length && (
                        <button onClick={loadMore} className="load-more-btn">Load More</button>
                    )}
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
                {event.eventImg !== ""
                    && <div className="event-card-img-container">
                        <img src={event.eventImg} alt="Event" />
                    </div>
                }

                <div className="event-card-body">
                    <div>
                        <h3 className="event-title">{event.eventTitle}</h3>
                        <p className="event-time">{convertTime(event.eventStartTime)} - {convertTime(event.eventEndTime)}</p>
                        <p><a className="event-location" href={event.eventLocationLink} target="_blank">
                            <i className="fa-solid fa-location-pin"></i> {event.eventLocation}
                        </a></p>
                        <div className="calendar-buttons">
                            <button className="add-to-calendar-btn google" onClick={addToGoogleCalendar}>Add to Google Calendar</button>
                            {/* <button className="add-to-calendar-btn apple" onClick={addToAppleCalendar}>Add to Apple Calendar</button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="event-details">
                {isOpen && (
                    <>
                        {event.eventDescription.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                        ))}

                        <br />

                        <p><strong>Organizer:</strong> {event.eventOrganizer}</p>

                        {event.accessibilityNotes !== "" && (
                            <p>
                                <strong>Accessibility Notes:</strong> <br />
                                {event.accessibilityNotes.split("\n").map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        )}

                        <button className="learn-more-btn" onClick={() => window.open(event.eventUrl, "_blank")}>
                            Learn More
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default EventCalendar;

