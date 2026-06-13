export default function About() {
  return (
    <section id="about" aria-label="About section">
      <div className="container">
        <div className="about-grid">

          {/* Profile Image */}
          <div className="about-img-wrapper reveal-left">
            <div className="profile-glow" aria-hidden="true" />
            <div className="profile-frame">
              <img src="/profile.png" alt="Salam Ahamad Shaik — Frontend React Developer" className="profile-img" loading="lazy" />
            </div>
            <div className="profile-badge badge-available" aria-label="Available for work">
              🟢 Available for Internships
            </div>
            <div className="profile-badge badge-exp" aria-label="3 plus years experience">
              <span className="badge-icon">💼</span>
              <span>Frontend Developer</span>
            </div>
          </div>

          {/* Bio */}
          <div className="about-text">
            <span className="section-label reveal">About Me</span>
            <h2 className="section-title reveal delay-1">Frontend React Developer<br />Building Scalable UI.</h2>

            <p className="about-bio reveal delay-2">
              I&apos;m <strong>Salam Ahamad Shaik</strong>, a passionate <strong>Frontend Developer</strong> specialising
              in <strong>React.js</strong> and <strong>Next.js</strong>. I design and build
              high-performance, scalable, and accessible web applications with a strong focus on
              <strong> component architecture</strong>, <strong>state management</strong>, and
              <strong> responsive UI/UX design</strong>.
            </p>
            <p className="about-bio reveal delay-2">
              With hands-on experience in <strong>TypeScript</strong>, <strong>Tailwind CSS</strong>,
              <strong> Redux Toolkit</strong>, and <strong>REST API integration</strong>, I translate
              complex requirements into clean, maintainable code. I follow industry best practices
              including <strong>code splitting</strong>, <strong>lazy loading</strong>,
              <strong> Web Accessibility (WCAG)</strong>, and <strong>SEO optimisation</strong> to
              deliver production-ready frontend solutions.
            </p>
            <p className="about-bio reveal delay-2">
              I am actively seeking <strong>frontend internship opportunities</strong> and
              <strong> freelance collaborations</strong> where I can contribute to real-world
              products, grow within an engineering team, and apply modern React ecosystems to
              solve meaningful problems.
            </p>

            {/* Currently Learning */}
            <div className="currently-learning reveal delay-3" aria-label="Currently learning">
              <span className="cl-icon">📚</span>
              <div>
                <span className="cl-label">Currently Learning</span>
                <span className="cl-value">Next.js App Router · Advanced React Patterns · Web Performance Optimisation · WCAG Accessibility</span>
              </div>
            </div>

            {/* Stats */}
            <div className="about-stats reveal delay-3">
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Projects Shipped</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3+</div>
                <div className="stat-label">Years Coding</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Tech Stacks</div>
              </div>
            </div>

            {/* Tech chips */}
            <div className="skills-chips reveal delay-4" aria-label="Tech skills">
              {['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Redux', 'REST APIs', 'Git & GitHub'].map(c => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
