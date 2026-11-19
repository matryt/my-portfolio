import { useTranslation } from 'react-i18next';
import ContactForm from '../../components/ContactForm/ContactForm';
import './Contact.scss';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="contact-page">
      <div className="contact-layout">
        <div className="contact-left">
          <h1>{t('contact.title', 'Contact')}</h1>
          <p className="contact-intro">
            {t('contact.intro', '[UNE PHRASE SUR CE POUR QUOI ON PEUT T’ÉCRIRE]')}
          </p>
          <div className="social-links">
            <a
              href="https://github.com/matryt"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub →
            </a>
            <a
              href="https://linkedin.com/in/MathieuCUVELIER"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        <div className="contact-right">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;