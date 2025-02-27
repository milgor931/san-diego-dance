import React, { useState } from "react";
import './EventCalendar.css';

// Example events data with more variety
const eventsData = [
    {
        eventTitle: "Salsa Night at the Park",
        eventOrganizer: "San Diego Salsa Community",
        eventDate: "2025-03-15",
        eventRecurrence: "Monthly",
        startTime: "18:00",
        endTime: "21:00",
        eventLocation: "Balboa Park, San Diego, CA",
        eventUrl: "https://salsanight.com",
        eventDescription: "Join us for a monthly salsa night with live music, great food, and amazing dancing under the stars.",
        accessibilityNotes: "Wheelchair accessible, close to public transportation.",
        eventImg: ""
    },
    {
        eventTitle: "Hip-Hop Dance Battle",
        eventOrganizer: "Urban Dance Collective",
        eventDate: "2025-04-05",
        eventRecurrence: "One Time",
        startTime: "14:00",
        endTime: "18:00",
        eventLocation: "Downtown Convention Center, San Diego, CA",
        eventUrl: "https://hiphopbattle.com",
        eventDescription: "A high-energy battle where the best hip-hop dancers face off for the title.",
        accessibilityNotes: "ADA compliant venue, assistive listening devices available.",
        eventImg: ""
    },
    {
        eventTitle: "Contemporary Dance Workshop",
        eventOrganizer: "Artistic Dance Academy",
        eventDate: "2025-03-20",
        eventRecurrence: "One Time",
        startTime: "10:00",
        endTime: "15:00",
        eventLocation: "Dance Studio, 123 Broadway, San Diego, CA",
        eventUrl: "https://artisticdance.com",
        eventDescription: "An intensive workshop focused on contemporary dance techniques and improvisation.",
        accessibilityNotes: "Accessible entrance and bathroom facilities.",
        eventImg: ""
    },
    {
        eventTitle: "Ballroom Dancing Social",
        eventOrganizer: "Pacific Ballroom Dance",
        eventDate: "2025-03-12",
        eventRecurrence: "Weekly",
        startTime: "19:00",
        endTime: "22:00",
        eventLocation: "Pacific Ballroom Dance Studio, 456 Ocean Ave, San Diego, CA",
        eventUrl: "https://pacificballroom.com",
        eventDescription: "A fun evening for all skill levels to enjoy ballroom dancing with live music.",
        accessibilityNotes: "Accessible seating and parking.",
        eventImg: ""
    },
    {
        eventTitle: "Ballet for Beginners",
        eventOrganizer: "Ballet Arts Academy",
        eventDate: "2025-03-25",
        eventRecurrence: "One Time",
        startTime: "16:00",
        endTime: "18:00",
        eventLocation: "Ballet Arts Studio, 789 Elm St, San Diego, CA",
        eventUrl: "https://balletarts.com",
        eventDescription: "A beginner-friendly ballet class designed to introduce new dancers to the fundamentals of ballet.",
        accessibilityNotes: "Wheelchair accessible.",
        eventImg: ""
    },
    {
        eventTitle: "Dance Party Under the Stars",
        eventOrganizer: "SD Dance Collective",
        eventDate: "2025-04-10",
        eventRecurrence: "Monthly",
        startTime: "20:00",
        endTime: "23:00",
        eventLocation: "Waterfront Park, San Diego, CA",
        eventUrl: "https://sdanceparty.com",
        eventDescription: "An outdoor dance event featuring a variety of music genres and a live DJ.",
        accessibilityNotes: "Event is held outdoors; accessible entrances are available.",
        eventImg: ""
    },
    {
        eventTitle: "Latin Dance Night",
        eventOrganizer: "Rhythms of Latin Dance",
        eventDate: "2025-03-22",
        eventRecurrence: "Weekly",
        startTime: "19:30",
        endTime: "22:30",
        eventLocation: "Latin Dance Studio, 234 Fiesta Rd, San Diego, CA",
        eventUrl: "https://latindancenight.com",
        eventDescription: "A weekly Latin dance event where you can enjoy salsa, bachata, and merengue.",
        accessibilityNotes: "Accessible to all, with wheelchair-friendly access.",
        eventImg: ""
    },
    {
        eventTitle: "Jazz Dance Performance",
        eventOrganizer: "Jazz Dance Theater",
        eventDate: "2025-04-02",
        eventRecurrence: "One Time",
        startTime: "19:00",
        endTime: "21:00",
        eventLocation: "Theater Arts Center, 678 Jazz Blvd, San Diego, CA",
        eventUrl: "https://jazzdancetheater.com",
        eventDescription: "An inspiring jazz dance performance featuring local dancers.",
        accessibilityNotes: "Wheelchair accessible seating available.",
        eventImg: ""
    },
    {
        eventTitle: "Modern Dance Showcase",
        eventOrganizer: "Modern Dance Co.",
        eventDate: "2025-04-15",
        eventRecurrence: "One Time",
        startTime: "18:30",
        endTime: "20:30",
        eventLocation: "Creative Arts Hall, 345 Creative Ave, San Diego, CA",
        eventUrl: "https://moderndanceco.com",
        eventDescription: "A showcase of the best modern dance talent from around the region.",
        accessibilityNotes: "Assistance available for individuals with limited mobility.",
        eventImg: ""
    },
    {
        eventTitle: "Dance for a Cause Charity Gala",
        eventOrganizer: "The Dance Foundation",
        eventDate: "2025-05-01",
        eventRecurrence: "One Time",
        startTime: "17:00",
        endTime: "21:00",
        eventLocation: "Grand Ballroom, 900 Gala St, San Diego, CA",
        eventUrl: "https://danceforacause.com",
        eventDescription: "A charity gala with dance performances, silent auction, and fundraising for a good cause.",
        accessibilityNotes: "All proceeds go to charity. Wheelchair accessible.",
        eventImg: ""
    }
];

const EventCalendar = () => {
    // Group events by their eventDate
    const eventsByDate = eventsData.reduce((acc, event) => {
        if (!acc[event.eventDate]) {
            acc[event.eventDate] = [];
        }
        acc[event.eventDate].push(event);
        return acc;
    }, {});

    // Function to format the date as "January 23, 2025"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            {Object.keys(eventsByDate).map((date) => (
                <div key={date} className="event-day-section">
                    <h2 className="event-date">{formatDate(date)}</h2>
                    {eventsByDate[date].map((event, index) => (
                        <EventAccordion key={index} event={event} />
                    ))}
                </div>
            ))}
        </div>
    );
};

const EventAccordion = ({ event }) => {
    const [isOpen, setIsOpen] = useState(false); // State to track if the accordion is open or closed

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="event-item">
            <div className="event-summary" onClick={toggleAccordion}>
                <h3>{event.eventTitle}</h3>
                <p>{event.eventDescription}</p>
                <p>{event.startTime} - {event.endTime}</p>
                <p><strong>Location:</strong> {event.eventLocation}</p>
            </div>

            {isOpen && (
                <div className="event-details">
                    <p><strong>Organizer:</strong> {event.eventOrganizer}</p>
                    <p><strong>Accessibility Notes:</strong> {event.accessibilityNotes}</p>
                    <button className="learnMoreBtn" onClick={() => window.open(event.eventUrl, "_blank")}>
                        Learn More
                    </button>
                </div>
            )}

            <div className="event-image">
                <img src={event.img} alt={event.eventTitle} />
            </div>
        </div>
    );
};

export default EventCalendar;