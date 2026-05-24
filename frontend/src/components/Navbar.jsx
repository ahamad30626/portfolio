import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About',      href: '#about'      },
  { label: 'Work',       href: '#projects'   },
  { label: 'Journey',    href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0d0d0f]/90 backdrop-blur-md border-b border-[#242428]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
            className="font-mono text-sm font-medium text-white/90 hover:text-[#6366f1] transition-colors tracking-tight hoverable"
          >
            ahamad<span className="text-[#6366f1]">.dev</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                className="hoverable px-4 py-2 text-sm text-[#8a8a94] hover:text-[#f0f0f2] transition-colors rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="hoverable ml-3 px-4 py-2 text-sm border border-[#3a3a42] rounded-lg text-[#f0f0f2] hover:border-[#6366f1] hover:text-[#6366f1] transition-all"
              aria-label="Download resume"
            >
              Resume ↓
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden hoverable flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-px bg-[#f0f0f2] transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-px bg-[#f0f0f2] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#f0f0f2] transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-[#242428] md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                  className="hoverable px-4 py-3 text-sm text-[#8a8a94] hover:text-[#f0f0f2] hover:bg-white/5 rounded-lg transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download
                className="hoverable mt-2 px-4 py-3 text-sm text-center border border-[#3a3a42] rounded-lg text-[#f0f0f2]"
              >
                Download Resume ↓
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
