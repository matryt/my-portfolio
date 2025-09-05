import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './LanguageToggle.scss';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'fr' ? 'English' : 'French'}`}
    >
      <span className={`lang-option ${language === 'fr' ? 'active' : ''}`}>
        FR
      </span>
      <span className="separator">|</span>
      <span className={`lang-option ${language === 'en' ? 'active' : ''}`}>
        EN
      </span>
    </button>
  );
};

export default LanguageToggle;
