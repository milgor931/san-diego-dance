import React, { useEffect, useState } from 'react';
import './Community.css'; // Create a CSS file for styling
import CommunityForm from '../components/CommunityForm';

const Community = () => {
    const [showCards, setShowCards] = useState(false);
    const [people, setPeople] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);

    useEffect(() => {
        setTimeout(() => setShowCards(true), 500);

        fetch("https://san-diego-dance-default-rtdb.firebaseio.com/community-members.json")
            .then(response => response.json())
            .then(data => {
                let peopleData = Object.values(data);

                const filteredPeople = peopleData.filter(person => person.approved);

                setPeople(shuffleArray([...filteredPeople]));
            })
            .catch(error => console.error("Error fetching events:", error));
    }, []);

    const loadMore = () => {
        setVisibleCount(visibleCount + 20); // Load 20 more members when clicked
    };


    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    return (
        <div className="community">
            <div className="heading">
                <h1>Meet Our Community</h1>
                <p>Let's connect with one another and move together.</p>
                <button className="scroll-to-form" onClick={() => document.getElementById('join-community').scrollIntoView({ behavior: 'smooth' })}>
                    Join the Community
                </button>
            </div>

            <div className={`community-cards ${showCards ? 'show' : ''}`}>
                {people.slice(0, visibleCount).map((member, index) => (
                    <div className="community-card" key={index}>
                        <div className="profile-image">
                            {member.image === ""
                                ?
                                <img src="/assets/profile-default.png" alt="Profile picture" />
                                :
                                <img src={member.image} alt={member.name} />
                            }
                        </div>
                        <div className="card-content">
                            <h2>{member.name}</h2>
                            <p className="title">{member.title}</p>
                            <p className="bio">{member.bio}</p>
                            <div className="social-links">
                                {member.website !== "" && <a href={member.website} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>}
                                {member.linkedin !== "" && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
                                {member.instagram !== "" && <a href={member.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < people.length && (
                <button onClick={loadMore} className="load-more-btn">
                    Load More
                </button>
            )}

            <CommunityForm />
        </div>
    );
};

export default Community;
