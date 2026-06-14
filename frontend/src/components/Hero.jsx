import { useEffect, useRef } from 'react';

const ROLES = [
  'Frontend React Developer',
  'React & Next.js Engineer',
  'UI/UX Focused Builder',
  'Open to Internships',
];

export default function Hero() {
  const typeRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timer;

    const type = () => {
      const el = typeRef.current;
      if (!el) return;
      const word = ROLES[roleIdx];
      if (!deleting) {
        el.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) { deleting = true; timer = setTimeout(type, 2000); return; }
      } else {
        el.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
      }
      timer = setTimeout(type, deleting ? 45 : 75);
    };

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" aria-label="Hero section">
      {/* Animated background */}
      <div className="hero-bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Grid overlay */}
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="container">
        <div className="hero-content">

          {/* Availability pill */}
          <div className="hero-availability reveal">
            <span className="availability-dot" aria-hidden="true" />
            <span>Available for Internships &amp; Freelance</span>
          </div>

          {/* Name */}
          <h1 className="hero-name" aria-label="Salam Ahamad Shaik">
            <span className="hero-name-line">Salam Ahamad</span>
            <span className="hero-name-line hero-name-accent">Shaik</span>
          </h1>

          {/* Typewriter */}
          <div className="hero-role-wrapper reveal delay-1" aria-live="polite">
            <span className="typewriter-prefix">I build&nbsp;</span>
            <span ref={typeRef} id="typewriter" aria-label="Animated role text" />
            <span ref={cursorRef} className="typewriter-cursor" aria-hidden="true">|</span>
          </div>

          {/* Description */}
          <p className="hero-description reveal delay-2">
            Passionate <strong>Frontend Developer</strong> crafting pixel-perfect,
            high-performance web experiences with <strong>React.js</strong> &amp; <strong>Next.js</strong>.
            I focus on clean component architecture, smooth animations, and accessible,
            mobile-first interfaces that users love.
          </p>

          {/* Meta */}
          <div className="hero-meta reveal delay-3">
            <span className="hero-meta-item">📍 Andhra Pradesh, India</span>
            <span className="hero-meta-dot" aria-hidden="true">·</span>
            <span className="hero-meta-item">🎓 B.Tech CSE — 2026</span>
            <span className="hero-meta-dot" aria-hidden="true">·</span>
            <span className="hero-meta-item">⚡ React · Next.js · TypeScript</span>
          </div>

          {/* CTAs */}
          <div className="hero-buttons reveal delay-3">
            <a
              href="#projects"
              className="btn btn-primary"
              id="hero-cta-work"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
              aria-label="View my projects"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
              </svg>
              View My Work
            </a>
            <a
              href="https://drive.google.com/file/d/1GuprfBP4TYeouOslvQg7SXZb9DwLSHcw/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              id="hero-cta-resume"
              aria-label="View resume PDF"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              id="hero-cta-contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              aria-label="Contact me"
            >
              Say Hello 👋
            </a>
          </div>

          {/* Tech stack strip */}
          <div className="hero-tech-strip reveal delay-4" aria-label="Tech stack">
            {['React', 'Next.js', 'TypeScript', 'Tailwind', 'JavaScript', 'Git'].map(t => (
              <span key={t} className="hero-tech-tag">{t}</span>
            ))}
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
