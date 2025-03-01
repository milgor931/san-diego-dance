import React, { useState } from "react";
import './EventCalendar.css';

// DRAFT

// {
//     eventTitle: "S P A C E Pro Showcase",
//     eventOrganizer: "Disco Riot",
//     eventDate: "2025-03-28",
//     eventRecurrence: "One-time",
//     startTime: "7:00 pm",
//     endTime: "8:00 pm",
//     eventLocation: "San Diego, CA",
//     eventUrl: "https://www.tickettailor.com/events/discoriot/1599788?",
//     eventDescription: "An immersive dance performance exploring contemporary themes through movement and sound.",
//     accessibilityNotes: "Wheelchair accessible, ASL interpretation available.",
//     eventImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivPp3I6f-cBfIUhtl8bClVqJ-9gQPyA9LtQ&s"
// },

// Example events data with more variety
// const eventsData = [
//     {
//         eventTitle: "S P A C E Pro Showcase",
//         eventOrganizer: "Disco Riot",
//         eventDate: "2025-03-28",
//         eventRecurrence: "One-time",
//         startTime: "7:00 pm",
//         endTime: "8:00 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "https://www.tickettailor.com/events/discoriot/1599788?",
//         eventDescription: "An immersive dance performance exploring contemporary themes through movement and sound.",
//         accessibilityNotes: "Wheelchair accessible, ASL interpretation available.",
//         eventImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivPp3I6f-cBfIUhtl8bClVqJ-9gQPyA9LtQ&s"
//     },
//     {
//         eventTitle: "S P A C E Pro Showcase",
//         eventOrganizer: "Disco Riot",
//         eventDate: "2025-03-29",
//         eventRecurrence: "One-time",
//         startTime: "7:00 pm",
//         endTime: "8:00 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "https://www.tickettailor.com/events/discoriot/1599788?",
//         eventDescription: "An immersive dance performance exploring contemporary themes through movement and sound.",
//         accessibilityNotes: "Wheelchair accessible, ASL interpretation available.",
//         eventImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivPp3I6f-cBfIUhtl8bClVqJ-9gQPyA9LtQ&s"
//     },
//     {
//         eventTitle: "Choreo & PLAY",
//         eventOrganizer: "Disco Riot",
//         eventDate: "2025-04-10",
//         eventRecurrence: "Weekly",
//         startTime: "18:30",
//         endTime: "20:00",
//         eventLocation: "San Diego, CA",
//         eventUrl: "https://discoriot.org/choreoand/",
//         eventDescription: "A collaborative space for choreographers to create and share work.",
//         accessibilityNotes: "Open to all levels, wheelchair accessible.",
//         eventImg: "https://s3-media0.fl.yelpcdn.com/bphoto/Fl2_6RemswjqrXTF6rdq8g/348s.jpg"
//     },
//     {
//         eventTitle: "Class with SEED Choreographers",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-03-20",
//         eventRecurrence: "One-time",
//         startTime: "17:00",
//         endTime: "19:00",
//         eventLocation: "Malashock Dance, San Diego, CA",
//         eventUrl: "https://malashockdance.org/events/class-with-seed-choreographers/",
//         eventDescription: "An exclusive workshop with SEED choreographers for dancers of all levels.",
//         accessibilityNotes: "Accessible venue, parking available.",
//         eventImg: "https://cdn.kpbs.org/dims4/default/572ee86/2147483647/strip/true/crop/960x591+0+0/resize/1760x1084!/format/webp/quality/90/?url=http%3A%2F%2Fkpbs-brightspot.s3.us-west-2.amazonaws.com%2Fd2%2F66%2Fbd73cd7c4b41acf1d925dac3f066%2Fmalashock-doug-mcminimy.jpg"
//     },
//     {
//         eventTitle: "Dance at Liberty Station",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-05-05",
//         eventRecurrence: "Monthly",
//         startTime: "18:00",
//         endTime: "20:00",
//         eventLocation: "Liberty Station, San Diego, CA",
//         eventUrl: "https://malashockdance.org/dance-at-liberty-station/",
//         eventDescription: "An open dance event for the community at Liberty Station.",
//         accessibilityNotes: "Outdoor event, wheelchair accessible.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2024/08/adults.png"
//     },
//     {
//         eventTitle: "NeuroDance",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-06-12",
//         eventRecurrence: "Biweekly",
//         startTime: "16:00",
//         endTime: "17:30",
//         eventLocation: "Malashock Dance, San Diego, CA",
//         eventUrl: "http://malashockdance.org/neurodance/",
//         eventDescription: "A dance class designed for individuals with neurological differences.",
//         accessibilityNotes: "Sensory-friendly, accessible restrooms.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2025/01/12.png"
//     },
//     {
//         eventTitle: "SEED 2025",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-04-02",
//         eventRecurrence: "Annual",
//         startTime: "7:30 pm",
//         endTime: "9:30 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "http://malashockdance.org/seed-2025/",
//         eventDescription: "An annual showcase featuring emerging choreographers and innovative performances.",
//         accessibilityNotes: "Wheelchair accessible, captioning available.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2025/01/Seed-Ticketleap-banner-960-x-400-px.png"
//     },
//     {
//         eventTitle: "SEED 2025",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-04-03",
//         eventRecurrence: "Annual",
//         startTime: "7:30 pm",
//         endTime: "9:30 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "http://malashockdance.org/seed-2025/",
//         eventDescription: "An annual showcase featuring emerging choreographers and innovative performances.",
//         accessibilityNotes: "Wheelchair accessible, captioning available.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2025/01/Seed-Ticketleap-banner-960-x-400-px.png"
//     },
//     {
//         eventTitle: "SEED 2025",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-04-04",
//         eventRecurrence: "Annual",
//         startTime: "7:30 pm",
//         endTime: "9:30 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "http://malashockdance.org/seed-2025/",
//         eventDescription: "An annual showcase featuring emerging choreographers and innovative performances.",
//         accessibilityNotes: "Wheelchair accessible, captioning available.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2025/01/Seed-Ticketleap-banner-960-x-400-px.png"
//     },
//     {
//         eventTitle: "SEED 2025",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-04-05",
//         eventRecurrence: "Annual",
//         startTime: "7:30 pm",
//         endTime: "9:30 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "http://malashockdance.org/seed-2025/",
//         eventDescription: "An annual showcase featuring emerging choreographers and innovative performances.",
//         accessibilityNotes: "Wheelchair accessible, captioning available.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2025/01/Seed-Ticketleap-banner-960-x-400-px.png"
//     },
//     {
//         eventTitle: "SEED 2025",
//         eventOrganizer: "Malashock Dance",
//         eventDate: "2025-04-06",
//         eventRecurrence: "Annual",
//         startTime: "7:30 pm",
//         endTime: "9:30 pm",
//         eventLocation: "San Diego, CA",
//         eventUrl: "http://malashockdance.org/seed-2025/",
//         eventDescription: "An annual showcase featuring emerging choreographers and innovative performances.",
//         accessibilityNotes: "Wheelchair accessible, captioning available.",
//         eventImg: "https://malashockdance.org/wp-content/uploads/2025/01/Seed-Ticketleap-banner-960-x-400-px.png"
//     }
// ];

