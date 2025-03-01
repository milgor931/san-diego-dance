import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false); // State to track mobile menu toggle
    const navRef = useRef(null); // Reference to the nav element
    const buttonRef = useRef(null); // Reference to the button element

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsMobile(!isMobile);
    };

    // Function to close the menu when a link is clicked
    const closeMenu = () => {
        setIsMobile(false);
    };

    // Close the menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                navRef.current &&
                !navRef.current.contains(event.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsMobile(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <header className="navbar">
            <div className="logo">
                <h1>San Diego Dance</h1>
            </div>
            <nav
                ref={navRef}
                className={`nav-links ${isMobile ? "mobile active" : ""}`}
            >
                <ul>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
                    <li><Link to="/" onClick={closeMenu}>Classes</Link></li>
                    <li><Link to="/" onClick={closeMenu}>Resources</Link></li>
                    <li><Link to="/" onClick={closeMenu}>Contact</Link></li>
                </ul>
            </nav>

            <span ref={buttonRef}
                className="menu-toggle"
                onClick={toggleMenu}>
                    ☰
            </span>

            {/* Overlay */}
            <div className={`overlay ${isMobile ? "active" : ""}`} onClick={closeMenu}></div>
        </header>
    );
};

export default Navbar;
