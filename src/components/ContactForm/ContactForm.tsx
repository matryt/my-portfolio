import React from 'react';
import { useTranslation } from 'react-i18next';
import { useContactForm } from '../../hooks/useContactForm';
import './ContactForm.scss';

const ContactForm = () => {
  const { t } = useTranslation();
  const { formData, success, error, isSubmitting, handleChange, handleSubmit } = useContactForm();

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit} className="contact-form" noValidate>
      {success && (
        <p className="success" role="status" aria-live="polite">
          {t('contact.success')}
        </p>
      )}
      {error && (
        <p className="error" role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      {/* Champ honeypot anti-spam : caché pour les humains, rempli par les bots */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="form-honeypot">Website</label>
        <input
          type="text"
          id="form-honeypot"
          name="honeypot"
          value={formData.honeypot || ''}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label htmlFor="name">{t('contact.name')}</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={100}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="email">{t('contact.email')}</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          maxLength={150}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-field">
        <label htmlFor="message">{t('contact.message')}</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={5000}
          disabled={isSubmitting}
          rows={5}
        ></textarea>
      </div>

      <div className="button-wrapper">
        <button type="submit" disabled={isSubmitting} className="submit-button">
          {isSubmitting ? t('contact.send') + '...' : t('contact.send')}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;