const eventsData = [
    {
        eventTitle: "S P A C E Pro Showcase",
        eventOrganizer: "Disco Riot",
        eventDate: "2025-03-28",
        eventRecurrence: "One-time",
        startTime: "7:00 pm",
        endTime: "8:00 pm",
        eventLocation: "1100 Kettner Blvd. San Diego, CA, 92101",
        eventUrl: "https://www.tickettailor.com/events/discoriot/1599788?",
        eventDescription: "Final presentation of our 2025 S P A C E Pro Residency program with Resident Artists, Radhika Karandikar and Isabel Desmet.",
        accessibilityNotes: "Wheelchair accessible, ASL interpretation available.",
        eventImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivPp3I6f-cBfIUhtl8bClVqJ-9gQPyA9LtQ&s"
    },
    {
        eventTitle: "S P A C E Pro Showcase",
        eventOrganizer: "Disco Riot",
        eventDate: "2025-03-29",
        eventRecurrence: "One-time",
        startTime: "7:00 pm",
        endTime: "8:00 pm",
        eventLocation: "1100 Kettner Blvd. San Diego, CA, 92101",
        eventUrl: "https://www.tickettailor.com/events/discoriot/1599788?",
        eventDescription: "Final presentation of our 2025 S P A C E Pro Residency program with Resident Artists, Radhika Karandikar and Isabel Desmet.",
        accessibilityNotes: "Wheelchair accessible, ASL interpretation available.",
        eventImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQivPp3I6f-cBfIUhtl8bClVqJ-9gQPyA9LtQ&s"
    },
    {
        eventTitle: "Monday Night Contact Improvisation Class and Jam",
        eventOrganizer: "Elie Dervin and Richie Villa",
        eventDate: "2025-03-03",
        eventRecurrence: "weekly",
        startTime: "5:30 pm",
        endTime: "9:30 pm",
        eventLocation: "Light Box Theater, 2590 Truxtun Road",
        eventUrl: "https://www.instagram.com/p/DGoZQPByeG1/",
        eventDescription: "A Contact Improvisation dance event with an all-levels class from 5:30pm to 6:30pm followed by an open jam from 6:30pm to 9pm.",
        accessibilityNotes: "There are two elevators required to have full access to the space without use of any stairs. The first one has ramp access from the back parking lot.",
        eventImg: ""
    }
]

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


