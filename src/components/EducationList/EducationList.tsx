import { useEffect, useState } from "react";
import { fetchEducationItems } from "../../api";
import type { EducationItem } from "../../types/api";
import "./EducationList.scss";

export default function EducationList() {
  const [education, setEducation] = useState<EducationItem[]>([]);

  useEffect(() => {
    fetchEducationItems().then(setEducation);
  }, []);

  return (
    <section className="education-section">
      <h2>🎓 Éducation</h2>
      <div className="education-list">
        {education.map((item: EducationItem, idx: number) => (
          <div key={item.order ?? idx} className="education-card">
            <h3>{item.school}</h3>
            <p>{item.description}</p>
            <span>
              {item.start ? `${item.start}` : ''}
              {item.end && item.start !== item.end ? ` - ${item.end}` : ''}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}