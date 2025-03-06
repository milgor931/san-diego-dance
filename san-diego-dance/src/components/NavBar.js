import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";
import { HashLink } from 'react-router-hash-link';

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
                {/* <Link to="/"><img src="/assets/logo-bg.png"/></Link> */}
                <h1><Link to="/">San Diego Dance</Link></h1>
            </div>
            <nav
                ref={navRef}
                className={`nav-links ${isMobile ? "mobile active" : ""}`}
            >
                {isMobile
                    ? <ul>
                        <li><Link to="/" onClick={closeMenu}></Link></li>
                        <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
                        <hr />
                        <li><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
                        <li className="indented"><Link to="/grants" onClick={closeMenu} >Grants</Link></li>
                        <li className="indented"><Link to="/jobs"  onClick={closeMenu} >Job Opportunities</Link></li>
                        <li className="indented"><Link to="/volunteer"  onClick={closeMenu} >Volunteer Opportunities</Link></li>
                        <li className="indented"><Link to="/professional-development"  onClick={closeMenu} >Professional Development</Link></li>
                        <li className="indented"><Link to="/spaces"  onClick={closeMenu} >Spaces</Link></li>
                        <li className="indented"><Link to="/collaboration"  onClick={closeMenu} >Collaboration</Link></li>
                        <hr />
                        <li><Link to="/community" onClick={closeMenu}>Community</Link></li>
                        <li className="indented"><HashLink smooth to="/community#join-community"  onClick={closeMenu} >Join the Community Board</HashLink></li>
                        <li className="indented"><HashLink smooth to="/#newsletter-signup" onClick={closeMenu}>Sign up for the Monthly Newsletter</HashLink></li>
                        <hr />
                        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                        <hr />
                        <li><HashLink smooth to="/#donate" onClick={closeMenu} >Donate</HashLink></li>
                    </ul>
                    : <ul>
                        <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link to="/events" onClick={closeMenu}>Events</Link></li>
                        <li><Link to="/resources" onClick={closeMenu}>Resources</Link></li>
                        <li><Link to="/community" onClick={closeMenu}>Community</Link></li>
                        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                    </ul>
                }
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