const EventCalendar = () => {

    // Filter events to show only those that are after or on today's date
    const filterUpcomingEvents = (events) => {
        const todayDate = new Date().getTime();
        const filteredEvents = events.filter(event => new Date(event.eventDate).getTime() >= todayDate);

        // Sort events by eventDate in ascending order
        return filteredEvents.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
    };

    const upcomingEvents = filterUpcomingEvents(eventsData);

    // Group events by their eventDate
    const eventsByDate = upcomingEvents.reduce((acc, event) => {
        if (!acc[event.eventDate]) {
            acc[event.eventDate] = [];
        }
        acc[event.eventDate].push(event);
        return acc;
    }, {});

    // Group events by month-year (e.g., "February 2025")
    const eventsByMonth = upcomingEvents.reduce((acc, event) => {
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


    return (
        <div className="event-calendar-container">
            {Object.keys(eventsByMonth).map((monthYear) => (
                <div key={monthYear} className="event-month-group">
                    <h2 className="event-month-header">{monthYear}</h2>
                    <hr />
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
    );
};

const EventCard = ({ event }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`event-card-content ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
            {/* Event Image */}
            <div className="event-card-header">
                { event.eventImg !== ""
                    && <div className="event-card-img-container">
                        <img src={event.eventImg} alt="Event" />
                    </div>
                }

                <div className="event-card-body">
                    <div>
                        <h3 className="event-title">{event.eventTitle}</h3>
                        <p className="event-location">{event.eventLocation}</p>
                        <p className="event-time">{event.startTime} - {event.endTime}</p>
                    </div>
                </div>
            </div>

            <div>
                {/* Event Details */}
                <div className="event-details">
                    {isOpen && (
                        <>
                            <p>{event.eventDescription}</p>
                            <br />
                            <p><strong>Organizer:</strong>  <br />{event.eventOrganizer}</p>
                            <br />
                            <p><strong>Accessibility Notes:</strong>  <br />{event.accessibilityNotes}</p>
                            <button className="learn-more-btn" onClick={() => window.open(event.eventUrl, "_blank")}>
                                Learn More
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};



export default EventCalendar;
