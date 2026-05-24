import { useEffect, useRef } from 'react';

const ROLES = [
  'Frontend Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Full Stack Engineer',
  'Open Source Contributor',
];

export default function Hero() {
  const typeRef = useRef(null);

  useEffect(() => {
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timer;

    const type = () => {
      const el = typeRef.current;
      if (!el) return;
      const word = ROLES[roleIdx];

      if (!deleting) {
        el.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) { deleting = true; timer = setTimeout(type, 1800); return; }
      } else {
        el.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
      }
      timer = setTimeout(type, deleting ? 50 : 80);
    };

    timer = setTimeout(type, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" aria-label="Hero section">
      <div className="hero-bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="container">
        <div className="hero-content">
          <p className="hero-greeting">👋&nbsp; Hi there, I'm</p>

          <h1 className="hero-name" aria-label="Ahamad">
            <span className="word">Ahamad</span>
          </h1>

          <div className="hero-role-wrapper" aria-live="polite">
            <span className="typewriter-prefix">I'm a&nbsp;</span>
            <span ref={typeRef} id="typewriter" aria-label="Animated role text" />
          </div>

          <p className="hero-description">
            I design and build <strong>high-performance web experiences</strong> that are beautiful,
            accessible, and memorable. Turning complex problems into elegant, pixel-perfect interfaces.
          </p>

          <div className="hero-buttons">
            <a
              href="#projects"
              className="btn btn-primary"
              id="hero-cta-work"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              View My Work
            </a>
            <a href="#" className="btn btn-outline" id="hero-cta-resume" aria-label="Download resume PDF">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-mouse" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
