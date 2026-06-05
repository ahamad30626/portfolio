import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-14" aria-label="Hero section">
      <div className="max-w-5xl mx-auto px-6 py-20 w-full">
        <div className="max-w-2xl">
            <motion.p
              className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              Hello, world 👋
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-slate-50 leading-tight mb-4"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            >
              I'm <span className="text-indigo-400">Ahamad</span>
            </motion.h1>

            <motion.p
              className="text-lg text-slate-300 font-medium mb-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              Frontend React Developer · CS Student
            </motion.p>

            <motion.p
              className="text-slate-400 leading-relaxed mb-8 max-w-lg"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            >
              I build fast, accessible React applications with a strong emphasis on
              clean component architecture, responsive design, and smooth user experiences.
              Currently pursuing B.Tech in CSE and actively looking for
              <span className="text-slate-300"> SWE internships</span>.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                id="hero-view-work"
              >
                View My Work
              </a>
              <a
                href="https://github.com/ahamad30626"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-slate-100 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                aria-label="GitHub Profile"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/salam-ahamad-shaik-634686346/"
                target="_blank" rel="noopener noreferrer"
                className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-slate-100 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                aria-label="LinkedIn Profile"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:2300030626cseh1@gmail.com"
                className="px-5 py-2.5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-slate-100 text-sm font-medium rounded-lg transition-colors"
                aria-label="Send Email"
              >
                Email Me
              </a>
            </motion.div>

            {/* Availability badge */}
            <motion.div
              className="mt-8 flex items-center gap-2.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span className="text-sm text-slate-400">
                Available for internships &amp; frontend roles — <span className="text-slate-300">India &amp; Remote</span>
              </span>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
