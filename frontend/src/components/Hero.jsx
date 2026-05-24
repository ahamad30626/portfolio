import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  { prompt: '~', cmd: 'whoami', delay: 400 },
  { output: 'Ahamad — I build things for the web', delay: 900, accent: true },
  { prompt: '~', cmd: 'cat status.txt', delay: 1800 },
  { output: '✦ Open to new opportunities', delay: 2300 },
  { prompt: '~', cmd: 'ls interests/', delay: 3200 },
  { output: 'frontend/  fullstack/  open-source/  learning/', delay: 3700 },
];

function TerminalLine({ line, visible }) {
  const [typed, setTyped] = useState('');
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (!visible) return;
    if (line.cmd) {
      let i = 0;
      const t = setInterval(() => {
        setTyped(line.cmd.slice(0, ++i));
        if (i >= line.cmd.length) clearInterval(t);
      }, 40);
      return () => clearInterval(t);
    }
    if (line.output) {
      const t = setTimeout(() => setShowOutput(true), 60);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (line.prompt) {
    return (
      <div className="flex gap-2 text-sm font-mono leading-7">
        <span className="text-[#6366f1]">❯</span>
        <span className="text-[#8a8a94]">{typed}</span>
        {typed.length < (line.cmd?.length ?? 0) && (
          <span className="inline-block w-1.5 h-4 bg-[#6366f1] animate-pulse mt-1" />
        )}
      </div>
    );
  }

  return showOutput ? (
    <div className={`pl-4 text-sm font-mono leading-7 ${line.accent ? 'text-[#f0f0f2] font-medium' : 'text-[#8a8a94]'}`}>
      {line.output}
    </div>
  ) : null;
}

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState([]);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(v => [...v, i]), line.delay);
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#242428] bg-[#141416] text-xs text-[#8a8a94] mb-8 font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
              Open to opportunities · Based in India
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              I build
              <br />
              <span className="grad-accent">things</span> for
              <br />
              the web.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[#8a8a94] text-lg leading-relaxed max-w-md mb-10"
            >
              I'm <strong className="text-[#f0f0f2] font-medium">Ahamad</strong>, a student developer
              obsessed with building fast, accessible, and human-first web experiences.
              Currently learning system design & shipping side projects.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <a
                href="#projects"
                onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="hoverable px-6 py-3 bg-[#6366f1] text-white rounded-xl font-medium text-sm hover:bg-[#5254cc] transition-all hover:-translate-y-0.5 shadow-lg shadow-indigo-500/20"
              >
                View my work →
              </a>
              <a
                href="https://github.com/ahamad30626"
                target="_blank"
                rel="noopener noreferrer"
                className="hoverable px-6 py-3 border border-[#3a3a42] rounded-xl text-sm text-[#f0f0f2] hover:border-[#6366f1] hover:bg-[#6366f1]/5 transition-all"
              >
                GitHub ↗
              </a>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-6 text-xs text-[#4a4a54]"
            >
              {[
                { label: 'LinkedIn', href: 'https://linkedin.com' },
                { label: 'Twitter', href: 'https://twitter.com' },
                { label: 'Resume', href: '/resume.pdf', download: true },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
                  className="hoverable hover:text-[#8a8a94] transition-colors font-mono tracking-wide"
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.22,1,0.36,1] }}
          >
            <div className="terminal">
              <div className="terminal-bar">
                <span className="terminal-dot bg-[#f43f5e]" />
                <span className="terminal-dot bg-[#f59e0b]" />
                <span className="terminal-dot bg-[#10b981]" />
                <span className="ml-4 text-xs text-[#4a4a54] font-mono">ahamad — zsh</span>
              </div>
              <div className="p-5 space-y-1 min-h-[220px]">
                {LINES.map((line, i) => (
                  <TerminalLine key={i} line={line} visible={visibleLines.includes(i)} />
                ))}
                {visibleLines.length >= LINES.length && (
                  <div className="flex gap-2 text-sm font-mono">
                    <span className="text-[#6366f1]">❯</span>
                    <span className="inline-block w-1.5 h-4 bg-[#6366f1] animate-pulse mt-1" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#4a4a54] text-xs font-mono"
        aria-hidden
      >
        <span>scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#4a4a54] to-transparent"
        />
      </motion.div>
    </section>
  );
}
