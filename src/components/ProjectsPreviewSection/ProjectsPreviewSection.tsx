import { Link } from 'react-router-dom';
import './ProjectsPreviewSection.scss';


const ProjectsPreviewSection: React.FC = () => {
  return (
    <section className="projects-preview-section">
      <div className="container">
          <div className="view-all-container">
            <Link to="/projets" className="view-all-button">
              Voir tous les projets
            </Link>
          </div>
      </div>
    </section>
  );
};

export default ProjectsPreviewSection;
