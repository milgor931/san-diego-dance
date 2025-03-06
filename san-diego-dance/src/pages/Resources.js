import React from "react";
import "./Resources.css";
import { Link } from "react-router-dom";
import NewsletterSignupForm from "../components/NewsletterSignupForm"

const resourceSections = [
    {
        title: "Grants",
        description: "Funding opportunities for artists and performers.",
        image: "https://i.ibb.co/prbbVqqV/Grants.png",
        link: "/grants",
    },
    {
        title: "Professional Development",
        description: "Workshops, mentorships, and career growth.",
        image:
            "https://i.ibb.co/nMBC6WRp/Professional-Development.png",
        link: "/professional-development",
    },
    {
        title: "Job Opportunities",
        description: "Explore current dance-related job listings.",
        image:
            "https://i.ibb.co/tp81kk8j/Job-Opportunities.png",
        link: "/jobs",
    },
    {
        title: "Spaces",
        description: "Rehearsal and performance spaces in San Diego.",
        image:
            "https://i.ibb.co/spH7SyRY/Spaces.png",
        link: "/spaces",
    },
    {
        title: "Volunteer Opportunities",
        description: "Get involved with local community events.",
        image: "https://i.ibb.co/hxVXV5yn/Volunteer-Opportunities.png",
        link: "/volunteer",
    },
    {
        title: "Collaboration",
        description: "Collaborate with artists, performers, and tech creators.",
        image:
            "https://i.ibb.co/tTGQWV7W/Collaboration.png",
        link: "/collaboration",
    },
];

const Resources = () => {

    return (
        <div className="page resources">

            <div className="heading">
                <h1>Resources</h1>
                <p>Your Community Toolkit</p>
            </div>

            <div className="gallery">
                {resourceSections.map((resource, index) => (
                    <div className="image-container" key={index}>
                        <Link to={resource.link}>
                            <img src={resource.image} alt={resource.title} />
                            <div className="image-overlay">
                                <h3>{resource.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="newsletter-signup-form">
                <NewsletterSignupForm />
            </div>
        </div>
    );
};

export default Resources;
