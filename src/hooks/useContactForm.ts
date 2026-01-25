import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:21000';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent, onAnimationStart?: () => void) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    
    // Lancer l'animation d'avion si fournie
    if (onAnimationStart) {
      onAnimationStart();
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/contact`, formData);

      if (response.status === 200) {
        setTimeout(() => {
          setSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setIsSubmitting(false);
        }, 1500);
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || t('contact.error'));
      } else {
        setError(t('contact.errorSubmit'));
      }
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
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
