import React, { useState } from "react";
import './EventCalendar.css';

// Example events data with more variety
const eventsData = [
    {
        eventTitle: "Salsa Night at the Park",
        eventOrganizer: "San Diego Salsa Community",
        eventDate: "2025-02-28",
        eventRecurrence: "Monthly",
        startTime: "18:00",
        endTime: "21:00",
        eventLocation: "Balboa Park, San Diego, CA",
        eventUrl: "https://salsanight.com",
        eventDescription: "Join us for a monthly salsa night with live music, great food, and amazing dancing under the stars.",
        accessibilityNotes: "Wheelchair accessible, close to public transportation.",
        eventImg: "https://img.freepik.com/free-photo/dynamic-portrait-young-man-woman-dancing-hiphop-isolated-black-background-with-mixed-lights-effect_155003-46269.jpg"
    },
    {
        eventTitle: "Hip-Hop Dance Battle",
        eventOrganizer: "Urban Dance Collective",
        eventDate: "2025-02-28",
        eventRecurrence: "One Time",
        startTime: "14:00",
        endTime: "18:00",
        eventLocation: "Downtown Convention Center, San Diego, CA",
        eventUrl: "https://hiphopbattle.com",
        eventDescription: "A high-energy battle where the best hip-hop dancers face off for the title.",
        accessibilityNotes: "ADA compliant venue, assistive listening devices available.",
        eventImg: "https://d1hiuxmcwdcfq9.cloudfront.net/_next/image?url=https%3A%2F%2Ffiles.ailey.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fdefault%2Fpublic%2F2024-08%2FAlvin%2520Ailey%2520American%2520Dance%2520Theater.%2520Photo%2520by%2520Dario%2520Calmese_vertical.jpg%3Fh%3D929300ca%26itok%3DqBZeU-3o&w=3840&q=75"
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
        eventImg: "https://images.pexels.com/photos/175658/pexels-photo-175658.jpeg?cs=srgb&dl=pexels-punttim-175658.jpg&fm=jpg"
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
        eventImg: "https://images.pexels.com/photos/1701202/pexels-photo-1701202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
        eventImg: "https://images2.alphacoders.com/203/203492.jpg"
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
        eventImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS5T-xU6aG6lR4jclmlj5mG6tl8J9MIt5DVA&s"
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
        eventImg: "https://w0.peakpx.com/wallpaper/680/660/HD-wallpaper-classical-dance-india-painting.jpg"
    },
    {
        eventTitle: "Jazz Dance Performance",
        eventOrganizer: "Jazz Dance Theater",
        eventDate: "2025-02-27",
        eventRecurrence: "One Time",
        startTime: "19:00",
        endTime: "21:00",
        eventLocation: "Theater Arts Center, 678 Jazz Blvd, San Diego, CA",
        eventUrl: "https://jazzdancetheater.com",
        eventDescription: "An inspiring jazz dance performance featuring local dancers.",
        accessibilityNotes: "Wheelchair accessible seating available.",
        eventImg: "https://malashockdance.org/wp-content/uploads/2022/03/Malashock-Signatures-585-Jim-Carmody-1024x576-1.jpg"
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
        eventImg: "https://png.pngtree.com/thumb_back/fh260/background/20241126/pngtree-vibrant-indian-dance-performance-motion-blur-photography-image_16642427.jpg"
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
        eventImg: "https://malashockdance.org/wp-content/uploads/2022/03/29339953_1526337074155772_6585450745400386182_n-2.jpg"
    }
]

// Function to format the date as "January 23, 2025"
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Los_Angeles' // Specifies PST (Pacific Time Zone)
    });
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
        <div className="event-card-content" onClick={toggleAccordion}>
            {/* Event Image */}
            <div className="event-card-img-container">
                <img src={event.eventImg || "fallback-image.jpg"} alt="Event" />
            </div>

            <div className="event-card-body">
                <h3 className="event-title">{event.eventTitle}</h3>
                <p className="event-date">{event.startTime} - {event.endTime}</p>
                <p className="event-location">{event.eventLocation}</p>

                {isOpen && (
                    <div className="event-details">
                        <p>{event.eventDescription}</p>
                        <p><strong>Organizer:</strong> {event.eventOrganizer}</p>
                        <p><strong>Accessibility Notes:</strong> {event.accessibilityNotes}</p>
                        <button className="learn-more-btn" onClick={() => window.open(event.eventUrl, "_blank")}>
                            Learn More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventCalendar;
