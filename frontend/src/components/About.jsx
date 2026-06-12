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
              I wanted to understand <em>why</em> websites looked and felt the way they did, so I opened DevTools
              one night and never really closed it.
            </p>
            <p className="about-bio reveal delay-2">
              I specialise in building <strong>modern React applications</strong> — component-driven,
              responsive, and optimised for real users. I care deeply about
              {' '}<strong>UI performance</strong>, accessible interfaces, and experiences that just
              <em> feel</em> right on every device.
            </p>
            <p className="about-bio reveal delay-2">
              My goal is to craft interfaces that real people love using — not just apps that look good
              in screenshots. I'm currently open to{' '}
              <strong>frontend internships and freelance projects</strong> where design and engineering meet.
            </p>

            <div className="currently-learning reveal delay-3" aria-label="Currently learning">
              <span className="cl-icon">📚</span>
              <div>
                <span className="cl-label">Currently Learning</span>
                <span className="cl-value">Advanced React Patterns · Next.js App Router · Web Animations API · Accessibility (WCAG)</span>
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


            {/* Tech chips — frontend only */}
            <div className="skills-chips reveal delay-4" aria-label="Tech skills">
              {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Redux', 'Framer Motion', 'Git'].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
