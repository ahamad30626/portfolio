import { useEffect, useRef, useState } from 'react';
import { fetchSkills } from '../services/api';

// Static fallback data (matches backend)
const STATIC_SKILLS = [
  { category: 'Frontend', icon: 'code', skills: [
    { name: 'React', level: 95, iconColor: '#61DAFB' },
    { name: 'Next.js', level: 90, iconColor: '#ffffff' },
    { name: 'TypeScript', level: 88, iconColor: '#3178C6' },
    { name: 'Tailwind CSS', level: 92, iconColor: '#06B6D4' },
    { name: 'JavaScript', level: 93, iconColor: '#F7DF1E' },
    { name: 'Framer Motion', level: 80, iconColor: '#ffffff' },
  ]},
  { category: 'Backend', icon: 'server', skills: [
    { name: 'Node.js', level: 87, iconColor: '#5FA04E' },
    { name: 'Spring Boot', level: 82, iconColor: '#6DB33F' },
    { name: 'MongoDB', level: 85, iconColor: '#47A248' },
    { name: 'PostgreSQL', level: 78, iconColor: '#4169E1' },
    { name: 'Redis', level: 75, iconColor: '#DC382D' },
    { name: 'GraphQL', level: 76, iconColor: '#E10098' },
  ]},
  { category: 'AI / ML', icon: 'brain', skills: [
    { name: 'TensorFlow', level: 70, iconColor: '#FF6F00' },
    { name: 'OpenAI API', level: 85, iconColor: '#ffffff' },
    { name: 'LangChain', level: 72, iconColor: '#00A67E' },
    { name: 'Hugging Face', level: 68, iconColor: '#FFD21E' },
    { name: 'Scikit-learn', level: 74, iconColor: '#F89939' },
    { name: 'Vector DB', level: 66, iconColor: '#8B5CF6' },
  ]},
  { category: 'Tools & DevOps', icon: 'tools', skills: [
    { name: 'Git', level: 94, iconColor: '#F05032' },
    { name: 'Docker', level: 80, iconColor: '#2496ED' },
    { name: 'AWS', level: 73, iconColor: '#FF9900' },
    { name: 'Figma', level: 88, iconColor: '#F24E1E' },
    { name: 'Linux', level: 79, iconColor: '#FCC624' },
    { name: 'CI/CD', level: 77, iconColor: '#6366F1' },
  ]},
];

const CIRCUMFERENCE = 2 * Math.PI * 22; // r=22

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
  brain: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    </svg>
  ),
  tools: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
};

const CATEGORY_ICON_CLASS = { code: 'frontend-icon', server: 'backend-icon', brain: 'ai-icon', tools: 'tools-icon' };

function SkillRing({ level, color }) {
  const offset = CIRCUMFERENCE * (1 - level / 100);
  return (
    <svg className="skill-ring" viewBox="0 0 56 56" width="56" height="56">
      <defs>
        <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
      </defs>
      <circle className="skill-ring-bg" cx="28" cy="28" r="22" />
      <circle
        className="skill-ring-fill"
        cx="28" cy="28" r="22"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        stroke={`url(#skillGrad)`}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
      />
    </svg>
  );
}

function SkillCard({ skill }) {
  return (
    <div className="skill-card-new" role="listitem" data-skill={skill.name} data-level={skill.level}>
      <div className="skill-card-glow" />
      <div className="skill-card-inner">
        <div className="skill-ring-wrap" aria-hidden="true">
          <SkillRing level={skill.level} color={skill.iconColor} />
          <div className="skill-icon-svg">
            <span style={{ fontSize: '11px', fontWeight: 700, color: skill.iconColor, letterSpacing: '-0.5px' }}>
              {skill.name.slice(0, 3).toUpperCase()}
            </span>
          </div>
        </div>
        <p className="skill-card-name">{skill.name}</p>
        <span className="skill-pct-label">{skill.level}%</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [categories, setCategories] = useState(STATIC_SKILLS);
  const spotlightRef = useRef(null);

  useEffect(() => {
    fetchSkills()
      .then(setCategories)
      .catch(() => { /* use static fallback */ });
  }, []);

  // Mouse follow spotlight
  useEffect(() => {
    const section = document.getElementById('skills');
    if (!section || !spotlightRef.current) return;
    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      spotlightRef.current.style.left = (e.clientX - rect.left) + 'px';
      spotlightRef.current.style.top = (e.clientY - rect.top) + 'px';
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
            A curated arsenal of technologies I use to craft high-performance digital experiences — from concept to deployment.
          </p>
        </div>

        {categories.map((cat, idx) => (
          <div key={cat.category} className="skill-category-block reveal" data-delay={idx}>
            <div className="skill-category-header">
              <span className={`skill-category-icon-wrap ${CATEGORY_ICON_CLASS[cat.icon] || 'frontend-icon'}`}>
                {CATEGORY_ICONS[cat.icon] || CATEGORY_ICONS.code}
              </span>
              <h3 className="skill-category-title">{cat.category}</h3>
              <div className="skill-category-line" />
            </div>
            <div className="skills-grid-new" role="list">
              {cat.skills.map(skill => <SkillCard key={skill.name} skill={skill} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
