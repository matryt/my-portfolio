import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './HeroSection.scss';

interface HeroSectionProps {
  onScrollToAbout: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToAbout }) => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const tl = gsap.timeline();
    
    // Animation d'entrée pour chaque élément
    tl.fromTo(
      heroRef.current.querySelector('.name-title'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      heroRef.current.querySelector('.tagline-title'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo(
      heroRef.current.querySelector('.description'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo(
      heroRef.current.querySelector('.cta-button'),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo(
      heroRef.current.querySelector('.scroll-indicator'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.1'
    );

    // Animation des formes flottantes
    const shapes = heroRef.current.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
      gsap.fromTo(
        shape,
        { opacity: 0, scale: 0 },
        { 
          opacity: 0.1, 
          scale: 1, 
          duration: 2, 
          delay: 0.5 + index * 0.2,
          ease: 'power3.out'
        }
      );
    });
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      <div className="hero-content">
        <h1 className="name-title">Bonjour, je suis Mathieu Cuvelier.</h1>
        <h2 className="tagline-title">
          Étudiant ingénieur et développeur Full Stack chez Docaposte.
        </h2>
        <p className="description">
          En quatrième année à Polytech Nice-Sophia, je combine ma passion pour
          le développement logiciel avec une expérience pratique en alternance
          pour concevoir et créer des applications web robustes et innovantes.
        </p>
        <Link to="/projets" className="cta-button">
          <span>Voir mes projets</span>
          <div className="button-glow"></div>
        </Link>
      </div>
      
      {/* Indicateur de scroll */}
      <div className="scroll-indicator" onClick={onScrollToAbout}>
        <div className="scroll-text">Découvrir</div>
        <div className="scroll-arrow">
          <div className="chevron"></div>
          <div className="chevron"></div>
          <div className="chevron"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
