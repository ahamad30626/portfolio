import { useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { useScrollReveal } from './hooks/useScrollReveal';
import './index.css';

export default function App() {
  useScrollReveal();

  // Re-trigger reveals after any DOM changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
      els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 40) el.classList.add('visible');
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <ParticleCanvas />
      <Navbar />

      <main>
        <Hero />
        <div className="section-divider" aria-hidden="true" />
        <Projects />
        <div className="section-divider" aria-hidden="true" />
        <About />
        <div className="section-divider" aria-hidden="true" />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
