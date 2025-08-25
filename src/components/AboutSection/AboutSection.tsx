import { forwardRef } from 'react';
import './AboutSection.scss';
import profileImage from '../../assets/react.svg';

interface AboutSectionProps {
  // Aucune prop nécessaire pour l'instant
}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((_, ref) => {
  return (
    <section className="about-section" ref={ref} id="about">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">À propos de moi</h2>
          <p className="about-text">
            Actuellement en quatrième année d'école d'ingénieur à Polytech Nice-Sophia
            dans la filière "Systèmes d'Information", je suis également
            développeur Full Stack en alternance chez Docaposte.
          </p>
          <div className="tech-showcase">
            <h3>Technologies que j'utilise au quotidien :</h3>
            <div className="tech-grid">
              <div className="tech-item">
                <span className="tech-icon">☕</span>
                <span>Java</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🚀</span>
                <span>Spring Boot</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🅰️</span>
                <span>Angular</span>
              </div>
              <div className="tech-item">
                <span className="tech-icon">🐘</span>
                <span>PostgreSQL</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-image-container">
          <div className="image-wrapper">
            <img src={profileImage} alt="Mathieu Cuvelier" />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
