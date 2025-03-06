import React from 'react';
import './Home.css';
import NewsletterSignupForm from '../components/NewsletterSignupForm';
import Donate from '../components/Donate';


const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <div>
                    <h1>Where San Diego Dances Together</h1>
                    <p>More Than Movement—A Community.</p>
                </div>
            </section>

            {/* Subscription Section */}
            <section id="newsletter-signup" className="subscription">
                <NewsletterSignupForm />
            </section>

            {/* Community Engagement Section */}
            <section className="community">
                <div className="heading">
                    <h2>A Passion for Community</h2>
                    <p>Where San Diego Dance Comes Together—Your All-in-One Resource!</p>
                </div>

                <div className="community-grid">
                    <div className="community-item">
                        <h3>Engage with the Community</h3>
                        <p>Become part of San Diego’s dynamic dance network.</p>
                    </div>
                    <div className="community-item">
                        <h3>Take Classes & Workshops</h3>
                        <p>Access diverse dance classes to enhance your skills.</p>
                    </div>
                    <div className="community-item">
                        <h3>Build Lifelong Connections</h3>
                        <p>Meet fellow dancers, choreographers, and industry professionals.</p>
                    </div>
                    <div className="community-item">
                        <h3>Professional Development Resources</h3>
                        <p>Take advantage of mentorship, training, and industry insights.</p>
                    </div>
                </div>
            </section>

            <Donate />

            {/* Resources Section */}
            {/* <section className="resources">
        <h2>An Array of Resources</h2>
        <p>Grow as a dancer with funding opportunities, job listings, and more.</p>
      </section> */}

            {/* Newsletter Section */}
            {/* <section className="newsletter">
        <h2>Weekly Newsletter</h2>
        <ul>
          <li>✓ Weekly Events & Classes</li>
          <li>✓ Dance Articles & Insights</li>
          <li>✓ Community Member Highlight</li>
        </ul>
        <blockquote>“I’m not interested in how people move, but what moves them.” - Pina Bausch</blockquote>
      </section> */}
        </div>
    );
};

export default Home;
