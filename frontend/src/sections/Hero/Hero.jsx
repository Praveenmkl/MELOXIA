import React from 'react'
import Hero from '../../assets/hero_enhance2.webp'
import './Hero.css'

function HeroSection() {
  const handleGetStartedClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hero-section">
        <img src={Hero} alt="Hero" className="hero-image" />
        <div className="hero-content">
          <button className="btn-get-started" onClick={handleGetStartedClick}>Get Started</button>
        </div>
    </div>
  )
}

export default HeroSection