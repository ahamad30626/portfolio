import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const CATEGORIES = [
  {
    label: 'Daily Use',
    desc: 'Things I reach for without thinking',
    icon: '⚡',
    skills: [
      { name: 'React.js',    color: '#61DAFB' },
      { name: 'TypeScript',  color: '#3178C6' },
      { name: 'Next.js',     color: '#ffffff' },
      { name: 'Tailwind CSS',color: '#06B6D4' },
      { name: 'JavaScript',  color: '#F7DF1E' },
      { name: 'Git & GitHub',color: '#F05032' },
    ],
  },
  {
    label: 'Comfortable With',
    desc: 'Solid working knowledge',
    icon: '🛠',
    skills: [
      { name: 'HTML5',             color: '#E34F26' },
      { name: 'CSS3',              color: '#1572B6' },
      { name: 'Redux Toolkit',     color: '#764ABC' },
      { name: 'Context API',       color: '#61DAFB' },
      { name: 'REST API Integration', color: '#10B981' },
      { name: 'Framer Motion',     color: '#ffffff' },
      { name: 'React Hook Form',   color: '#EC5990' },
      { name: 'Bootstrap',         color: '#7952B3' },
      { name: 'Figma',             color: '#F24E1E' },
      { name: 'Vite',              color: '#646CFF' },
    ],
  },
  {
    label: 'Currently Learning',
    desc: 'Actively working on these',
    icon: '📚',
    skills: [
      { name: 'DSA (LeetCode)',        color: '#FFA116' },
      { name: 'System Design',         color: '#6366f1' },
      { name: 'Next.js App Router',    color: '#ffffff' },
      { name: 'Web Accessibility (WCAG)', color: '#10B981' },
      { name: 'React Native (basics)', color: '#61DAFB' },
    ],
  },
  {
    label: 'Tools & Workflow',
    desc: 'Part of every working day',
    icon: '🔧',
    skills: [
      { name: 'VS Code',          color: '#007ACC' },
      { name: 'Chrome DevTools',  color: '#4285F4' },
      { name: 'Vercel',           color: '#ffffff' },
      { name: 'Lighthouse',       color: '#F59E0B' },
      { name: 'npm / pnpm',       color: '#CB3837' },
      { name: 'Postman',          color: '#FF6C37' },
    ],
  },
];

function SkillChip({ skill }) {
  return (
    <div
      className="group flex items-center gap-2 px-3 py-2 bg-[#131620] border border-white/[0.07] hover:border-white/[0.14] rounded-lg transition-all duration-150 cursor-default"
      title={skill.name}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
        style={{ background: skill.color }}
      />
      <span className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors">
        {skill.name}
      </span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 lg:py-28" aria-label="Skills section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          Tech stack
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          My Frontend Toolkit
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-12 max-w-xl">
          Organised honestly — not by fake percentage rings or stars, but by how
          confidently I'd use each technology on a real project today.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              {...fade(0.06 * i)}
              className="bg-[#0e1018] border border-white/[0.08] rounded-2xl p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xl">{cat.icon}</span>
                <h3 className="text-sm font-semibold text-slate-200">{cat.label}</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4 ml-9">{cat.desc}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map(skill => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Honest note */}
        <motion.p {...fade(0.3)} className="mt-8 text-center text-xs text-slate-600">
          Note: "comfortable with" means I can build with it confidently.
          "Currently learning" means I can read the code but wouldn't yet call myself fluent.
        </motion.p>

      </div>
    </section>
  );
}
