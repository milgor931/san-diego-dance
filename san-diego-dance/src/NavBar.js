import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(false); // State to track mobile menu toggle
    const navRef = useRef(null); // Reference to the nav element
    const buttonRef = useRef(null); // Reference to the button element

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsMobile(!isMobile);
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
                <a href="/">
                    {/* <img src="/assets/logo.png" alt="San Diego Dance Logo" /> */}
                </a>
                <h1>San Diego Dance</h1>
            </div>
            <nav
                ref={navRef}
                className={`nav-links ${isMobile ? "mobile active" : ""}`}
            >
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/events">Events</a></li>
                    <li><a href="/">Classes</a></li>
                    <li><a href="/">Resources</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </nav>
            <button
                ref={buttonRef}
                className="menu-toggle"
                onClick={toggleMenu}
            >
                {isMobile ? "x" : "☰"}
            </button>
            
            {/* Overlay */}
            <div className={`overlay ${isMobile ? "active" : ""}`} onClick={() => setIsMobile(false)}></div>
        </header>
    );
};

export default Navbar;
