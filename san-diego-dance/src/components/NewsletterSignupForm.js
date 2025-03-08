import React, { useState } from "react";
import { motion } from "framer-motion"; // Import motion for animations
import "./NewsletterSignupForm.css"; // External CSS for styles

const MailchimpForm = () => {
    const [email, setEmail] = useState("");

    return (
        <form
            action="https://san-diego-dance.us20.list-manage.com/subscribe/post?u=3d2528d4224f356e743a0a516&amp;id=d096182982&amp;f_id=00bf51e6f0"
            method="post"
            id="mc-embedded-subscribe-form"
            className="newsletter-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
        >
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h2>Subscribe to Our Monthly Newsletter</h2>
                <p>Sign up for exclusive access to upcoming events, promotions, and workshops.</p>
            </motion.div>

            <div className="mc-field-group">
                <motion.input
                    type="email"
                    name="EMAIL"
                    className="required email"
                    id="mce-EMAIL"
                    required
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    whileFocus={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                />
                <motion.input
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                    value="Subscribe"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                />
            </div>

            <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
            </div>
            <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input type="text" name="b_3d2528d4224f356e743a0a516_d096182982" tabIndex="-1" value="" />
            </div>
        </form>
    );
};

export default MailchimpForm;
