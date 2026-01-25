import { useTranslation } from 'react-i18next';
import './Contact.scss';
import ContactForm from '../../components/ContactForm/ContactForm';

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <div className="contact-page">
      <h1>{t('contact.title')}</h1>
      <div className="social-links">
        <a href="https://github.com/matryt" target="_blank" rel="noopener noreferrer">{t('contact.github')}</a>
        <a href="https://linkedin.com/in/MathieuCUVELIER" target="_blank" rel="noopener noreferrer">{t('contact.linkedin')}</a>
      </div>
      <ContactForm />
    </div>
  );
};

export default Contact;