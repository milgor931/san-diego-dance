import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import "./BulletinBoard.css";

import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const BulletinBoard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch("https://san-diego-dance-default-rtdb.firebaseio.com/events.json")
            .then((res) => res.json())
            .then((data) => {
                const now = DateTime.now().setZone("America/Los_Angeles");
                const all = Object.values(data);
                const approvedUpcoming = all.filter((event) => {
                    const eventDateTime = DateTime.fromISO(`${event.eventDate}T${event.eventStartTime}`, { zone: "America/Los_Angeles" });
                    return eventDateTime >= now && event.approved;
                });

                const currentMonthEvents = approvedUpcoming.filter((event) => {
                    const eventDate = DateTime.fromISO(event.eventDate, { zone: "America/Los_Angeles" });
                    return eventDate.month === now.month && eventDate.year === now.year;
                });

                setEvents(currentMonthEvents.slice(0, 6)); // limit to first few
            });
    }, []);

    return (
        <section className="bulletin-board">

            <div className="bulletin-header">
                <h2 className="bulletin-title">Community Bulletin Board</h2>
                <span>Visit <Link to="/events">events</Link> to view and add events</span>
            </div>


            {/* <div className="bulletin-links">
                <Link to="/events">Community Events</Link>
                <HashLink smooth to="/events#add-event">Add an Event</HashLink>
            </div> */}


            <div className="bulletin-grid">
                {events.map((event, index) => (
                    <motion.div
                        key={index}
                        className="bulletin-item"
                        whileHover={{ rotate: [0, 1.5, -1.5, 1.5, 0], transition: { duration: 0.6 } }}
                        onClick={() => window.open(event.eventUrl, '_blank')}
                    >
                        <img src="/assets/pin.svg" alt="pin" className="bulletin-pin" />
                        <img src={event.eventImg} alt={event.eventTitle} className="bulletin-img" />
                        <div className="bulletin-caption">
                            <h4>{event.eventTitle}</h4>
                            {/* <p>{DateTime.fromISO(event.eventDate).toFormat("cccc, LLL d")}</p> */}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default BulletinBoard;