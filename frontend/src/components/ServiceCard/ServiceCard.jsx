import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ title, image }) => {
  return (
    <div className="service-card">
      <div className="service-image-container">
        <img src={image} alt={title} className="service-image" />
      </div>
      <h3 className="service-title">{title}</h3>
    </div>
  );
};

export default ServiceCard;
