import React, { useState, useEffect, useRef } from 'react';
import EducationList from '../../components/EducationList/EducationList';
import JobsList from '../../components/JobsList/JobsList';
import HeroSection from '../../components/HeroSection/HeroSection';
import { fetchProjects } from '../../api';
import type { Project } from '../../types/api';
import './Home.scss';
import profileImage from '../../assets/react.svg';
import { Link } from 'react-router-dom';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const getProjects = async () => {
      const allProjects = await fetchProjects();
      const displayedProjects = allProjects.filter(p => p.displayed).slice(0, 3);
      setProjects(displayedProjects);
    };
    getProjects();
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
      <HeroSection onScrollToAbout={scrollToAbout} />

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

      {/* Parcours Section */}
      <section className="parcours-section">
        <div className="container">
          <h2 className="section-title">Mon parcours</h2>
          <EducationList />
          <JobsList />
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-preview-section">
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
