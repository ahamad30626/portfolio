import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const SKILL_GROUPS = [
  {
    heading: 'Things I reach for first',
    color: 'text-[#6366f1]',
    note: 'Comfortable, fast, confident',
    skills: ['React', 'JavaScript (ES2024)', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'],
  },
  {
    heading: 'Growing in',
    color: 'text-[#f59e0b]',
    note: 'Actively practicing, not just reading docs',
    skills: ['Java + Spring Boot', 'PostgreSQL', 'Docker', 'System Design', 'Data Structures & Algorithms'],
  },
  {
    heading: 'Explored',
    color: 'text-[#10b981]',
    note: "Know enough to be dangerous, wouldn't call myself an expert",
    skills: ['Next.js', 'MongoDB', 'Redis', 'AWS EC2', 'Python', 'Figma'],
  },
  {
    heading: 'Currently on my radar',
    color: 'text-[#f43f5e]',
    note: "Watching, learning, haven't shipped yet",
    skills: ['WebGL / Three.js', 'Rust (wasm)', 'Edge computing', 'LLM APIs'],
  },
];

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="skills" className="section-pad" ref={ref} aria-label="Skills section">
      <div className="max-w-6xl mx-auto px-6">

        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#6366f1] tracking-widest uppercase mb-4"
        >
          02 / skills
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6"
            >
              What I know,<br />
              <span className="text-[#8a8a94] font-normal">and what I'm learning.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[#8a8a94] text-base leading-relaxed max-w-md"
            >
              I don't believe in listing every technology I've touched. These are the things
              I actually use, and what I'm honest about still learning.
            </motion.p>
          </div>

          {/* Right — Skill groups */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="space-y-3"
          >
            {SKILL_GROUPS.map((g, gi) => (
              <motion.div
                key={gi}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + gi * 0.08, duration: 0.5 }}
                className="border border-[#242428] rounded-xl overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpanded(expanded === gi ? null : gi)}
                  className="hoverable w-full flex items-center justify-between p-4 text-left hover:bg-[#141416] transition-colors"
                  aria-expanded={expanded === gi}
                >
                  <div>
                    <span className={`text-sm font-semibold ${g.color}`}>{g.heading}</span>
                    <p className="text-xs text-[#4a4a54] mt-0.5 font-mono">{g.note}</p>
                  </div>
                  <span className={`text-[#4a4a54] text-lg transition-transform ${expanded === gi ? 'rotate-45' : ''}`}>+</span>
                </button>

                {/* Pills */}
                {expanded === gi && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 flex flex-wrap gap-2 border-t border-[#242428]"
                    style={{ paddingTop: '12px' }}
                  >
                    {g.skills.map(s => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-[#1c1c20] border border-[#3a3a42] text-xs font-mono text-[#f0f0f2]"
                      >
                        {s}
                      </span>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
