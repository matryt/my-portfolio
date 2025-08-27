import { useEffect, useState } from "react";
import { fetchJobs } from "../../api";
import type { JobItem } from "../../types/api";
import "./JobsList.scss";

export default function JobsList() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchJobs().then((jobsData) => {
      setJobs(jobsData);
      setIsLoading(false);
    });
  }, []);

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatDateRange = (start?: number, end?: number) => {
    if (!start) return '';
    if (!end || start === end) return "Depuis " + formatDate(start);
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    // Calculer la différence en mois
    const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                     (endDate.getMonth() - startDate.getMonth());
    
    // Si moins d'un mois, afficher seulement le mois/année de début
    if (monthDiff < 1) {
      return formatDate(start);
    }
    
    // Sinon afficher la période complète
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const splitMultiLineText = (text: string) => {
   
    const lines = text
      .replace(/\\n/g, '\n')  // Remplacer les \n échappés
      .replace(/<br\s*\/?>/gi, '\n') 
      .split('\n')
      .filter(line => line.trim() !== ''); // Supprimer les lignes vides
  
    
    return lines.map((line: string, index: number) => (
      <p key={index}>{line.trim()}</p>
    ));
  };

  return (
    <section className="jobs-section">
      <h2>💼 Expériences professionnelles</h2>
      <div className="jobs-list">
        {isLoading ? (
          // Placeholders pendant le chargement
          Array.from({ length: 3 }, (_, idx) => (
            <div key={idx} className="job-card skeleton">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text short"></div>
              <div className="skeleton-date"></div>
            </div>
          ))
        ) : (
          jobs.map((job: JobItem, idx: number) => (
            <div key={job.order ?? idx} className="job-card">
              <h3>
                {job.title} @ {" "}
                {job.companyUrl ? (
                  <a 
                    href={job.companyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="company-link"
                  >
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              {splitMultiLineText(job.description)}
              <span>
                {formatDateRange(job.start, job.end)}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}