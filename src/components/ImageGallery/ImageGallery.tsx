import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from '../Carousel/Carousel';
import './ImageGallery.scss';

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { t } = useTranslation();

  // Utiliser la traduction si aucun titre n'est fourni
  const displayTitle = title || t('projectDetail.screenshots');

  // Détection de la taille d'écran
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <section className="image-gallery">
      <h3>{displayTitle}</h3>
      {isMobile ? (
        <>
          {/* Vignettes pour mobile */}
          <div className="thumbnails-grid">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="thumbnail-item"
                onClick={() => setSelectedImageIndex(index)}
              >
                <img src={image} alt={`Capture ${index + 1}`} />
                <div className="thumbnail-overlay">
                  <span className="zoom-icon">🔍</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Modal plein écran pour mobile */}
          {selectedImageIndex !== null && (
            <div className="image-modal" onClick={() => setSelectedImageIndex(null)}>
              <button 
                className="modal-close"
                onClick={() => setSelectedImageIndex(null)}
              >
                ✕
              </button>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img 
                  src={images[selectedImageIndex]} 
                  alt={`Capture ${selectedImageIndex + 1}`}
                  className="modal-image"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        /* Carousel normal pour desktop */
        <Carousel images={images} />
      )}
    </section>
  );
};

export default ImageGallery;
