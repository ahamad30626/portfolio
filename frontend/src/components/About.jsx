export default function About() {
  return (
    <section id="about" aria-label="About section">
      <div className="container">
        <div className="about-grid">

          {/* Profile Image */}
          <div className="about-img-wrapper reveal-left">
            <div className="profile-glow" aria-hidden="true" />
            <div className="profile-frame">
              <img src="/profile.png" alt="Ahamad — Frontend Developer" className="profile-img" loading="lazy" />
            </div>
            <div className="profile-badge badge-available" aria-label="Available for work">
              🟢 Available for Work
            </div>
            <div className="profile-badge badge-exp" aria-label="3 plus years learning">
              <span className="badge-icon">🚀</span>
              <span>3+ Years Learning</span>
            </div>
          </div>

          {/* Bio */}
          <div className="about-text">
            <span className="section-label reveal">About Me</span>
            <h2 className="section-title reveal delay-1">Curious by nature.<br />Builder by choice.</h2>

            <p className="about-bio reveal delay-2">
              I started coding in 2021 — not from a bootcamp or a college syllabus, but from pure curiosity.
              I wanted to understand <em>why</em> websites worked the way they did, so I opened DevTools
              one night and never really closed it.
            </p>
            <p className="about-bio reveal delay-2">
              I'm a student developer who ships things in the evenings. I care deeply about{' '}
              <strong>performance</strong>, clean APIs, and interfaces that feel obvious to use.
              I get unreasonably excited when an animation lands perfectly or an API feels intuitive
              in hindsight.
            </p>
            <p className="about-bio reveal delay-2">
              My goal is to work on products real people actually use — not apps that demo well
              and break in production. I'm currently open to{' '}
              <strong>internships and freelance projects</strong> where I can contribute meaningfully.
            </p>

            {/* Currently Learning */}
            <div className="currently-learning reveal delay-3" aria-label="Currently learning">
              <span className="cl-icon">📚</span>
              <div>
                <span className="cl-label">Currently Learning</span>
                <span className="cl-value">System Design · DSA · Spring Boot internals</span>
              </div>
            </div>

            {/* Stats — honest numbers only */}
            <div className="about-stats reveal delay-3">
              <div className="stat-item">
                <div className="stat-number">20+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Learning</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Bugs Fixed</div>
              </div>
            </div>

            {/* GitHub stats image */}
            <div className="github-stats-wrap reveal delay-4">
              <img
                src="https://github-readme-stats.vercel.app/api?username=ahamad30626&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0f0f1a&title_color=6366f1&icon_color=06b6d4&text_color=c9d1d9"
                alt="Ahamad's GitHub contribution stats"
                loading="lazy"
                className="github-stats-img"
              />
            </div>

            {/* Tech chips */}
            <div className="skills-chips reveal delay-4" aria-label="Tech skills">
              {['React', 'TypeScript', 'Node.js', 'Spring Boot', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Git'].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
