import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const TIMELINE = [
  {
    year: '2021',
    label: 'The spark',
    text: 'Opened browser DevTools out of curiosity one night and got completely hooked. Started with HTML and CSS, building tiny clone pages just to understand how layouts worked.',
  },
  {
    year: '2022',
    label: 'JavaScript clicks',
    text: "DOM manipulation felt like magic. Built a to-do app, a weather widget, a quiz game. Ugly code, but it worked — and that feeling of \"I built this\" kept me going.",
  },
  {
    year: '2023',
    label: 'React + B.Tech starts',
    text: 'Began B.Tech in Computer Science. Learned React, understood state and components. Built my first real multi-page application. Started taking version control seriously.',
  },
  {
    year: '2024',
    label: 'Levelling up',
    text: 'TypeScript, Next.js, Tailwind CSS. Built SecureSync AI for a hackathon — an insurance dashboard with real API integrations. Understood that clean UI means nothing without solid architecture.',
  },
  {
    year: '2025',
    label: 'Where I am now',
    text: 'Practising DSA, studying system design fundamentals, shipping projects, and actively preparing for SWE internship interviews. This portfolio is part of that effort.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28" aria-label="About section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          About me
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-12">
          Curious by nature.<br className="hidden sm:block" /> Builder by choice.
        </motion.h2>

        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">

          {/* Story */}
          <div className="space-y-5 text-slate-400 leading-relaxed">
            <motion.p {...fade(0.1)}>
              I started coding in 2021 — not from a bootcamp or a structured syllabus, but from
              pure curiosity. I wanted to understand <em className="text-slate-300">why</em> websites
              looked and felt the way they did. So I opened DevTools one evening and never really closed it.
            </motion.p>

            <motion.p {...fade(0.15)}>
              I specialise in building <span className="text-slate-300 font-medium">modern React applications</span> —
              component-driven, responsive, and optimised for real users. I care deeply about UI performance,
              accessible interfaces, and experiences that just <em className="text-slate-300">feel right</em> on
              every device. I get genuinely excited when an animation lands perfectly or a loading state
              actually tells the user something useful.
            </motion.p>

            <motion.p {...fade(0.2)}>
              Currently pursuing a B.Tech in Computer Science (CSE Honours), I spend my evenings
              shipping side projects, practicing DSA, and reading about system design. My goal is to join
              a team where I can contribute meaningfully to real products — not just pad a feature list.
            </motion.p>

            <motion.p {...fade(0.22)}>
              I'm open to <span className="text-slate-300 font-medium">frontend internships</span> and
              junior SWE roles where I can keep learning fast, work with good engineers, and build things
              people actually use.
            </motion.p>

            {/* Currently learning */}
            <motion.div
              {...fade(0.25)}
              className="flex items-start gap-3 p-4 bg-[#0e101a] border border-white/[0.07] rounded-lg"
            >
              <span className="text-lg mt-0.5">📚</span>
              <div>
                <p className="text-xs font-semibold tracking-wider text-indigo-400 uppercase mb-1">Currently Deepening</p>
                <p className="text-sm text-slate-400">
                  Advanced React Patterns · Next.js App Router · Data Structures &amp; Algorithms ·
                  System Design Basics · Web Accessibility (WCAG)
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div {...fade(0.15)} className="space-y-6">
            {/* Profile image */}
            <div className="relative">
              <div className="w-full aspect-square max-w-[260px] mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-[#0e101a] border border-white/[0.07]">
                <img
                  src="/profile.png"
                  alt="Ahamad — Frontend Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 text-sm">
                  <span className="text-4xl mb-2">👨‍💻</span>
                  <span>Ahamad</span>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 bg-[#0e101a] border border-white/[0.08] rounded-lg px-3 py-2 shadow-card">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs text-slate-300">Open to work</span>
              </div>
            </div>

            {/* Tech chips */}
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2.5">Daily stack</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Git'].map(t => (
                  <span key={t} className="px-2.5 py-1 bg-[#131620] border border-white/[0.07] text-slate-300 text-xs rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick facts */}
            <div className="space-y-2.5">
              {[
                { icon: '🎓', text: 'B.Tech CSE — 2023 batch' },
                { icon: '📍', text: 'India (Remote-friendly)' },
                { icon: '💡', text: '5+ projects shipped' },
                { icon: '🎯', text: 'Targeting SWE internships' },
              ].map(f => (
                <div key={f.text} className="flex items-center gap-2.5 text-sm text-slate-400">
                  <span className="text-base">{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Story timeline */}
        <motion.div {...fade(0.2)} className="mt-16">
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-8">
            How I got here
          </h3>
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                {...fade(0.1 + i * 0.05)}
                className="relative pl-14 timeline-line last:before:hidden"
              >
                {/* Year dot */}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full border border-indigo-500/40 bg-[#131620] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                </div>
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <span className="font-mono text-sm font-bold text-indigo-400">{item.year}</span>
                  <span className="text-sm font-medium text-slate-200">{item.label}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
