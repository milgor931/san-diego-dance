import React from "react";
import "./Donate.css";

const PayPalDonate = () => {
  return (
    <div id="donate" className="paypal-donate">
      <h2>Support San Diego Dance</h2>
      <p>Your donation helps <strong>sustain and grow</strong> San Diego Dance, fostering a vibrant, inclusive community for artists and movement lovers.</p>
      <p>Contributions support our <strong>website, newsletter, collaborations, and efforts to make dance more accessible.</strong></p>
      <p>By giving, you invest in local artists, champion inclusivity, and keep San Diego’s dance scene alive.</p>
      <p>Every donation makes a difference—help us keep dance thriving!</p>

      <a
        href="https://www.paypal.com/donate/?business=672QG4GUL2MTL&no_recurring=0&item_name=Your+donation+sustains+and+grows+San+Diego+Dance%2C+fostering+a+thriving%2C+inclusive+community+for+artists+and+movement+lovers.+&currency_code=USD"
        target="_blank"
        rel="noopener noreferrer"
        className="donate-button"
      >
        Donate Now
      </a>
    </div>
  );
};

export default PayPalDonate;
