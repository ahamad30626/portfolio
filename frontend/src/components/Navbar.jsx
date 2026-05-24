import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'About', section: 'about' },
  { href: '#skills', label: 'Skills', section: 'skills' },
  { href: '#projects', label: 'Projects', section: 'projects' },
  { href: '#experience', label: 'Experience', section: 'experience' },
  { href: '#contact', label: 'Contact', section: 'contact', cta: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);

      // scroll-spy
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top <= 100) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header id="navbar" className={scrolled ? 'scrolled' : ''} role="banner">
        <div className="container">
          <nav className="nav-inner" aria-label="Main navigation">
            <a href="#hero" className="nav-logo" onClick={() => handleNavClick('#hero')} aria-label="Home">
              S.dev
            </a>

            <ul className="nav-links" role="list">
              {NAV_LINKS.map(link => (
                <li key={link.section}>
                  <a
                    href={link.href}
                    className={`nav-link${link.cta ? ' nav-cta' : ''}${active === link.section ? ' active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    data-section={link.section}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              id="hamburger"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span /><span /><span />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav className={`mobile-nav${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
        <ul className="mobile-nav-links" role="list">
          {NAV_LINKS.map(link => (
            <li key={link.section}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
