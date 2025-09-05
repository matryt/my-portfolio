import { useTranslation } from "react-i18next";
import { useJobs } from "../../hooks/useApi";
import type { JobItem } from "../../types/api";
import { splitMultiLineText } from "../../utils/textUtils";
import "./JobsList.scss";

export default function JobsList() {
  const { jobs, loading: isLoading } = useJobs();
  const { t } = useTranslation();

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    // Les mois sont indexés de 0 à 11, donc on ajoute 1
    const monthNumber = date.getMonth() + 1;
    return `${t(`months.${monthNumber}`)} ${date.getFullYear()}`;
  };

  const formatDateRange = (start?: number, end?: number) => {
    if (!start) return '';
    if (!end || start === end) return t("jobs.since") + " " + formatDate(start);

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
      <h2>{t('jobs.title')}</h2>
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