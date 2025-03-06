import React, { useState } from "react";
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
            <div>
                <h2>Subscribe to Our Monthly Newsletter</h2>
                <p>Sign up for exclusive access to upcoming events, promotions, and workshops.</p>
                <div className="mc-field-group">
                    <input
                        type="email"
                        name="EMAIL"
                        className="required email"
                        id="mce-EMAIL"
                        required
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                </div>
                <div id="mce-responses" className="clear foot">
                    <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                    <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
                </div>
                <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                    <input type="text" name="b_3d2528d4224f356e743a0a516_d096182982" tabIndex="-1" value="" />
                </div>
            </div>
        </form>
    );
};

export default MailchimpForm;
