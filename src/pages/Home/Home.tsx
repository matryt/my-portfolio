import React, { useRef } from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import AboutSection from '../../components/AboutSection/AboutSection';
import ParcoursSection from '../../components/ParcoursSection/ParcoursSection';
import ProjectsPreviewSection from '../../components/ProjectsPreviewSection/ProjectsPreviewSection';
import './Home.scss';

const Home: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);

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
      <AboutSection ref={aboutRef} />

      {/* Parcours Section */}
      <ParcoursSection />

      {/* Projects Section */}
      {/* <ProjectsPreviewSection /> */}
    </div>
  );
};

export default Home;
