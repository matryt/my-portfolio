import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traductions
import fr from './locales/fr.json' assert { type: 'json' };
import en from './locales/en.json' assert { type: 'json' };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: fr
      },
      en: {
        translation: en
      }
    },
    fallbackLng: 'fr',
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false // React already does escaping
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    // Normaliser les langues détectées
    load: 'languageOnly', // Utilise seulement 'fr' au lieu de 'fr-FR'
    cleanCode: true, // Nettoie les codes de langue
  });

export default i18n;
