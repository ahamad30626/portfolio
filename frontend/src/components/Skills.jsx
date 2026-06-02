import { useEffect, useRef, useState } from 'react';

// Frontend-only skill groupings — honest, no fake percentages
const STATIC_SKILLS = [
  {
    category: 'Core Frontend',
    icon: 'code',
    description: 'What I reach for first',
    skills: [
      { name: 'React.js',      iconColor: '#61DAFB' },
      { name: 'Next.js',       iconColor: '#ffffff' },
      { name: 'JavaScript',    iconColor: '#F7DF1E' },
      { name: 'TypeScript',    iconColor: '#3178C6' },
      { name: 'HTML5',         iconColor: '#E34F26' },
      { name: 'CSS3',          iconColor: '#1572B6' },
    ],
  },
  {
    category: 'Styling & UI',
    icon: 'palette',
    description: 'Crafting beautiful, responsive interfaces',
    skills: [
      { name: 'Tailwind CSS',     iconColor: '#06B6D4' },
      { name: 'Bootstrap',        iconColor: '#7952B3' },
      { name: 'Framer Motion',    iconColor: '#ffffff' },
      { name: 'Responsive Design',iconColor: '#6366F1' },
      { name: 'CSS Animations',   iconColor: '#F43F5E' },
      { name: 'Figma',            iconColor: '#F24E1E' },
    ],
  },
  {
    category: 'State & Architecture',
    icon: 'layers',
    description: 'Scalable component patterns',
    skills: [
      { name: 'Redux Toolkit',  iconColor: '#764ABC' },
      { name: 'Context API',    iconColor: '#61DAFB' },
      { name: 'React Query',    iconColor: '#FF4154' },
      { name: 'Custom Hooks',   iconColor: '#06B6D4' },
      { name: 'Vite',           iconColor: '#646CFF' },
      { name: 'REST API Integration', iconColor: '#10B981' },
    ],
  },
  {
    category: 'Tools & Workflow',
    icon: 'tools',
    description: 'Part of my daily workflow',
    skills: [
      { name: 'Git & GitHub',   iconColor: '#F05032' },
      { name: 'VS Code',        iconColor: '#007ACC' },
      { name: 'Chrome DevTools',iconColor: '#4285F4' },
      { name: 'Lighthouse',     iconColor: '#F59E0B' },
      { name: 'npm / pnpm',     iconColor: '#CB3837' },
      { name: 'Vercel',         iconColor: '#ffffff' },
    ],
  },
];

const CATEGORY_ICONS = {
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  palette: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/>
      <circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  layers: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  tools: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

const CATEGORY_ICON_CLASS = {
  code:    'frontend-icon',
  palette: 'frontend-icon',
  layers:  'backend-icon',
  tools:   'tools-icon',
};

function SkillPill({ skill }) {
  return (
    <div
      className="skill-pill-item"
      role="listitem"
      style={{ '--pill-color': skill.iconColor }}
      title={skill.name}
    >
      <span className="skill-pill-dot" style={{ background: skill.iconColor }} aria-hidden="true" />
      <span className="skill-pill-name">{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  const [categories] = useState(STATIC_SKILLS);
  const spotlightRef = useRef(null);

  // Mouse follow spotlight
  useEffect(() => {
    const section = document.getElementById('skills');
    if (!section || !spotlightRef.current) return;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      spotlightRef.current.style.left = (e.clientX - rect.left) + 'px';
      spotlightRef.current.style.top  = (e.clientY - rect.top)  + 'px';
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="skills" aria-label="Skills section">
      <div ref={spotlightRef} className="skills-spotlight" aria-hidden="true" />
      <div className="skills-bg-orbs" aria-hidden="true">
        <div className="skills-orb skills-orb-1" /><div className="skills-orb skills-orb-2" /><div className="skills-orb skills-orb-3" />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="skills-header">
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Tech Stack</span>
          <h2 className="section-title skills-section-title reveal delay-1">
            My Frontend Toolkit
            <span className="title-underline-bar" aria-hidden="true" />
          </h2>
          <p className="skills-subtitle reveal delay-2">
            Technologies I use to craft fast, accessible, and beautiful user interfaces.
            Grouped by what I'm confident in vs still growing.
          </p>
        </div>

        {categories.map((cat, idx) => (
          <div key={cat.category} className="skill-category-block reveal" data-delay={idx}>
            <div className="skill-category-header">
              <span className={`skill-category-icon-wrap ${CATEGORY_ICON_CLASS[cat.icon] || 'frontend-icon'}`}>
                {CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.code}
              </span>
              <div>
                <h3 className="skill-category-title">{cat.category}</h3>
                {cat.description && (
                  <p className="skill-category-desc">{cat.description}</p>
                )}
              </div>
              <div className="skill-category-line" />
            </div>

            {/* Pill-based display — no fake % */}
            <div className="skills-pills-grid" role="list" aria-label={`${cat.category} skills`}>
              {cat.skills.map(skill => (
                <SkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}

        {/* GitHub streak stats */}
        <div className="skills-github-streak reveal" aria-label="GitHub streak stats">
          <img
            src="https://streak-stats.demolab.com?user=ahamad30626&theme=tokyonight&hide_border=true&background=0f0f1a&stroke=6366f1&ring=6366f1&fire=f59e0b&currStreakLabel=f0f0f2"
            alt="Ahamad's GitHub contribution streak"
            loading="lazy"
            className="github-streak-img"
          />
        </div>
      </div>
    </section>
  );
}
