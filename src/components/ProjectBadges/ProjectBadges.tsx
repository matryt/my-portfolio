import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ProjectBadges.scss';

interface Badge {
  text: string;
  icon: string;
  className: string;
}

interface ProjectBadgesProps {
  status?: string;
  projectType?: "personal" | "school";
  isCollaborative?: boolean;
}

const ProjectBadges: React.FC<ProjectBadgesProps> = ({ 
  status, 
  projectType, 
  isCollaborative 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Fonctions pour traduire les badges avec icônes
  const getStatusBadge = (status: string | undefined): Badge | null => {
    if (!status) return null;
    const statusConfig: Record<string, Badge> = {
      'in-progress': { text: 'En cours', icon: '🔄', className: 'status-in-progress' },
      'completed': { text: 'Terminé', icon: '✅', className: 'status-completed' },
      'paused': { text: 'En pause', icon: '⏸️', className: 'status-paused' },
      'cancelled': { text: 'Annulé', icon: '❌', className: 'status-cancelled' }
    };
    return statusConfig[status] || { text: status, icon: '', className: 'status-default' };
  };

  const getTypeBadge = (type: "personal" | "school" | undefined): Badge | null => {
    if (!type) return null;
    const typeConfig: Record<string, Badge> = {
      'personal': { text: 'Projet personnel', icon: '👤', className: 'type-personal' },
      'school': { text: 'Projet scolaire', icon: '🎓', className: 'type-school' }
    };
    return typeConfig[type] || { text: type, icon: '', className: 'type-default' };
  };

  // Effet de tilt 3D sur les badges avec GSAP
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const badges = container.querySelectorAll('.meta-badge');
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      // Normaliser les valeurs entre -1 et 1
      const normalizedX = mouseX / (rect.width / 2);
      const normalizedY = mouseY / (rect.height / 2);
      
      badges.forEach((badge) => {
        const element = badge as HTMLElement;
        const intensity = 45; // Augmenté pour plus de visibilité
        
        // Calcul des rotations (tilt effect)
        const rotateX = -normalizedY * intensity; // Inclinaison avant/arrière
        const rotateY = normalizedX * intensity;  // Inclinaison gauche/droite
        const rotateZ = (normalizedX + normalizedY) * intensity * 0.2; // Augmenté légèrement
        
        // Animation fluide avec GSAP
        gsap.to(element, {
          duration: 0.2, // Plus rapide pour plus de réactivité
          ease: "power2.out",
          rotateX: rotateX,
          rotateY: rotateY,
          rotateZ: rotateZ,
          transformPerspective: 800, // Réduit pour plus d'effet
          transformOrigin: "center center",
          scale: 1.05 // Légère augmentation de taille pour renforcer l'effet
        });
      });
    };

    const handleMouseLeave = () => {
      const container = containerRef.current;
      if (!container) return;

      const badges = container.querySelectorAll('.meta-badge');
      badges.forEach((badge) => {
        const element = badge as HTMLElement;
        
        // Retour à la position normale avec GSAP
        gsap.to(element, {
          duration: 0.5,
          ease: "power2.out",
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1 // Retour à la taille normale
        });
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Préparer les badges à afficher
  const statusBadge = getStatusBadge(status);
  const typeBadge = getTypeBadge(projectType);

  return (
    <div className="project-badges" ref={containerRef}>
      {statusBadge && (
        <span className={`meta-badge ${statusBadge.className}`}>
          <span className="badge-icon">{statusBadge.icon}</span>
          {statusBadge.text}
        </span>
      )}
      {typeBadge && (
        <span className={`meta-badge ${typeBadge.className}`}>
          <span className="badge-icon">{typeBadge.icon}</span>
          {typeBadge.text}
        </span>
      )}
      {isCollaborative && (
        <span className="meta-badge type-collaborative">
          <span className="badge-icon">🤝</span>
          Collaboratif
        </span>
      )}
    </div>
  );
};

export default ProjectBadges;
