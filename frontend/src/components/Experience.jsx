import { useState } from 'react';

const STATIC_EXP = [
  {
    id: 1, company: 'TechNova Inc.', role: 'Senior Frontend Developer',
    duration: 'Jan 2024 — Present', current: true,
    points: [
      'Led the redesign of the core product UI, reducing churn by 22%',
      'Built a reusable component library adopted by 4 engineering teams',
      'Mentored 3 junior developers and ran weekly code review sessions',
    ],
  },
  {
    id: 2, company: 'Pixels Studio', role: 'Frontend Developer',
    duration: 'Jun 2022 — Dec 2023', current: false,
    points: [
      'Developed 12+ client-facing React apps with 99.9% uptime',
      'Integrated REST and GraphQL APIs, improving load time by 40%',
      'Collaborated closely with UX designers on design system creation',
    ],
  },
  {
    id: 3, company: 'Startup Labs', role: 'Junior Web Developer',
    duration: 'Aug 2021 — May 2022', current: false,
    points: [
      'Built responsive landing pages and marketing sites from Figma designs',
      'Contributed to an internal CMS tool using Vue.js and Firebase',
      'Improved site performance scores from 58 to 94 on Lighthouse',
    ],
  },
];

function TimelineItem({ exp, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`timeline-item reveal delay-${index}`} role="listitem">
      {isLeft ? (
        <>
          <div className="timeline-content">
            <p className="timeline-company">{exp.company}</p>
            <h3 className="timeline-role">{exp.role}</h3>
            <p className="timeline-duration">📅 {exp.duration}</p>
            <ul className="timeline-points">
              {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
          <div className="timeline-center">
            <div className="timeline-dot" aria-hidden="true" />
          </div>
          <div className="timeline-spacer" />
        </>
      ) : (
        <>
          <div className="timeline-spacer" />
          <div className="timeline-center">
            <div className="timeline-dot" aria-hidden="true" />
          </div>
          <div className="timeline-content">
            <p className="timeline-company">{exp.company}</p>
            <h3 className="timeline-role">{exp.role}</h3>
            <p className="timeline-duration">📅 {exp.duration}</p>
            <ul className="timeline-points">
              {exp.points.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default function Experience() {
  const [experience] = useState(STATIC_EXP);

  return (
    <section id="experience" aria-label="Experience section">
      <div className="container">
        <div className="experience-header">
          <span className="section-label reveal">Career</span>
          <h2 className="section-title reveal delay-1">Work Experience</h2>
          <p className="reveal delay-2" style={{ color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto', fontSize: '0.95rem' }}>
            A journey through the companies and projects that shaped my skills.
          </p>
        </div>

        <div className="timeline" role="list" aria-label="Work experience timeline">
          {experience.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
