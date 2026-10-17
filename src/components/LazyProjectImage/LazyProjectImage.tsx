import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLazyProjectImage } from '../../hooks/useLazyProjectImage';
import { useLanguage } from '../../contexts/LanguageContext'; // Import du contexte langue
import type { ProjectData } from '../../types/api';
import './LazyProjectImage.scss';

interface LazyProjectImageProps {
  project: ProjectData;
  alt: string;
  className?: string;
  /**
   * Options de lazy loading
   */
  lazyOptions?: {
    rootMargin?: string;
    threshold?: number;
    forceLoad?: boolean;
  };
}

const LazyProjectImage: React.FC<LazyProjectImageProps> = ({ 
  project, 
  alt, 
  className = '',
  lazyOptions = {}
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { language } = useLanguage(); // Utilisation du contexte langue
  const { t } = useTranslation();
  
  // Lazy loading avec intersection observer
  const {
    ref,
    imageUrl,
    isLoading,
    hasError,
    isVisible
  } = useLazyProjectImage(project, language, { // Passage de la langue
    rootMargin: '50px',
    threshold: 0.1,
    ...lazyOptions,
  });

  const containerClass = `lazy-project-image ${className}`.trim();

  return (
    <div className={containerClass} ref={ref as React.RefObject<HTMLDivElement>}>
      {project.hasImage ? (
        <>
          {!isVisible ? (
            // Placeholder avant que l'élément soit visible
            <div className="image-placeholder awaiting">
              <div className="placeholder-content">
                <span className="placeholder-text">{t('lazyImage.awaiting')}</span>
              </div>
            </div>
          ) : isLoading ? (
            // Loading spinner pendant le chargement
            <div className="image-placeholder loading">
              <div className="spinner"></div>
              <span className="loading-text">{t('lazyImage.loading')}</span>
            </div>
          ) : hasError ? (
            // État d'erreur
            <div className="image-placeholder error">
              <span className="error-text">{t('lazyImage.error')}</span>
            </div>
          ) : imageUrl ? (
            // Image chargée avec succès
            <img 
              src={imageUrl} 
              alt={alt} 
              className={`project-image ${imageLoaded ? 'loaded' : 'loading'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          ) : (
            // Fallback si pas d'URL d'image
            <div className="image-placeholder no-image">
              <span className="no-image-text">{t('lazyImage.noImage')}</span>
            </div>
          )}
        </>
      ) : (
        // Pas d'image prévue pour ce projet
        <div className="image-placeholder no-image">
          <span className="no-image-text">{t('lazyImage.textOnly')}</span>
        </div>
      )}
    </div>
  );
};

export default LazyProjectImage;
