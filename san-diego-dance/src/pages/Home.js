import React from "react";
import "./Home.css";
import NewsletterSignupForm from "../components/NewsletterSignupForm";
import Donate from "../components/Donate";
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

            {/* Subscription Section */}
            <section id="newsletter-signup" className="subscription">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <NewsletterSignupForm />
                </motion.div>
            </section>



            {/* SVG Blob Transition */}
            {/* <div className="wave-container flip">
                <svg viewBox="0 0 1440 320">
                    <path fill="#3498db" d="M0,256L48,229.3C96,203,192,149,288,133.3C384,117,480,139,576,160C672,181,768,203,864,181.3C960,160,1056,96,1152,101.3C1248,107,1344,181,1392,218.7L1440,256L1440,320L0,320Z"></path>
                </svg>
            </div> */}

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

            {/* Final Wave */}
            <div className="wave-container">
                <svg viewBox="0 0 1440 320">
                    <path fill="#2c3e50" d="M0,224L48,234.7C96,245,192,267,288,245.3C384,224,480,160,576,144C672,128,768,160,864,192C960,224,1056,256,1152,245.3C1248,235,1344,181,1392,154.7L1440,128L1440,320L0,320Z"></path>
                </svg>
            </div>

        </div>
    );
};

export default Home;
