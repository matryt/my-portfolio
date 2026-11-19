import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './HeroSection.scss';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <p className="hero-kicker">{t('home.kicker')}</p>
          <h1 className="hero-headline">{t('home.headline')}</h1>
          <div className="hero-actions">
            <Link to="/projets" className="hero-action-link primary">
              {t('home.viewProjects')}
            </Link>
            <Link to="/contact" className="hero-action-link">
              {t('home.contactMe')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
