import { useTranslation } from 'react-i18next';
import EducationList from '../EducationList/EducationList';
import JobsList from '../JobsList/JobsList';
import './ParcoursSection.scss';

interface ParcoursSectionProps {
  // Aucune prop nécessaire pour l'instant, mais préparé pour l'extensibilité
}

const ParcoursSection: React.FC<ParcoursSectionProps> = () => {
  const { t } = useTranslation();
  
  return (
    <section className="parcours-section" id="parcours">
      <div className="container">
        <h2 className="section-title">{t('experience.title')}</h2>
        <EducationList />
        <JobsList />
      </div>
    </section>
  );
};

export default ParcoursSection;
