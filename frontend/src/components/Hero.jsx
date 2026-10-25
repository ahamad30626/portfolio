export default function Hero() {
  return (
    <section id="hero" aria-label="Hero section">

      {/* Giant PORTFOLIO text — behind photo */}
      <div className="hero-bg-text" aria-hidden="true">PORTFOLIO</div>

      {/* Photo — layered above text, dissolves at bottom */}
      <div className="hero-photo-wrap" aria-hidden="true">
        <img src="/hero-photo.jpg" alt="" />
      </div>

      {/* Corner labels */}
      <div className="hero-top-left" aria-hidden="true">
        <strong>FRONTEND DEVELOPER</strong>
        DIGITAL CREATOR
      </div>
      <div className="hero-top-right" aria-hidden="true">
        OPEN TO OPPORTUNITIES <span className="hero-spark">✦</span>
      </div>

      {/* Main layout: left content | right stats */}
      <div className="hero-inner">
        <div className="container" style={{ display: 'contents' }}>

          {/* ── LEFT COLUMN ── */}
          <div className="hero-left">
            <span className="hero-greeting">Hello, I&apos;m</span>
            <h1 className="hero-name" aria-label="Salam Ahamad Shaik">
              SALAM AHAMAD<br />SHAIK
            </h1>
            <p className="hero-role">FRONTEND REACT DEVELOPER</p>
            <p className="hero-bio">
              I design and build stylish, user-focused web experiences that combine
              creativity with strategy. Passionate about clean component architecture,
              smooth animations, and details that make a difference.
            </p>
            <div className="hero-available">
              <span className="hero-available-dot" aria-hidden="true" />
              ANDHRA PRADESH, INDIA — B.TECH CSE 2026
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="hero-right">
            <div className="hero-badge" aria-label="Turning ideas into powerful digital experiences">
              Turning ideas into powerful digital experiences.
            </div>

            <div className="hero-stats" role="list" aria-label="Key stats">
              <div className="hero-stat" role="listitem">
                <div className="hero-stat-num" aria-label="3 plus years coding">3+</div>
                <div className="hero-stat-label">Years Coding</div>
              </div>
              <div className="hero-stat" role="listitem">
                <div className="hero-stat-num" aria-label="10 plus projects shipped">10+</div>
                <div className="hero-stat-label">Projects Shipped</div>
              </div>
              <div className="hero-stat" role="listitem">
                <div className="hero-stat-num" aria-label="5 plus tech stacks">5+</div>
                <div className="hero-stat-label">Tech Stacks</div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
