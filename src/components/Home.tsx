import React, { useState, useEffect, useRef } from 'react';
import { fetchProjects } from '../api';
import type { Project } from '../types/api';
import './Home.scss';
import profileImage from '../assets/react.svg';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { gsap } from 'gsap';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const getProjects = async () => {
      const allProjects = await fetchProjects();
      const displayedProjects = allProjects.filter(p => p.displayed).slice(0, 3);
      setProjects(displayedProjects);
    };
    getProjects();
  }, []);

  // Animations GSAP au chargement
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animation d'entrée du hero
    if (heroRef.current) {
      tl.fromTo(heroRef.current.querySelector('.name-title'), 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
      .fromTo(heroRef.current.querySelector('.tagline-title'), 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5"
      )
      .fromTo(heroRef.current.querySelector('.description'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3"
      )
      .fromTo(heroRef.current.querySelector('.cta-button'), 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2"
      )
      .fromTo(heroRef.current.querySelector('.scroll-indicator'), 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.1"
      );
    }
  }, []);

  // Fonction de scroll vers la section About
  const scrollToAbout = () => {
    if (aboutRef.current) {
      const offsetTop = aboutRef.current.offsetTop;
      window.scrollTo({
        top: offsetTop - 50, // Petit offset pour ne pas être collé au bord
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
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
        <div className="scroll-indicator" onClick={scrollToAbout}>
          <div className="scroll-text">Découvrir</div>
          <div className="scroll-arrow">
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={aboutRef}>
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">À propos de moi</h2>
            <p className="about-text">
              Actuellement en quatrième année d'école d'ingénieur à Polytech Nice-Sophia
              dans la filière "Systèmes d'Information", je suis également
              développeur Full Stack en alternance chez Docaposte.
            </p>
            <div className="tech-showcase">
              <h3>Technologies que j'utilise au quotidien :</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <span className="tech-icon">☕</span>
                  <span>Java</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🚀</span>
                  <span>Spring Boot</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🅰️</span>
                  <span>Angular</span>
                </div>
                <div className="tech-item">
                  <span className="tech-icon">🐘</span>
                  <span>PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-image-container">
            <div className="image-wrapper">
              <img src={profileImage} alt="Mathieu Cuvelier" />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-preview-section" ref={projectsRef}>
        <div className="container">
          <h2 className="section-title">Mes Projets</h2>
          <div className="projects-grid">
            {projects.map((project: Project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
          {projects.length > 0 && (
            <div className="view-all-container">
              <Link to="/projets" className="view-all-button">
                Voir tous les projets
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
