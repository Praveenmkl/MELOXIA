import React from 'react';
import './Footer.css';
import Logo from '../../assets/logo_up.png';

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* Header */}
        <div className="footer-header">
          <h2 className="footer-title">Meloxia — Creative Digital Studio</h2>
          <p className="footer-description">
            Crafting clean, modern, and meaningful digital experiences through UI/UX, web development, and visual design.
          </p>
        </div>

        {/* Logo */}
        <div className="footer-logo">
          <img src={Logo} alt="Meloxia Logo" />
        </div>

        {/* Divider Line */}
        <div className="footer-divider"></div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© 2025 Meloxia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;