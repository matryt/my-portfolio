import React, { useState, useEffect, useRef } from "react";
import "./Carousel.scss";
interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}
const Carousel: React.FC<CarouselProps> = ({
  images,
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const extendedImages = [images[images.length - 1], ...images, images[0]];
  const goToPrevious = () => {
    if (!isTransitioning) return;
    setCurrentImageIndex((prev) => prev - 1);
  };
  const goToNext = () => {
    if (!isTransitioning) return;
    setCurrentImageIndex((prev) => prev + 1);
  };
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const handleTransitionEnd = () => {
      setIsTransitioning(false);
      if (currentImageIndex === extendedImages.length - 1) {
        setCurrentImageIndex(1);
      } else if (currentImageIndex === 0) {
        setCurrentImageIndex(images.length);
      }
      setTimeout(() => setIsTransitioning(true), 50);
    };
    carousel.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      carousel.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentImageIndex, extendedImages.length, images.length]);
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentImageIndex]);
  const goToSlide = (index: number) => {
    if (!isTransitioning) return;
    setCurrentImageIndex(index + 1);
  };
  return (
    <div className="carousel-container">
      {" "}
      <button onClick={goToPrevious} className="carousel-button prev">
        {" "}
        &lt;{" "}
      </button>{" "}
      <button onClick={goToNext} className="carousel-button next">
        {" "}
        &gt;{" "}
      </button>{" "}
      <div
        className="carousel"
        style={
          { "--total-images": extendedImages.length } as React.CSSProperties
        }
      >
        {" "}
        <div
          className="carousel-images"
          ref={carouselRef}
          style={
            {
              transform: `translateX(-${
                (currentImageIndex * 100)
              }%)`,
              transition: isTransitioning
                ? "transform 0.5s ease-in-out"
                : "none",
              "--total-images": extendedImages.length,
            } as React.CSSProperties
          }
        >
          {" "}
          {extendedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Screenshot ${index + 1}`}
              className="carousel-image"
              style={{
                opacity: currentImageIndex === index ? 1 : 0,
                transition: isTransitioning ? "opacity 0.5s ease-in-out" : "none",
              }}
            />
          ))}{" "}
        </div>{" "}
        <div className="carousel-indicators">
          {" "}
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${
                currentImageIndex === index + 1 ||
                (currentImageIndex === 0 && index === images.length - 1) ||
                (currentImageIndex === extendedImages.length - 1 && index === 0)
                  ? "active"
                  : ""
              }`}
              onClick={() => goToSlide(index)}
            ></span>
          ))}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default Carousel;
