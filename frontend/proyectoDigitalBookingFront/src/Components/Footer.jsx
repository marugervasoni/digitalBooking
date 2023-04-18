import React from "react";
import "../styles/footer.css";
import "../index.css";

const Footer = () => {
  return (
    <footer>
      <p className="textoFooter">©2023 Digital Booking</p>

      <div className="logos">
        <img className="logoFooter" src="/img/facebook.png" alt="Facebook" />
        <img className="logoFooter" src="/img/linkedin.png" alt="Linkedin" />

        <img className="logoFooter" src="/img/tweet.png" alt="Twitter" />
        <img className="logoFooter" src="/img/ig.png" alt="Instagram" />
      </div>
    </footer>
  );
};

export default Footer;
