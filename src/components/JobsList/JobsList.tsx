import { useEffect, useState } from "react";
import { fetchJobs } from "../../api";
import type { JobItem } from "../../types/api";
import "./JobsList.scss";

export default function JobsList() {
  const [jobs, setJobs] = useState<JobItem[]>([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
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
    if (!end || start === end) return formatDate(start);
    
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

  return (
    <section className="jobs-section">
      <h2>💼 Expériences professionnelles</h2>
      <div className="jobs-list">
        {jobs.map((job: JobItem, idx: number) => (
          <div key={job.order ?? idx} className="job-card">
            <h3>{job.title} @ {job.company}</h3>
            <p>{job.description}</p>
            <span>
              {formatDateRange(job.start, job.end)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}