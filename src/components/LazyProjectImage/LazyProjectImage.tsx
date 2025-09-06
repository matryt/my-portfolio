import React, { useState } from 'react';
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
                <span className="placeholder-icon">🖼️</span>
                <span className="placeholder-text">Image en attente...</span>
              </div>
            </div>
          ) : isLoading ? (
            // Loading spinner pendant le chargement
            <div className="image-placeholder loading">
              <div className="spinner"></div>
              <span className="loading-text">Chargement...</span>
            </div>
          ) : hasError ? (
            // État d'erreur
            <div className="image-placeholder error">
              <span className="error-icon">⚠️</span>
              <span className="error-text">Erreur de chargement</span>
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
              <span className="no-image-icon">📷</span>
              <span className="no-image-text">Pas d'image</span>
            </div>
          )}
        </>
      ) : (
        // Pas d'image prévue pour ce projet
        <div className="image-placeholder no-image">
          <span className="no-image-icon">📄</span>
          <span className="no-image-text">Projet textuel</span>
        </div>
      )}
    </div>
  );
};

export default LazyProjectImage;
