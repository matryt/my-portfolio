import { useEffect, useState } from "react";
import { fetchEducationItems } from "../../api";
import type { EducationItem } from "../../types/api";
import "./EducationList.scss";

export default function EducationList() {
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEducationItems().then((educationData) => {
      setEducation(educationData);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="education-section">
      <h2>🎓 Éducation</h2>
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
              <p>{item.description}</p>
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