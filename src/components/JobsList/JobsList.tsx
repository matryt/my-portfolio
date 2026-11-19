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
    const monthNumber = date.getMonth() + 1;
    const monthStr = t(`months.${monthNumber}`).slice(0, 4).toUpperCase();
    return `${monthStr}. ${date.getFullYear()}`;
  };

  const formatDateRange = (start?: number, end?: number) => {
    if (!start) return '';
    if (!end || start === end) return `${t("jobs.since").toUpperCase()} ${formatDate(start)}`;

    const startDate = new Date(start);
    const endDate = new Date(end);
    
    const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                     (endDate.getMonth() - startDate.getMonth());
    
    if (monthDiff < 1) {
      return formatDate(start);
    }
    
    return `${formatDate(start)} – ${formatDate(end)}`;
  };

  return (
    <section className="jobs-section">
      <h2 className="mono-label">{t('home.experienceTitle')}</h2>
      <div className="jobs-list">
        {isLoading ? (
          Array.from({ length: 2 }, (_, idx) => (
            <div key={idx} className="job-card skeleton">
              <div className="job-card-header">
                <div className="skeleton-title"></div>
                <div className="skeleton-date"></div>
              </div>
              <div className="skeleton-text"></div>
            </div>
          ))
        ) : (
          jobs.map((job: JobItem, idx: number) => (
            <div key={job.order ?? idx} className="job-card">
              <div className="job-card-header">
                <h3>
                  {job.title} · {job.companyUrl ? (
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
                <span className="job-date">
                  {formatDateRange(job.start, job.end)}
                </span>
              </div>
              <div className="job-description">
                {splitMultiLineText(job.description)}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}