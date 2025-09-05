import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import './AboutSection.scss';

interface AboutSectionProps {
  // Aucune prop nécessaire pour l'instant
}

const AboutSection = forwardRef<HTMLElement, AboutSectionProps>((_, ref) => {
  const { t } = useTranslation();
  return (
    <section className="about-section" ref={ref} id="about">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="about-text">
            {t('about.description')}
          </p>
          <div className="tech-showcase">
            <h3>{t('about.techTitle')}</h3>
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

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
