import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import FeaturedProjects from '../../components/FeaturedProjects/FeaturedProjects';
import ParcoursSection from '../../components/ParcoursSection/ParcoursSection';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* 1. Hero : Kicker mono, phrase d'accroche h1, deux liens */}
      <HeroSection />

      {/* 2. Trois projets en avant, capture à gauche, texte à droite, lien archives */}
      <FeaturedProjects />

      {/* 3. Expérience et formation en deux colonnes avec dates en mono */}
      <ParcoursSection />
    </div>
  );
};

export default Home;
