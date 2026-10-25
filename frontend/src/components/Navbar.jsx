import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#about',    label: 'About',    section: 'about' },
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#contact',  label: 'Contact',  section: 'contact', cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('');
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(sec => {
        if (sec.getBoundingClientRect().top <= 100) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setMenuOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header id="navbar" className={scrolled ? 'scrolled' : ''} role="banner">
        <div className="container">
          <nav className="nav-inner" aria-label="Main navigation">
            <a href="#hero" className="nav-logo" onClick={() => go('#hero')} aria-label="Home">
              S<span>A</span>SHAIK
            </a>

            <ul className="nav-links" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.section}>
                  <a
                    href={link.href}
                    className={`nav-link${link.cta ? ' nav-cta' : ''}${active === link.section ? ' active' : ''}`}
                    onClick={e => { e.preventDefault(); go(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        <ul className="mobile-nav-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.section}>
              <a href={link.href} className="mobile-nav-link" onClick={e => { e.preventDefault(); go(link.href); }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
