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
      <h2>{t('education.title')}</h2>
      <div className="education-list">
        {isLoading ? (
          // Placeholders pendant le chargement
          Array.from({ length: 2 }, (_, idx) => (
            <div key={idx} className="education-card skeleton">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-date"></div>
            </div>
          ))
        ) : (
          education.map((item: EducationItem, idx: number) => (
            <div key={item.order ?? idx} className="education-card">
              <h3>{item.school}</h3>
              <div>
                {splitMultiLineText(item.description || '')}
              </div>
              <span>
                {item.start ? `${item.start}` : ''}
                {item.end && item.start !== item.end ? ` - ${item.end}` : ''}
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}