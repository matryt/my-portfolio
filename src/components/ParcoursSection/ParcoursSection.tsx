import React from 'react';
import EducationList from '../EducationList/EducationList';
import JobsList from '../JobsList/JobsList';
import './ParcoursSection.scss';

const ParcoursSection: React.FC = () => {
  return (
    <section className="parcours-section" id="parcours">
      <div className="container">
        <div className="parcours-grid">
          <JobsList />
          <EducationList />
        </div>
      </div>
    </section>
  );
};

export default ParcoursSection;
