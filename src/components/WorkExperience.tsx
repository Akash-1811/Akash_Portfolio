import React, { useState } from "react";

const experiences = [
  {
    company: "Gebbs Healthcare Solutions",
    role: "Software Engineer - Data Science",
    dates: "May 24 – Present",
    responsibilities: [
      "Built ML models for quality audits in medical coding and integrated them into user software for real-time auditing, achieving 95% QA KPI and 1.8% efficiency gains.",
      "Collaborated with industry experts to understand domain-specific data, performed feature importance analysis, and engineered datasets to improve model performance, reducing manual auditing time by 25%.",
      "Built scalable Django application with ORM for medical coding, achieving 95% QA KPI and 1.8% efficiency gain.",
      "Automated critical ops tasks with Automation bots, reducing workload by 15%.",
      "Analyzed data and developed interactive visual dashboards, streamlining reporting and reducing handling time by 25%.",
      "Supported SQL data operations including migrations and backup risk management."
    ],
    technologies: [
      "Python", "Scikit-learn", "XGBoost", "LightGBM", "Pandas", "NumPy",
      "Django", "DRF", "MSSQL", "IIS"
    ]
  },
  {
    company: "Your Digital Lift Gym Software’s",
    role: "Software Developer",
    dates: "Jan 22 - May 24",
    responsibilities: [
      "Collected, cleaned, and analyzed user and business data to guide development, improving software efficiency and customer satisfaction.",
      "Built an ML model that assigned personalized fitness exercises based on user details like age, weight, and height, enhancing the effectiveness of workout plans.",
      "Designed ETL pipelines and interactive dashboards for tracking key metrics, enabling management to make informed decisions."
    ],
    technologies: [
      "Python", "Django", "Scikit-learn", "Pandas", "NumPy", "A/B Testing",
      "Matplotlib", "Seaborn", "SQL", "Docker", "GitHub"
    ]
  }
];

// Helper function for showing initial lines and toggling ReadMore
const getSnippet = (arr: string[], isExpanded: boolean, lines: number = 3) => {
  return isExpanded ? arr : arr.slice(0, lines);
};

const WorkExperience: React.FC = () => {
  // Track expanded state for each experience card
  const [expanded, setExpanded] = useState(Array(experiences.length).fill(false));

  const handleToggle = (idx: number) => {
    setExpanded(prev =>
      prev.map((val, i) => (i === idx ? !val : val))
    );
  };

  return (
    <section className="work-modern">
      <h2 className="work-title">
        My <span className="work-title-accent">Corporate Work Experience</span>
      </h2>
      <div className="work-list">
        {experiences.map((exp, idx) => {
          const isLong = exp.responsibilities.length > 3;
          const isExpanded = expanded[idx];
          return (
            <div className="work-card" key={idx}>
              <div className="work-header">
                <h3 className="work-company">{exp.company}</h3>
                <span className="work-meta">{exp.role} <span>•</span> {exp.dates}</span>
              </div>
              <ul className="work-resp">
                {getSnippet(exp.responsibilities, isExpanded).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              {isLong && !isExpanded && (
                <button
                  className="work-readmore"
                  onClick={() => handleToggle(idx)}
                >Read more</button>
              )}
              {isLong && isExpanded && (
                <button
                  className="work-readmore"
                  onClick={() => handleToggle(idx)}
                >Show less</button>
              )}
              <div className="work-tech">
                <b>Technologies:</b> <span>{exp.technologies.join(", ")}</span>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        :root {
          --bg-dark: #161e2e;
          --bg-light: #f4f8fb;
          --card-dark: #232f4e;
          --card-light: #fafcff;
          --accent-dark: #2196f3;
          --accent-light: #1976d2;
          --meta-dark: #8cbff2;
          --meta-light: #2b5fa7;
          --text-dark: #eef3fa;
          --text-light: #193050;
          --tech-dark: #b2d9fc;
          --tech-light: #2263ae;
          --shadow: 0 4px 18px rgba(61,79,126,0.14);
          --radius: 18px;
        }
        [data-theme="dark"] .work-modern {
          background: var(--bg-dark);
          color: var(--text-dark);
        }
        [data-theme="light"] .work-modern {
          background: var(--bg-light);
          color: var(--text-light);
        }
        .work-modern {
          min-height: 70vh;
          padding: 56px 0 36px 0;
          transition: background .3s, color .3s;
        }
        .work-title {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 42px;
          letter-spacing: .01em;
        }
        .work-title-accent {
          color: var(--accent-dark);
          transition: color .25s;
        }
        [data-theme="light"] .work-title-accent {
          color: var(--accent-light);
        }
        .work-list {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          justify-content: center;
        }
        .work-card {
          background: var(--card-dark);
          border-radius: var(--radius);
          min-width: 320px;
          max-width: 430px;
          box-shadow: var(--shadow);
          padding: 28px 24px 16px 24px;
          display: flex;
          flex-direction: column;
          margin-bottom: 14px;
          transition: background .25s, box-shadow .25s;
          border: 1.5px solid rgba(86,156,255,0.08);
          position: relative;
          overflow:hidden;
        }
        [data-theme="light"] .work-card {
          background: var(--card-light);
          color: var(--text-light);
        }
        .work-header {
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
        }
        .work-company {
          font-size: 1.18rem;
          color: var(--accent-dark);
          font-weight: 600;
          margin: 0 0 3px 0;
        }
        [data-theme="light"] .work-company {
          color: var(--accent-light);
        }
        .work-meta {
          font-size: .99rem;
          color: var(--meta-dark);
          margin-bottom: 3px;
        }
        [data-theme="light"] .work-meta {
          color: var(--meta-light);
        }
        .work-resp {
          margin: 0 0 16px 0;
          padding-left: 18px;
          font-size: 1.03rem;
          line-height: 1.7;
        }
        .work-readmore {
          border: none;
          background: linear-gradient(90deg,#2196f3 30%,#21cbf3 100%);
          color: #fff;
          font-size: .97rem;
          font-weight: 450;
          border-radius: 7px;
          padding: 7px 16px;
          box-shadow: 0 2px 10px rgba(21,100,180,0.11);
          cursor: pointer;
          margin-bottom: 2px;
          margin-top: -6px;
          transition: background .2s, color .2s;
        }
        .work-readmore:hover {
          background: linear-gradient(90deg,#1976d2 30%,#0dcaf0 100%);
        }
        .work-tech {
          font-size: .99rem;
          word-break: break-word;
          color: var(--tech-dark);
          margin-top: 4px;
        }
        [data-theme="light"] .work-tech {
          color: var(--tech-light);
        }
        @media (max-width: 990px) {
          .work-list {
            flex-direction: column;
            align-items: center;
          }
          .work-card {
            min-width: 96vw;
            max-width: 98vw;
          }
        }
      `}
      </style>
    </section>
  );
};

export default WorkExperience;
