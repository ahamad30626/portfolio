export default function Hero() {
  return (
    <section id="hero" aria-label="Hero section">

      {/* ── Full-bleed hero background (pre-rendered PORTFOLIO + photo) ── */}
      <div className="hero-bg-image" aria-hidden="true">
        <img src="/hero-bg.jpg" alt="" fetchpriority="high" />
      </div>

      {/* ── Gradient: darken bottom so text sits on solid black ── */}
      <div className="hero-vignette" aria-hidden="true" />

      {/* ── Corner labels ── */}
      <div className="hero-top-left" aria-hidden="true">
        <strong>FRONTEND DEVELOPER</strong>
        DIGITAL CREATOR
      </div>
      <div className="hero-top-right" aria-hidden="true">
        OPEN TO OPPORTUNITIES <span className="hero-spark">✦</span>
      </div>

      {/* ── Main content grid ── */}
      <div className="hero-inner">

        {/* LEFT: name / role / bio / available */}
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

        {/* RIGHT: badge + stats */}
        <div className="hero-right">
          <div className="hero-badge" aria-label="Turning ideas into powerful digital experiences">
            Turning ideas into powerful digital experiences.
          </div>

          <div className="hero-stats" role="list" aria-label="Key stats">
            <div className="hero-stat" role="listitem">
              <div className="hero-stat-num">3+</div>
              <div className="hero-stat-label">Years Coding</div>
            </div>
            <div className="hero-stat" role="listitem">
              <div className="hero-stat-num">10+</div>
              <div className="hero-stat-label">Projects Shipped</div>
            </div>
            <div className="hero-stat" role="listitem">
              <div className="hero-stat-num">5+</div>
              <div className="hero-stat-label">Tech Stacks</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
