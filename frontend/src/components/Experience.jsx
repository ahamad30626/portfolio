import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TIMELINE = [
  {
    year: '2021',
    role: 'The Beginning',
    org: 'Self-taught',
    type: 'milestone',
    desc: 'Stumbled onto freeCodeCamp at 1am. Wrote HTML. Made a table. Couldn\'t stop.',
    tags: ['HTML', 'CSS', 'JavaScript basics'],
  },
  {
    year: '2022',
    role: 'First React App',
    org: 'Side Projects',
    type: 'project',
    desc: 'Built a todo app in React. Then a weather app. Then a budget tracker. Realized useState wasn\'t magic — it was state management hiding in plain sight.',
    tags: ['React', 'APIs', 'Component patterns'],
  },
  {
    year: '2023',
    role: 'Full-Stack Debut',
    org: 'Personal Project',
    type: 'milestone',
    desc: 'First deployed full-stack app. Real users (my friends) found real bugs in the first hour. Humbling. Educational. Couldn\'t stop thinking about it.',
    tags: ['Node.js', 'MongoDB', 'Deployment', 'CORS (the pain)'],
  },
  {
    year: '2024',
    role: 'Going Deeper',
    org: 'Open Source + Study',
    type: 'learning',
    desc: 'First open source PR merged. Started reading source code instead of just using libraries. System design became an obsession. Learned Docker.',
    tags: ['Open Source', 'Docker', 'System Design', 'Java'],
  },
  {
    year: '2025',
    role: 'Student Developer',
    org: 'Present',
    type: 'current',
    desc: 'Building real things, learning CS fundamentals properly, shipping side projects. Every day something clicks that didn\'t click before.',
    tags: ['Spring Boot', 'DSA', 'Framer Motion', 'shipping'],
    current: true,
  },
];

const TYPE_COLORS = {
  milestone: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-400',
  project:   'border-amber-500/50 bg-amber-500/10 text-amber-400',
  learning:  'border-green-500/50 bg-green-500/10 text-green-400',
  current:   'border-rose-500/50 bg-rose-500/10 text-rose-400',
};

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="experience" className="section-pad" ref={ref} aria-label="Journey section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#6366f1] tracking-widest uppercase mb-4"
        >
          05 / journey
        </motion.p>
        <div className="grid lg:grid-cols-[320px_1fr] gap-16 items-start">

          {/* Left — heading */}
          <div className="lg:sticky lg:top-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-5"
            >
              How I got here.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[#8a8a94] leading-relaxed text-base"
            >
              Not a career ladder. More like a curiosity-driven path with detours, dead ends, and a few moments that made everything click.
            </motion.p>
          </div>

          {/* Right — timeline */}
          <div className="relative">
            {/* Vertical rail */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-[#6366f1]/40 via-[#3a3a42] to-transparent" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
                  className="pl-12 relative"
                  role="listitem"
                >
                  {/* Dot */}
                  <div className={`absolute left-1.5 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.current ? 'border-[#6366f1] bg-[#6366f1]' : 'border-[#3a3a42] bg-[#0d0d0f]'}`}>
                    {item.current && <span className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="border border-[#242428] rounded-xl p-5 hover:border-[#3a3a42] transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                      <div>
                        <span className="font-mono text-xs text-[#6366f1] block mb-1">{item.year}</span>
                        <h3 className="font-bold text-base text-[#f0f0f2]">{item.role}</h3>
                        <p className="text-xs text-[#4a4a54]">{item.org}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full border text-[10px] font-mono ${TYPE_COLORS[item.type]}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-[#8a8a94] leading-relaxed mb-4">{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono border border-[#242428] text-[#8a8a94]">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
