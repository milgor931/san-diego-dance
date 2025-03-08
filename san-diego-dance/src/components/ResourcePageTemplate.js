import React, { useState, useEffect } from "react";
import "./ResourcePageTemplate.css";
import { Link } from "react-router-dom";

const ResourcePageTemplate = ({ title, tag }) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetch("https://san-diego-dance-default-rtdb.firebaseio.com/resources.json")
            .then(response => response.json())
            .then(data => {
                let resourcesData = Object.values(data);

                const filteredResources = resourcesData
                    .filter(resource => resource.tags.includes(tag) && resource.approved)
                    .map(resource => ({
                        ...resource,
                        tags: resource.tags.split(",")
                    }));

                setResources(filteredResources);
            })
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    return (
        <div className="resource-page-container">
            <div className="heading">
                <Link to="/resources">
                    <button className="go-back-button"><i class="fa-solid fa-arrow-left"></i></button>
                </Link>
                <h1 className="title">{title}</h1>
            </div>

            {resources.length > 0
                ? <div className="resource-list">

                    {resources.map((resource, index) => (
                        <a
                            key={index}
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resource-card"
                        >
                            <h2 className="resource-name">{resource.name}</h2>
                            <p className="resource-description">{resource.description}</p>
                            {resource.tags.map((tag, index) => (
                                <span key={index} className="resource-tag">{tag}</span>
                            ))}
                        </a>
                    ))}
                </div>
                : <span>No resources uploaded yet</span>

            }


        </div>
    );
};

export default ResourcePageTemplate;
