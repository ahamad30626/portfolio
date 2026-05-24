import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Static GitHub-style contribution heatmap (52 weeks × 7 days)
function generateHeatmap() {
  const weeks = [];
  for (let w = 0; w < 52; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      const level = rand > 0.7 ? (rand > 0.85 ? (rand > 0.93 ? 4 : 3) : 2) : (rand > 0.4 ? 1 : 0);
      days.push(level);
    }
    weeks.push(days);
  }
  return weeks;
}

const HEATMAP = generateHeatmap();

const GIT_LOG = [
  { hash: 'f947d54', msg: 'revert: restore original dot and ring cursor',        time: '2h ago'   },
  { hash: 'c0048f4', msg: 'feat: colorful blob-style cursor design',              time: '4h ago'   },
  { hash: 'e425ca5', msg: 'fix: mobile responsive layouts + cursor detection',    time: '8h ago'   },
  { hash: '84fc0b6', msg: 'feat: migrate portfolio to React + Spring Boot',       time: '2d ago'   },
  { hash: '8a8a155', msg: 'chore: initial project scaffolding',                   time: '3d ago'   },
];

const BUILDING_NOW = [
  { label: 'Portfolio v2', desc: 'This very page — built with Tailwind + Framer Motion', status: 'Shipping 🚀' },
  { label: 'DSA Practice', desc: 'Working through Blind 75, one problem at a time',       status: 'Daily 📚'   },
  { label: 'System Design', desc: 'Reading Designing Data-Intensive Applications',         status: 'In progress' },
];

function HeatCell({ level }) {
  const cls = ['heat-cell', `heat-${level}`].join(' ');
  return <div className={cls} title={`${level} contributions`} />;
}

export default function Activity() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="activity" className="section-pad" ref={ref} aria-label="Activity section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#6366f1] tracking-widest uppercase mb-4"
        >
          04 / activity
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Terminal git log */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
          >
            <div className="terminal">
              <div className="terminal-bar">
                <span className="terminal-dot bg-[#f43f5e]" />
                <span className="terminal-dot bg-[#f59e0b]" />
                <span className="terminal-dot bg-[#10b981]" />
                <span className="ml-4 text-xs text-[#4a4a54] font-mono">git log --oneline -5</span>
              </div>
              <div className="p-5 space-y-3">
                {GIT_LOG.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-3 group"
                  >
                    <span className="font-mono text-xs text-[#6366f1] shrink-0 mt-0.5">{g.hash}</span>
                    <span className="text-sm text-[#8a8a94] group-hover:text-[#f0f0f2] transition-colors leading-tight flex-1">{g.msg}</span>
                    <span className="font-mono text-[10px] text-[#4a4a54] shrink-0 mt-0.5">{g.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Heatmap */}
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-5 border border-[#242428] rounded-xl p-5 bg-[#0a0a0c]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-[#8a8a94]">GitHub contributions — last year</span>
                <div className="flex items-center gap-1.5 text-[10px] text-[#4a4a54]">
                  Less
                  {[0,1,2,3,4].map(l => <div key={l} className={`heat-cell ${l > 0 ? `heat-${l}` : ''}`} />)}
                  More
                </div>
              </div>
              <div className="flex gap-[3px] overflow-x-auto pb-1">
                {HEATMAP.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <HeatCell key={di} level={level} />
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Building Now */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22,1,0.36,1] }}
          >
            <h3 className="text-xl font-bold mb-5">What I'm building now</h3>
            <div className="space-y-3 mb-8">
              {BUILDING_NOW.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-xl border border-[#242428] hover:border-[#3a3a42] transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-[#6366f1] mt-1.5 shrink-0 animate-pulse" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-[#f0f0f2]">{b.label}</span>
                      <span className="text-[10px] font-mono text-[#4a4a54] border border-[#242428] px-1.5 py-0.5 rounded">{b.status}</span>
                    </div>
                    <p className="text-xs text-[#8a8a94] leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { n: '30+', l: 'Projects' },
                { n: '3+',  l: 'Years learning' },
                { n: '∞',   l: 'Bugs fixed' },
              ].map(s => (
                <div key={s.l} className="p-4 rounded-xl border border-[#242428] text-center hover:border-[#3a3a42] transition-colors">
                  <p className="text-2xl font-bold grad-accent">{s.n}</p>
                  <p className="text-xs text-[#4a4a54] font-mono mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
