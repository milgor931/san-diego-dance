import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Resources Section */}
                <div className="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><Link to="/grants">Grants</Link></li>
                        <li><Link to="/jobs">Job Opportunities</Link></li>
                        <li><Link to="/volunteer">Volunteer Opportunities</Link></li>
                        <li><Link to="/professional-development">Professional Development</Link></li>
                        <li><Link to="/spaces">Spaces</Link></li>
                        <li><Link to="/collaboration">Collaboration</Link></li>
                    </ul>
                </div>

                {/* Community & Engagement Section */}
                <div className="footer-section">
                    <h4>Community</h4>
                    <ul>
                        <li><Link to="/events">Community Events</Link></li>
                        <li><HashLink smooth to="/events#add-event">Add an Event</HashLink></li>
                        <li><HashLink smooth to="/community#join-community">Join the Community Board</HashLink></li>
                        <li><HashLink smooth to="/#newsletter-signup">Sign up for the Monthly Newsletter</HashLink></li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="footer-section">
                    <h4>Support</h4>
                    <ul>
                        <li><HashLink smooth to="/#donate">Donate</HashLink></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social Media & Contact Section */}
                {/* <div className="footer-section social-section">
                    <h4>Connect</h4>
                    <div className="social-icons">
                        <a href="#" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-envelope"></i></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    </div>
                </div> */}
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                {/* <p>Website made by <a href="https://www.milana-gorobchenko.com" target="_blank" className="footer-link"> Milana Gorobchenko</a></p> */}
                <p>Website made by Milana Gorobchenko</p>
            </div>
        </footer>
    );
};

export default Footer;
