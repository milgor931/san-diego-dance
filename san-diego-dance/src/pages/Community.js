import React, { useEffect, useState } from 'react';
import './Community.css'; // Create a CSS file for styling


// Sample data for 20 profiles
const communityMembers = [
    {
        name: 'Anna Medina',
        title: 'Teacher and Choreographer',
        image: 'https://malashockdance.org/wp-content/uploads/2024/11/Carla-Alcantara-Anna-Fernanda-Medina-683x1024.png',
        website: 'https://johndoe.com',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        instagram: 'https://www.instagram.com/johndoe',
        bio: 'Executive Director of Sylvia\’s Dance Studio, is an award-winning choreographer recognized in San Diego and Tijuana.'
    },
    {
        name: 'Briele Melahn',
        title: 'San Diego Artist',
        image: 'https://malashockdance.org/wp-content/uploads/2024/11/Briele-Melahn.-Headshot-photo-Alejandro-Sanchez-Briele-Melahn-2-1024x978.jpg',
        website: 'https://janesmithart.com',
        linkedin: 'https://www.linkedin.com/in/janesmith',
        instagram: 'https://www.instagram.com/janesmithart',
        bio: 'A passionate artist who combines traditional techniques with digital tools.'
    },
    {
        name: 'Erik Jaimes',
        title: 'Dancer and Choreographer',
        image: 'https://discoriot.org/wp-content/uploads/2025/02/unnamed-e1740431774738-650x650.jpg',
        website: 'https://michaelbrown.dev',
        linkedin: 'https://www.linkedin.com/in/michaelbrown',
        instagram: 'https://www.instagram.com/michaelbrowndev',
        bio: 'A 22-year-old dancer and choreographer from San Diego who has honed his craft for nearly a decade.'
    },
    {
        name: 'Cecily Holcombe',
        title: 'Performer and Choreographer',
        image: 'https://malashockdance.org/wp-content/uploads/2024/11/Cecily-Holcombe-photo-by-Doug-McMinimy-Cecily-Holcombe-963x1024.png',
        website: 'https://sarahleeux.com',
        linkedin: 'https://www.linkedin.com/in/sarahlee',
        instagram: 'https://www.instagram.com/sarahleeux',
        bio: 'San Diego-based dancer and choreographer, set to present at ODC in 2025.'
    },
    {
        name: 'Milana Gorobchenko',
        title: 'Multidisciplinary Artist',
        image: 'https://discoriot.org/wp-content/uploads/2025/02/Dance-Headshot-Milana-Gorobchenko-scaled-e1740431864709-650x650.jpg',
        website: 'https://milana-gorobchenko.com',
        linkedin: 'https://www.linkedin.com/in/milana-gorobchenko-705bb1161/',
        instagram: 'https://www.instagram.com/mila_gro02/',
        bio: 'An interdisciplinary artist blending dance and technology to explore humanity\’s evolving relationship with the modern world.'
    },
    {
        name: 'Ilyana Hughes',
        title: 'Dancer and Choreographer',
        image: 'https://discoriot.org/wp-content/uploads/2025/02/IMG_3248-e1740431746611-650x650.jpeg',
        website: 'https://johndoe.com',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        instagram: 'https://www.instagram.com/johndoe',
        bio: 'Ilyana Hughes is a San Diego-based dancer and choreographer from Dayton, Ohio.'
    },
    {
        name: 'Niza Galindo',
        title: 'Dancer',
        image: 'https://discoriot.org/wp-content/uploads/2025/02/438125001_1163419738031220_8046230352319678076_n-e1740431922466-650x650.jpg',
        website: 'https://janesmithart.com',
        linkedin: 'https://www.linkedin.com/in/janesmith',
        instagram: 'https://www.instagram.com/janesmithart',
        bio: 'A San Diego-based dancer with a B.A. in Dance from California State University, Long Beach.'
    }
];

const Community = () => {
    const [showCards, setShowCards] = useState(false);
    const [people, setPeople] = useState([]);
    const [visibleCount, setVisibleCount] = useState(10);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        image: '',
        website: '',
        linkedin: '',
        instagram: '',
        bio: ''
    });

    useEffect(() => {
        setTimeout(() => setShowCards(true), 500);
        setPeople(shuffleArray([...communityMembers]));
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPeople([formData, ...people]);
        setFormData({ name: '', title: '', image: '', website: '', linkedin: '', instagram: '', bio: '' });
    };

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
                            <img src={member.image} alt={member.name} />
                        </div>
                        <div className="card-content">
                            <h2>{member.name}</h2>
                            <p className="title">{member.title}</p>
                            <p className="bio">{member.bio}</p>
                            <div className="social-links">
                                {member.website && <a href={member.website} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe"></i></a>}
                                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
                                {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
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

            <div id="join-community" className="community-form-container gradient">
                <div className="form-heading">
                    <h1>Join the Community</h1>
                    <p>Fill out your details to get on the community board.</p>
                </div>
                <form className="community-form" onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
                    <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
                    <input type="text" name="linkedin" placeholder="LinkedIn" value={formData.linkedin} onChange={handleChange} />
                    <input type="text" name="instagram" placeholder="Instagram" value={formData.instagram} onChange={handleChange} />
                    <textarea name="bio" placeholder="Short bio (100 characters)" value={formData.bio} onChange={handleChange} maxLength="100" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Community;
