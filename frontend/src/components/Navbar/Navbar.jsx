import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import './Navbar.css';
import Logo from "../../assets/logo_up.png";
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onSignUpClick }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="meloxia-navbar">
      
      {/* --- TOP BAR --- */}
      <div className="top-bar">
        <div className="contact-container">
          
          {/* Phone Number */}
          <div className="contact-item">
            <FaPhoneAlt size={12} />
            <span>+94 74 292 69 78</span>
          </div>

          <span className="divider">|</span>

          {/* Email Address */}
          <div className="contact-item">
            <FaEnvelope size={12} />
            <a href="mailto:meloxia99@gmail.com" className="contact-link">
              meloxiastudio99@gmail.com
            </a>
          </div>

        </div>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="main-nav">
        
        {/* 1. LOGO */}
        <div className="logo-container">
          {/* Simulating the 'M' Logo Box */}
          <div className="logo-box">
            <img src={Logo} alt="Meloxia Logo" />
          </div>
        </div>

        {/* Hamburger Menu Icon */}
        <button className="hamburger-menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* 2. NAVIGATION LINKS */}
        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <li className="nav-item home" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>Home</li>
          <li className="nav-item" onClick={() => scrollToSection('about')} style={{ cursor: 'pointer' }}>About</li>
          <li className="nav-item" onClick={() => scrollToSection('services')} style={{ cursor: 'pointer' }}>Services</li>
          <li className="nav-item" onClick={() => scrollToSection('contact')} style={{ cursor: 'pointer' }}>Contact Us</li>
        </ul>

        {/* 3. USER INFO OR SIGN IN BUTTON */}
        <div className="auth-section">
          {isAuthenticated ? (
            <div className="user-info">
              <div className="user-greeting">
                <FaUserCircle size={20} />
                <span className="user-name">Hi, {user?.name?.split(' ')[0] || 'User'}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout} title="Logout">
                <IoLogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="btn-signup" onClick={onSignUpClick}>
              Sign in
            </button>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;