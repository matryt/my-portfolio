import { useTranslation } from "react-i18next";
import { useEducation } from "../../hooks/useApi";
import type { EducationItem } from "../../types/api";
import { splitMultiLineText } from "../../utils/textUtils";
import "./EducationList.scss";

export default function EducationList() {
  const { education, loading: isLoading } = useEducation();
  const { t } = useTranslation();

  return (
    <section className="education-section">
      <h2 className="mono-label">{t('home.educationTitle')}</h2>
      <div className="education-list">
        {isLoading ? (
          Array.from({ length: 2 }, (_, idx) => (
            <div key={idx} className="education-card skeleton">
              <div className="education-card-header">
                <div className="skeleton-title"></div>
                <div className="skeleton-date"></div>
              </div>
              <div className="skeleton-text"></div>
            </div>
          ))
        ) : (
          education.map((item: EducationItem, idx: number) => (
            <div key={item.order ?? idx} className="education-card">
              <div className="education-card-header">
                <h3>{item.school}</h3>
                <span className="education-date">
                  {item.start ? `${item.start}` : ''}
                  {item.end && item.start !== item.end ? `–${item.end}` : ''}
                </span>
              </div>
              <div className="education-description">
                {splitMultiLineText(item.description || '')}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}