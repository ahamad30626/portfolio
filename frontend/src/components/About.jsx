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
              Available for Work
            </div>
            <div className="profile-badge badge-exp" aria-label="3 plus years experience">
              <span className="badge-icon">🚀</span>
              <span>3+ Years Exp.</span>
            </div>
          </div>

          {/* Bio */}
          <div className="about-text">
            <span className="section-label reveal">About Me</span>
            <h2 className="section-title reveal delay-1">Building Digital Experiences That Matter</h2>

            <p className="about-bio reveal delay-2">
              I'm a <strong>Frontend Developer</strong> passionate about crafting interfaces that aren't just
              functional — they're delightful. With a deep focus on <strong>React</strong>,{' '}
              <strong>TypeScript</strong>, and modern CSS techniques, I bridge the gap between stunning design
              and solid engineering.
            </p>
            <p className="about-bio reveal delay-2">
              When I'm not pushing pixels, I'm exploring <strong>backend technologies</strong>, contributing
              to open-source, or obsessing over the finer details of UX design. I believe every great product
              starts with a great user experience.
            </p>

            <div className="about-stats reveal delay-3">
              <div className="stat-item">
                <div className="stat-number">30+</div>
                <div className="stat-label">Projects Built</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
            </div>

            <div className="skills-chips reveal delay-4" aria-label="Tech skills">
              {['HTML5','CSS3','JavaScript','TypeScript','React','Next.js','Node.js','Spring Boot','MongoDB','Docker'].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
