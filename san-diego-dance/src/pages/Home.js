import React from "react";
import "./Home.css";
import NewsletterSignupForm from "../components/NewsletterSignupForm";
import Donate from "../components/Donate";
import BulletinBoard from "../components/BulletinBoard";

import { motion } from "framer-motion";

const Home = () => {
    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1>Where San Diego Dances Together</h1>
                    <p>More Than Movement—A Community.</p>
                </motion.div>
            </section>

            <BulletinBoard />

            {/* Subscription Section */}
            <section id="newsletter-signup" className="subscription">
                <NewsletterSignupForm />
            </section>

            {/* Community Engagement Section */}
            <section className="community">
                <div className="heading">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        A Passion for Community
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Where San Diego Dance Comes Together—Your All-in-One Resource!
                    </motion.p>
                </div>

                <motion.div
                    className="community-grid"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } }
                    }}
                >
                    {[
                        { title: "Engage with the Community", text: "Become part of San Diego’s dynamic dance network." },
                        { title: "Take Classes & Workshops", text: "Access diverse dance classes to enhance your skills." },
                        { title: "Build Lifelong Connections", text: "Meet fellow dancers, choreographers, and industry professionals." },
                        { title: "Professional Development Resources", text: "Take advantage of mentorship, training, and industry insights." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="community-item"
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            <div className="donate-section">
                <Donate />
            </div>

        </div>
    );
};

export default Home;
