import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '#about',     label: 'About' },
  { href: '#projects',  label: 'Projects' },
  { href: '#skills',    label: 'Skills' },
  { href: '#journey',   label: 'Journey' },
  { href: '#contact',   label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => { if (s.getBoundingClientRect().top <= 90) cur = s.id; });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-[#08090f]/90 backdrop-blur-md border-b border-white/[0.06]' : ''
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-mono text-sm font-medium text-slate-200 hover:text-indigo-400 transition-colors"
            aria-label="Home"
          >
            ahamad<span className="text-indigo-400">.</span>dev
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); go(link.href); }}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active === link.href.replace('#', '')
                    ? 'text-slate-100 bg-white/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1GuprfBP4TYeouOslvQg7SXZb9DwLSHcw/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md transition-colors"
            >
              Resume
            </a>
          </nav>

          {/* Hamburger */}
          <button
            id="hamburger"
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span className={`block w-5 h-px bg-slate-400 transition-all ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-px bg-slate-400 transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-slate-400 transition-all ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 inset-x-0 z-30 bg-[#0e1018]/95 backdrop-blur-lg border-b border-white/[0.06] md:hidden"
          >
            <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); go(link.href); }}
                  className="px-3 py-2.5 text-sm text-slate-300 hover:text-slate-100 hover:bg-white/[0.04] rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://drive.google.com/file/d/1GuprfBP4TYeouOslvQg7SXZb9DwLSHcw/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-3 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-md transition-colors text-center"
              >
                Resume ↗
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
