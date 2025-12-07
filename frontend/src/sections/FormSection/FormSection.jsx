import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { MdPerson, MdPhone, MdEmail, MdDescription } from 'react-icons/md';
import { FaServicestack } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './FormSection.css';

export default function FormSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    service: '',
    phone: '',
    email: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  // Initialize EmailJS with public key
  useEffect(() => {
    emailjs.init('RmlIA36uowl-00_Oi');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    // EmailJS configuration
    const serviceID = 'service_fnjgq8v';
    const templateID = 'template_e0xfj3h';

    // Prepare template parameters
    const templateParams = {
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.details,
      to_name: 'Meloxia Studio',
    };

    try {
      const result = await emailjs.send(serviceID, templateID, templateParams);
      console.log('Email sent successfully:', result);
      
      setSubmitMessage({ 
        type: 'success', 
        text: 'Your message has been sent successfully! We will get back to you soon.' 
      });
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        service: '',
        phone: '',
        email: '',
        details: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: `Failed to send message: ${error.text || 'Please try again later.'}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-section">
      <div className="form-container">
        {/* Header Section */}
        <div className="form-header">
          <h1 className="form-title">
            Ready To Start Your Project
          </h1>
          <p className="form-subtitle">
            Tell us what you need, and we'll create the perfect solution.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="contact-form">
          
          {/* Full Name */}
          <div className="input-wrapper">
            <MdPerson className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Select Service Dropdown */}
          <div className="select-wrapper">
            <FaServicestack className="input-icon" />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>Select Service</option>
              <option value="web-dev">Branding and Identity</option>
              <option value="app-dev">Social media and Marketing Designs</option>
              <option value="design">UI/UX Design and Web Design</option>
              <option value="marketing">Merchandise & Print Designs</option>
            </select>
            <div className="select-icon">
              <ChevronDown size={20} />
            </div>
          </div>

          {/* Phone Number */}
          <div className="input-wrapper">
            <MdPhone className="input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* E-mail */}
          <div className="input-wrapper">
            <MdEmail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Project Details Textarea */}
          <div className="textarea-wrapper">
            <MdDescription className="textarea-icon" />
            <textarea
              name="details"
              placeholder="Write Project Details"
              value={formData.details}
              onChange={handleChange}
              rows="6"
              className="form-textarea"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="form-button-wrapper">
            <button
              type="submit"
              className="form-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {/* Success/Error Message */}
          {submitMessage.text && (
            <div className={`submit-message ${submitMessage.type}`}>
              {submitMessage.text}
            </div>
          )}

        </form>
      </div>
    </div>
  );
}