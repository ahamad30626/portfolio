import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } },
};

const stagger = { show: { transition: { staggerChildren: 0.12 } } };

const STATUS_CARDS = [
  { icon: '📚', label: 'Currently Learning', value: 'System Design & DSA', color: 'border-indigo-500/30 bg-indigo-500/5' },
  { icon: '🔨', label: "Building Now",       value: 'This very portfolio', color: 'border-amber-500/30 bg-amber-500/5' },
  { icon: '☕', label: 'Usually Online',      value: 'Evenings — IST',      color: 'border-green-500/30 bg-green-500/5'  },
];

const MILESTONES = [
  { year: '2021', label: 'Wrote my first line of HTML — a button that did nothing. I was hooked.' },
  { year: '2022', label: 'Built my first React app. Spent a week debugging a missing closing tag.' },
  { year: '2023', label: 'Deployed first full-stack project. Real users, real bugs, real learning.' },
  { year: '2024', label: 'Started contributing to open source and studying CS fundamentals seriously.' },
  { year: '2025', label: 'Full-time student, part-time builder. Chasing meaningful work over hype.' },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="section-pad" ref={ref} aria-label="About section">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section label */}
        <motion.p
          variants={fadeUp} initial="hidden" animate={inView ? 'show' : 'hidden'}
          className="font-mono text-xs text-[#6366f1] tracking-widest uppercase mb-4"
        >
          01 / about
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_400px] gap-20 items-start">

          {/* Left — Bio */}
          <motion.div variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-8">
              A developer who cares about
              <span className="underline-accent"> the details.</span>
            </motion.h2>

            <div className="space-y-5 text-[#8a8a94] text-base leading-[1.85]">
              <motion.p variants={fadeUp}>
                I didn't start with a CS degree or a roadmap. I started with curiosity — an
                overwhelming urge to understand why websites worked the way they did. I opened
                DevTools before I ever wrote a line of code. That curiosity turned into an obsession.
              </motion.p>
              <motion.p variants={fadeUp}>
                Right now I'm a student developer who builds things in the evenings. I care deeply
                about <span className="text-[#f0f0f2]">performance, accessibility, and craft</span>.
                I get unreasonably excited about smooth transitions, well-named variables, and
                APIs that feel obvious in hindsight.
              </motion.p>
              <motion.p variants={fadeUp}>
                I struggle with perfectionism — I've scrapped projects five times over because they
                didn't feel right. I'm learning to ship anyway, to let "done" beat "perfect."
                That tension is what keeps me improving.
              </motion.p>
              <motion.p variants={fadeUp}>
                My goal: build software that real people find genuinely useful. Not apps that demo
                well and die in production. <span className="text-[#f0f0f2]">Stuff that works.</span>
              </motion.p>
            </div>

            {/* Tech chips */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Spring Boot', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'Docker', 'Git'].map(t => (
                <span
                  key={t}
                  className="hoverable px-3 py-1 text-xs font-mono border border-[#242428] rounded-full text-[#8a8a94] hover:border-[#6366f1] hover:text-[#f0f0f2] transition-all"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Timeline */}
            <motion.div variants={fadeUp} className="mt-12">
              <p className="text-xs font-mono text-[#4a4a54] uppercase tracking-widest mb-5">Learning Journey</p>
              <div className="space-y-4">
                {MILESTONES.map((m, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center pt-1">
                      <span className="w-px flex-1 bg-[#242428] group-last:bg-transparent" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#3a3a42] group-hover:bg-[#6366f1] transition-colors shrink-0 my-1" />
                    </div>
                    <div className="pb-4">
                      <span className="font-mono text-xs text-[#6366f1] mb-1 block">{m.year}</span>
                      <p className="text-sm text-[#8a8a94] leading-relaxed">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Photo + Status Cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22,1,0.36,1] }}
            className="flex flex-col gap-5"
          >
            {/* Profile image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#242428] aspect-[4/5] bg-[#141416]">
                <img
                  src="/profile.png"
                  alt="Ahamad — developer portrait"
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              {/* Decorative corner */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl border border-[#6366f1]/20 bg-[#6366f1]/5"
              />
            </div>

            {/* Status cards */}
            <div className="space-y-3">
              {STATUS_CARDS.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${c.color}`}
                >
                  <span className="text-xl leading-none mt-0.5">{c.icon}</span>
                  <div>
                    <p className="text-xs text-[#4a4a54] font-mono mb-0.5">{c.label}</p>
                    <p className="text-sm text-[#f0f0f2] font-medium">{c.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
