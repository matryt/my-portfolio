import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-portfolio.mathieucuvelier.fr';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}

export const useContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '', honeypot: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setError(t('contact.errorRequired', 'Tous les champs sont requis.'));
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError(t('contact.errorEmail', 'Veuillez saisir une adresse email valide.'));
      return;
    }

    if (trimmedMessage.length < 10) {
      setError(t('contact.errorMinMessage', 'Le message doit contenir au moins 10 caractères.'));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        honeypot: formData.honeypot || ''
      });

      if (response.status === 200) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 429) {
          setError(t('contact.rateLimit', 'Trop de messages envoyés. Veuillez patienter quelques minutes.'));
        } else {
          setError(err.response.data.message || t('contact.error'));
        }
      } else {
        setError(t('contact.errorSubmit'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '', honeypot: '' });
    setSuccess(false);
    setError('');
  };

  return {
    formData,
    success,
    error,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm
  };
};
