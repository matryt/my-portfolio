import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { useContactForm } from '../../hooks/useContactForm';
import './ContactForm.scss';

const ContactForm = () => {
  const { t } = useTranslation();
  const { formData, success, error, isSubmitting, handleChange, handleSubmit } = useContactForm();
  const planeRef = useRef<HTMLDivElement>(null);

  const animatePlane = () => {
    if (!planeRef.current) return;

    const plane = planeRef.current;
    plane.style.display = 'block';

    // Position de départ (hors écran à gauche)
    gsap.set(plane, {
      left: '-5%',
      top: '55%',
      rotation: -8,
      scale: 0.9,
      opacity: 1
    });

    // Animation lente avec courbes prononcées
    const tl = gsap.timeline();
    
    // Trajectoire horizontale lente
    tl.to(plane, {
      left: '110%',
      duration: 4.5,
      ease: 'power1.inOut'
    })
    // Courbe verticale prononcée en forme d'arc
    .to(plane, {
      top: '35%',
      duration: 2.25,
      ease: 'power2.out'
    }, 0)
    .to(plane, {
      top: '52%',
      duration: 2.25,
      ease: 'power2.in'
    }, 2.25)
    // Rotation progressive qui suit la courbe
    .to(plane, {
      rotation: 8,
      duration: 2.25,
      ease: 'power2.out'
    }, 0)
    .to(plane, {
      rotation: -5,
      duration: 2.25,
      ease: 'power2.in'
    }, 2.25)
    // Zoom progressif très lent
    .to(plane, {
      scale: 1.4,
      duration: 4.5,
      ease: 'power1.in'
    }, 0)
    // Disparition en douceur
    .to(plane, {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.in',
      onComplete: () => {
        plane.style.display = 'none';
      }
    }, '-=0.6');
  };

  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e, animatePlane);
  };

  return (
    <>
      <div ref={planeRef} className="plane-animation" style={{ display: 'none' }}>
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(90deg)' }}>
          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
        </svg>
      </div>
      <form onSubmit={onSubmit} className="contact-form">
        {success && <p className="success">{t('contact.success')}</p>}
        {error && <p className="error">{error}</p>}
        <div className="form-field">
          <label htmlFor="name">{t('contact.name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
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
            disabled={isSubmitting}
          ></textarea>
        </div>
        <div className="button-wrapper">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '🚀 ' + t('contact.send') + '...' : t('contact.send')}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;