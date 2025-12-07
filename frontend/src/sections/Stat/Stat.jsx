import React, { useEffect, useRef } from "react";
import "./Stat.css";
import { FaUsers, FaPenNib, FaAward, FaClock } from "react-icons/fa";

const StatsSection = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.stat-card');
            cards.forEach((card) => {
              card.classList.add('animate');
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="stats-section" id="stats" ref={statsRef}>
      <h2 className="stats-title">By The Numbers</h2>
      <p className="stats-subtitle">Trusted by clients and creators worldwide</p>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon"><FaUsers /></div>
          <h3 className="stat-number">150+</h3>
          <p className="stat-label">Completed Projects</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaPenNib /></div>
          <h3 className="stat-number">90+</h3>
          <p className="stat-label">Design Clients</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaAward /></div>
          <h3 className="stat-number">4+</h3>
          <p className="stat-label">Years Experience</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon"><FaClock /></div>
          <h3 className="stat-number">24/7</h3>
          <p className="stat-label">Support & Availability</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
