import React from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import UIUX from '../../assets/3.webp';
import manipulation from '../../assets/4.webp';
import social_media from '../../assets/2.webp';
import brand_identity from '../../assets/1.webp';
import './Services.css';

const Services = () => {
  // Data for the four services.
  // NOTE: Replace the 'image' URLs with your actual local image paths (e.g., from src/assets/images/)
  const servicesData = [
    {
      title: "Branding & Identity",
      image: brand_identity
    },
    {
      title: "UI/UX\n& Web Design",
      image: UIUX
    },
    {
      title: "Social Media\n& Marketing Designs",
      image: social_media
    },
    {
      title: "Merchandise & Print Designs",
      image: manipulation
    }
  ];

  return (
    <section className="services-section">
      
      {/* Section Title */}
      <h2 className="services-title">
        MELOXIA Services
      </h2>

      {/* Services Grid */}
      <div className="services-grid">
        {servicesData.map((service, index) => (
          <ServiceCard 
            key={index} 
            title={service.title} 
            image={service.image} 
          />
        ))}
      </div>

      {/* Bottom Description Text */}
      <p className="services-description">
        Meloxia creates modern, impactful digital experiences delivering clean web solutions, UI/UX designs, and creative content that bring your ideas to life.
      </p>
      
    </section>
  );
};

export default Services;