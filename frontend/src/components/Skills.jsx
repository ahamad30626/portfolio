import { useEffect, useRef, useState } from 'react';
import { fetchSkills } from '../services/api';

// Honest, credibility-first skill groupings — NO fake percentages
const STATIC_SKILLS = [
  {
    category: 'Frontend',
    icon: 'code',
    description: 'What I reach for first',
    skills: [
      { name: 'React',          iconColor: '#61DAFB', abbr: 'Re' },
      { name: 'TypeScript',     iconColor: '#3178C6', abbr: 'TS' },
      { name: 'JavaScript',     iconColor: '#F7DF1E', abbr: 'JS' },
      { name: 'Tailwind CSS',   iconColor: '#06B6D4', abbr: 'TW' },
      { name: 'Next.js',        iconColor: '#ffffff', abbr: 'Nx' },
      { name: 'Framer Motion',  iconColor: '#ffffff', abbr: 'FM' },
    ],
  },
  {
    category: 'Backend',
    icon: 'server',
    description: 'Building and growing',
    skills: [
      { name: 'Node.js',     iconColor: '#5FA04E', abbr: 'No' },
      { name: 'Spring Boot', iconColor: '#6DB33F', abbr: 'SB' },
      { name: 'PostgreSQL',  iconColor: '#4169E1', abbr: 'PG' },
      { name: 'MongoDB',     iconColor: '#47A248', abbr: 'MG' },
      { name: 'Redis',       iconColor: '#DC382D', abbr: 'Rd' },
      { name: 'REST APIs',   iconColor: '#6366F1', abbr: 'AP' },
    ],
  },
  {
    category: 'Tools & DevOps',
    icon: 'tools',
    description: 'Part of my daily workflow',
    skills: [
      { name: 'Git',    iconColor: '#F05032', abbr: 'Gt' },
      { name: 'Docker', iconColor: '#2496ED', abbr: 'Dk' },
      { name: 'Figma',  iconColor: '#F24E1E', abbr: 'Fi' },
      { name: 'Linux',  iconColor: '#FCC624', abbr: 'Lx' },
      { name: 'AWS',    iconColor: '#FF9900', abbr: 'AW' },
      { name: 'CI/CD',  iconColor: '#6366F1', abbr: 'CI' },
    ],
  },
];

const CATEGORY_ICONS = {
  code: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  server: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  tools: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

const CATEGORY_ICON_CLASS = {
  code: 'frontend-icon',
  server: 'backend-icon',
  tools: 'tools-icon',
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
  const [categories, setCategories] = useState(STATIC_SKILLS);
  const spotlightRef = useRef(null);

  useEffect(() => {
    fetchSkills()
      .then(data => {
        // Only replace if backend returns the expected shape
        if (Array.isArray(data) && data.length > 0) setCategories(data);
      })
      .catch(() => { /* use static fallback */ });
  }, []);

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
            Tools I Work With
            <span className="title-underline-bar" aria-hidden="true" />
          </h2>
          <p className="skills-subtitle reveal delay-2">
            Things I actually use — grouped by what I'm confident in vs still growing.
            No made-up percentages.
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
