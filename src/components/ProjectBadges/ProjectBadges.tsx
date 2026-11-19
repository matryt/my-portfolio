import React from 'react';
import { useTranslation } from 'react-i18next';
import './ProjectBadges.scss';

interface ProjectBadgesProps {
  status?: string;
  projectType?: 'personal' | 'school';
  isCollaborative?: boolean;
}

const ProjectBadges: React.FC<ProjectBadgesProps> = ({ 
  status, 
  projectType, 
  isCollaborative 
}) => {
  const { t } = useTranslation();

  const getStatusText = (st?: string) => {
    if (!st) return '';
    const map: Record<string, string> = {
      'in-progress': t('badges.status.inProgress'),
      'completed': t('badges.status.completed'),
      'paused': t('badges.status.paused'),
      'cancelled': t('badges.status.cancelled'),
      'waiting-maj': t('badges.status.waitingUpdate')
    };
    return map[st] || st;
  };

  const getTypeText = (tp?: 'personal' | 'school') => {
    if (!tp) return '';
    const map: Record<string, string> = {
      'personal': t('badges.type.personal'),
      'school': t('badges.type.school')
    };
    return map[tp] || tp;
  };

  const statusText = getStatusText(status);
  const typeText = getTypeText(projectType);

  return (
    <div className="project-badges">
      {statusText && (
        <div className="badge-item">
          <span className="badge-key">{t('badges.statusLabel')}</span>
          <span className="badge-value">{statusText}</span>
        </div>
      )}
      {typeText && (
        <div className="badge-item">
          <span className="badge-key">{t('badges.typeLabel')}</span>
          <span className="badge-value">{typeText}</span>
        </div>
      )}
      {isCollaborative && (
        <div className="badge-item">
          <span className="badge-key">{t('badges.modeLabel')}</span>
          <span className="badge-value">{t('badges.collaborative')}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectBadges;
