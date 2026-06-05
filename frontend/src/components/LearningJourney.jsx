import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const MILESTONES = [
  {
    year: 'Aug 2021',
    icon: '🌱',
    title: 'First line of code',
    desc: 'Started with HTML/CSS tutorials on YouTube. Built a clone of a random website just to see if I could. It looked terrible. I was hooked.',
    type: 'start',
  },
  {
    year: 'Jan 2022',
    icon: '⚡',
    title: 'JavaScript fundamentals',
    desc: 'Learned variables, functions, DOM manipulation. Built a to-do app, a quiz, a weather widget using public APIs. Understood why JS is everywhere.',
    type: 'learn',
  },
  {
    year: 'Jun 2022',
    icon: '⚛️',
    title: 'Discovered React',
    desc: 'Components, state, props — it all clicked. Built my first SPA. Started understanding the difference between writing code that works and writing code that lasts.',
    type: 'learn',
  },
  {
    year: 'Aug 2023',
    icon: '🎓',
    title: 'B.Tech CSE begins',
    desc: 'Started formal Computer Science education. Data Structures & Algorithms, DBMS, OS concepts — things that helped me understand *why* design patterns exist.',
    type: 'milestone',
  },
  {
    year: 'Jan 2024',
    icon: '🔷',
    title: 'TypeScript + Next.js',
    desc: 'Made the switch to TypeScript. Painful at first, then life-saving. Built server-rendered apps with Next.js. Started taking performance seriously.',
    type: 'learn',
  },
  {
    year: 'Jun 2024',
    icon: '🚀',
    title: 'Hackathon — SecureSync AI',
    desc: 'Built a real-time insurance dashboard in a hackathon. First time I had to ship something under real time pressure. Learned more in 48 hours than weeks of tutorials.',
    type: 'milestone',
  },
  {
    year: '2025',
    icon: '🎯',
    title: 'DSA + System Design grind',
    desc: "Practising DSA consistently. Reading system design case studies. Building projects that aren't just UI — things with real architectural decisions.",
    type: 'now',
  },
  {
    year: 'Next',
    icon: '🔭',
    title: 'SWE internship',
    desc: 'Join a team where I can contribute meaningfully, learn from experienced engineers, and build products real users depend on.',
    type: 'future',
  },
];

const TYPE_STYLE = {
  start:     'border-emerald-500/50 bg-emerald-500/10',
  learn:     'border-indigo-500/50 bg-indigo-500/10',
  milestone: 'border-amber-500/50 bg-amber-500/10',
  now:       'border-sky-500/50 bg-sky-500/10',
  future:    'border-slate-600/50 bg-slate-700/10',
};

export default function LearningJourney() {
  return (
    <section id="journey" className="py-20 lg:py-28" aria-label="Learning journey">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          Learning journey
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          How I got here
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-12 max-w-xl">
          Not a straight line. More like a series of "oh, <em>that's</em> how it works" moments.
        </motion.p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[21px] top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent hidden md:block" />

          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                {...fade(0.05 * i)}
                className="relative md:pl-14 flex gap-4 md:gap-0"
              >
                {/* Icon dot */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center text-lg md:absolute md:left-0 md:top-0 ${TYPE_STYLE[m.type]}`}>
                  {m.icon}
                </div>

                {/* Content */}
                <div className="flex-1 md:ml-0 bg-[#0e1018] border border-white/[0.07] rounded-xl p-4 hover:border-white/[0.11] transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-1.5">
                    <span className="font-mono text-xs font-bold text-slate-500">{m.year}</span>
                    <h3 className="text-sm font-semibold text-slate-200">{m.title}</h3>
                    {m.type === 'now' && (
                      <span className="px-2 py-0.5 bg-sky-500/15 border border-sky-500/25 text-sky-400 text-[10px] font-semibold rounded-full uppercase tracking-wide">
                        Current
                      </span>
                    )}
                    {m.type === 'future' && (
                      <span className="px-2 py-0.5 bg-slate-700/40 border border-slate-600/30 text-slate-500 text-[10px] font-semibold rounded-full uppercase tracking-wide">
                        Goal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
