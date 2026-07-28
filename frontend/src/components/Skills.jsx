import { useEffect, useRef, useState } from 'react';

const STATIC_SKILLS = [
  {
    category: 'Core Frontend',
    comment: '// what I reach for first',
    icon: 'code',
    skills: [
      { name: 'React.js',   iconColor: '#61DAFB' },
      { name: 'Next.js',    iconColor: '#7ee787' },
      { name: 'JavaScript', iconColor: '#e3b341' },
      { name: 'TypeScript', iconColor: '#79c0ff' },
      { name: 'HTML5',      iconColor: '#ff7b72' },
      { name: 'CSS3',       iconColor: '#79c0ff' },
    ],
  },
  {
    category: 'Styling & UI',
    comment: '// crafting beautiful interfaces',
    icon: 'palette',
    skills: [
      { name: 'Tailwind CSS',      iconColor: '#79c0ff' },
      { name: 'Bootstrap',         iconColor: '#7ee787' },
      { name: 'Framer Motion',     iconColor: '#ff7b72' },
      { name: 'Responsive Design', iconColor: '#7ee787' },
      { name: 'CSS Animations',    iconColor: '#ff7b72' },
      { name: 'Figma',             iconColor: '#ff7b72' },
    ],
  },
  {
    category: 'State & Architecture',
    comment: '// scalable component patterns',
    icon: 'layers',
    skills: [
      { name: 'Redux Toolkit', iconColor: '#a5a3ff' },
      { name: 'Context API',   iconColor: '#61DAFB' },
      { name: 'React Query',   iconColor: '#ff7b72' },
      { name: 'Custom Hooks',  iconColor: '#79c0ff' },
      { name: 'Vite',          iconColor: '#a5a3ff' },
      { name: 'REST APIs',     iconColor: '#7ee787' },
    ],
  },
  {
    category: 'Tools & Workflow',
    comment: '// part of my daily workflow',
    icon: 'tools',
    skills: [
      { name: 'Git & GitHub',    iconColor: '#ff7b72' },
      { name: 'VS Code',         iconColor: '#79c0ff' },
      { name: 'Chrome DevTools', iconColor: '#e3b341' },
      { name: 'Lighthouse',      iconColor: '#e3b341' },
      { name: 'npm / pnpm',      iconColor: '#ff7b72' },
      { name: 'Vercel',          iconColor: '#7ee787' },
    ],
  },
];

const CATEGORY_ICONS = {
  code: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  palette: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
      <circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  layers: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  tools: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

function SkillPill({ skill }) {
  return (
    <span
      className="skill-pill-item"
      role="listitem"
      title={skill.name}
    >
      <span
        className="skill-pill-dot"
        style={{ background: skill.iconColor }}
        aria-hidden="true"
      />
      {skill.name}
    </span>
  );
}

export default function Skills() {
  const [categories] = useState(STATIC_SKILLS);

  return (
    <section id="skills" aria-label="Skills section">
      <div className="container">
        <div className="skills-header">
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>tech-stack</span>
          <h2 className="section-title skills-section-title reveal delay-1">My Frontend Toolkit</h2>
          <p className="skills-subtitle reveal delay-2">
            Technologies I use to craft fast, accessible, and beautiful user interfaces.
          </p>
        </div>

        {categories.map((cat, idx) => (
          <div key={cat.category} className={`skill-category-block reveal delay-${idx + 1}`}>
            <div className="skill-category-header">
              <span className="skill-category-icon-wrap" style={{ color: 'var(--accent-fn)', background: 'rgba(121,192,255,0.1)', border: '1px solid rgba(121,192,255,0.15)' }}>
                {CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.code}
              </span>
              <div>
                <h3 className="skill-category-title">{cat.category}</h3>
                {cat.comment && (
                  <span className="skill-category-comment">{cat.comment}</span>
                )}
              </div>
              <div className="skill-category-line" />
            </div>

            <div className="skills-pills-grid" role="list" aria-label={`${cat.category} skills`}>
              {cat.skills.map(skill => (
                <SkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
