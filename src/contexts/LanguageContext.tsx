import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Helper pour normaliser la langue
const normalizeLanguage = (lang: string): 'fr' | 'en' => {
  if (lang.startsWith('fr')) return 'fr';
  if (lang.startsWith('en')) return 'en';
  return 'fr'; // fallback
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    // Synchroniser avec i18next et normaliser la langue
    const normalizedLang = normalizeLanguage(i18n.language);
    setLanguageState(normalizedLang);
  }, [i18n.language]);

  const setLanguage = (lang: 'fr' | 'en') => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
