const STATIC_EXP = [
  {
    id: 1,
    company: 'Self-Initiated Projects',
    role: 'Frontend Developer (Freelance & Personal)',
    duration: '2023 — Present',
    current: true,
    type: 'freelance',
    points: [
      'Designed and shipped 10+ React & Next.js web applications — from concept to deployment on Vercel',
      'Built SecureSync AI: an AI-powered insurance dashboard with real-time weather monitoring and UPI payout UI',
      'Developed Blood Banking System: a full-stack healthcare platform with role-based dashboards and inventory tracking UI',
      'Created CodeSync: a real-time collaborative code editor with Monaco Editor, WebSocket sync, and live cursor tracking',
    ],
  },
  {
    id: 2,
    company: 'KL University — B.Tech CSE',
    role: 'Computer Science & Engineering Student',
    duration: '2022 — 2026',
    current: true,
    type: 'education',
    points: [
      'Pursuing B.Tech in Computer Science & Engineering — expected graduation 2026',
      'Coursework: Data Structures, Algorithms, Web Technologies, Database Management, Operating Systems',
      'Active member of the university coding club — participated in 3+ national-level hackathons',
      'Maintained consistent academic performance while building production-quality personal projects',
    ],
  },
  {
    id: 3,
    company: 'Open Source & Community',
    role: 'Active GitHub Contributor',
    duration: '2021 — Present',
    current: false,
    type: 'community',
    points: [
      'Actively contributing to personal and open-source repositories on GitHub (@ahamad30626)',
      'Built reusable component patterns and shared learnings through GitHub documentation',
      'Explored advanced React patterns: compound components, custom hooks, render props, and lazy loading',
      'Consistently learning via MDN, React docs, Next.js official documentation, and hands-on builds',
    ],
  },
];

const TYPE_META = {
  freelance:  { label: 'Freelance',  color: '#6366f1' },
  education:  { label: 'Education',  color: '#06b6d4' },
  community:  { label: 'Community',  color: '#10b981' },
};

function TimelineItem({ exp, index }) {
  const meta = TYPE_META[exp.type] || { label: exp.type, color: '#6366f1' };

  return (
    <article className={`timeline-card reveal delay-${index}`} role="listitem" aria-label={`${exp.role} at ${exp.company}`}>
      <div className="timeline-card-header">
        <div className="timeline-card-top">
          <span className="timeline-type-badge" style={{ color: meta.color, borderColor: `${meta.color}40`, background: `${meta.color}12` }}>
            {meta.label}
          </span>
          {exp.current && (
            <span className="timeline-current-badge">
              <span className="tl-dot-live" aria-hidden="true" />
              Current
            </span>
          )}
        </div>
        <h3 className="timeline-role">{exp.role}</h3>
        <p className="timeline-company">{exp.company}</p>
        <p className="timeline-duration">📅 {exp.duration}</p>
      </div>
      <ul className="timeline-points">
        {exp.points.map((pt, i) => (
          <li key={i}>
            <span className="tl-bullet" aria-hidden="true" style={{ background: meta.color }} />
            {pt}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience section">
      <div className="container">
        <div className="experience-header">
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Journey</span>
          <h2 className="section-title reveal delay-1">Education &amp; Experience</h2>
          <p className="reveal delay-2" style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem', textAlign: 'center' }}>
            My academic background, hands-on projects, and continuous self-improvement as a developer.
          </p>
        </div>

        <div className="experience-cards" role="list" aria-label="Experience timeline">
          {STATIC_EXP.map((exp, i) => (
            <TimelineItem key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
