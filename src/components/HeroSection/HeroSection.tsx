import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HeroSection.scss';

interface HeroSectionProps {
  onScrollToAbout: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToAbout }) => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="name-title">{t('hero.greeting')}</h1>
        <h2 className="tagline-title">
          {t('hero.tagline')}
        </h2>
        <p className="description">
          {t('hero.description')}
        </p>
        <div className="hero-actions">
          <Link to="/projets" className="cta-button">
            <span>{t('hero.viewProjects')}</span>
          </Link>
          <button className="link-button" onClick={onScrollToAbout}>
            {t('hero.discover')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
