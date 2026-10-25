const EDUCATION = [
  {
    dates: '2022 — 2026',
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'KL University, Andhra Pradesh',
  },
  {
    dates: '2023',
    degree: 'Frontend Development Certification',
    school: 'Meta / Coursera',
  },
];

const SKILLS = [
  'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
  'Redux', 'Framer Motion', 'Figma', 'Vite', 'REST APIs', 'Git & GitHub', 'Vercel',
];

const STEPS = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Understanding goals, audience, and project requirements.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'IDEATE',
    desc: 'Planning, wireframing, and creating the right concept.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'DESIGN',
    desc: 'Crafting visual design with a focus on user experience.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
  {
    num: '04',
    title: 'DEVELOP',
    desc: 'Building fast, responsive, and high-performing websites.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    num: '05',
    title: 'DELIVER',
    desc: 'Testing, optimising, and launching with perfection.',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" aria-label="About, Education and Skills">
      <div className="container">

        <h2 className="about-top-label reveal">EDUCATION &amp; SKILLS</h2>

        <div className="about-grid">

          {/* ── LEFT: Education + Skills ── */}
          <div className="reveal-left">
            <p className="about-col-label">EDUCATION</p>
            {EDUCATION.map((e, i) => (
              <div key={i} className="edu-entry">
                <div className="edu-dates">{e.dates}</div>
                <div className="edu-degree">{e.degree}</div>
                <div className="edu-school">{e.school}</div>
              </div>
            ))}

            <div className="skills-divider" />
            <p className="about-col-label">SKILLS</p>
            <div className="skills-pills" role="list" aria-label="Skill tags">
              {SKILLS.map(s => (
                <span key={s} className="skill-pill" role="listitem">{s}</span>
              ))}
            </div>
          </div>

          {/* ── MIDDLE: Work Process ── */}
          <div className="reveal delay-1">
            <p className="about-col-label">WORK PROCESS</p>
            <div className="process-steps" role="list" aria-label="Work process steps">
              {STEPS.map(step => (
                <div key={step.num} className="process-step" role="listitem">
                  <div className="process-step-left">
                    <span className="process-step-num">{step.num}</span>
                    <div className="process-step-icon">{step.icon}</div>
                  </div>
                  <div>
                    <div className="process-step-title">{step.title}</div>
                    <p className="process-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Quote panel ── */}
          <div className="quote-panel reveal delay-2" role="blockquote">
            <span className="quote-mark" aria-hidden="true">&ldquo;</span>
            <p className="quote-text">
              Good design is not just how it looks, but how it works. Every pixel has a purpose.
            </p>
            <p className="quote-cta">LET&apos;S CREATE SOMETHING GREAT TOGETHER.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
