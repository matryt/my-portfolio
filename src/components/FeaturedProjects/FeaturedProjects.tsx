import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useApi';
import type { ProjectData } from '../../types/api';
import LazyProjectImage from '../LazyProjectImage/LazyProjectImage';
import './FeaturedProjects.scss';

const getPlaceholderText = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('locations') || lower.includes('réservations') || lower.includes('reservation')) {
    return '[CAPTURE DU TABLEAU DE BORD]';
  }
  if (lower.includes('reconnaissance') || lower.includes('robot')) {
    return '[SCHÉMA DES TROIS COUCHES]';
  }
  if (lower.includes('qcm')) {
    return '[CAPTURE DE LA DÉMO]';
  }
  return '[CAPTURE DU PROJET]';
};

const getProjectSlug = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const FeaturedProjects: React.FC = () => {
  const { projects, loading } = useProjects();
  const { t } = useTranslation();

  const featuredProjects = useMemo(() => {
    // 1. Si des projets sont explicitement marqués featured
    const explicitlyFeatured = projects.filter((p: ProjectData) => p.featured);
    if (explicitlyFeatured.length > 0) return explicitlyFeatured.slice(0, 3);

    // 2. Sinon, cibler les 3 projets mis en avant
    const targets = ['locations', 'reconnaissance', 'qcm'];
    const matched = projects.filter(p =>
      targets.some(target => p.name.toLowerCase().includes(target))
    );

    // Trier pour avoir Locations, Robot, QCM
    matched.sort((a, b) => {
      const orderA = targets.findIndex(k => a.name.toLowerCase().includes(k));
      const orderB = targets.findIndex(k => b.name.toLowerCase().includes(k));
      return orderA - orderB;
    });

    if (matched.length > 0) return matched.slice(0, 3);

    // 3. Fallback sur les 3 premiers projets
    return projects.slice(0, 3);
  }, [projects]);

  const getKicker = (p: ProjectData) => {
    const isEmbedded = p.technologies?.some(tech => 
      ['c++', 'arduino', 'python'].includes(tech.toLowerCase())
    ) && p.name.toLowerCase().includes('robot');
    const cat = isEmbedded ? 'EMBARQUÉ' : 'WEB';

    let statusText = t('badges.status.completed');
    if (p.status === 'in-progress') {
      statusText = t('badges.status.inProgress');
    } else if (p.status === 'paused') {
      statusText = t('badges.status.paused');
    }

    return `${cat} · ${statusText}`.toUpperCase();
  };

  return (
    <section className="featured-projects-section">
      <div className="container">
        <h2 className="section-kicker mono-label">{t('home.featuredTitle')}</h2>

        <div className="featured-list">
          {loading ? (
            Array.from({ length: 3 }, (_, idx) => (
              <div key={idx} className="featured-item skeleton">
                <div className="featured-image-col skeleton-box"></div>
                <div className="featured-text-col">
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-line title"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line text"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
            ))
          ) : (
            featuredProjects.map((project) => {
              const slug = getProjectSlug(project.name);
              const kicker = getKicker(project);
              const placeholder = getPlaceholderText(project.name);

              return (
                <div key={project.name} className="featured-item">
                  <div className="featured-image-col">
                    {project.hasImage ? (
                      <LazyProjectImage 
                        project={project} 
                        alt={project.name} 
                        className="featured-image"
                      />
                    ) : (
                      <div className="featured-placeholder">
                        <span className="placeholder-label">{placeholder}</span>
                      </div>
                    )}
                  </div>
                  <div className="featured-text-col">
                    <span className="item-kicker mono-label">{kicker}</span>
                    <h3 className="item-title">
                      <Link to={`/projets/${slug}`}>{project.name}</Link>
                    </h3>
                    <p className="item-description">{project.description}</p>
                    <div className="item-techs mono-label">
                      {project.technologies?.map((tech) => tech.toUpperCase()).join(' · ')}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="all-projects-wrapper">
          <Link to="/projets" className="all-projects-link">
            {t('home.allProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
