import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const ACHIEVEMENTS = [
  {
    icon: '🎓',
    category: 'Education',
    title: 'B.Tech Computer Science Engineering',
    subtitle: 'CSE Honours — 2023 Batch',
    body: 'Studying core CS fundamentals: Data Structures & Algorithms, Operating Systems, Database Management, Computer Networks. Building practical projects alongside coursework.',
    tags: [],
  },
  {
    icon: '🚀',
    category: 'Hackathon',
    title: 'SecureSync AI — Income Insurance Platform',
    subtitle: 'Built under time constraints',
    body: 'Designed and shipped a complete React dashboard in a hackathon sprint. Integrated real-time weather data, AQI monitoring, and risk visualisation. First time I had to make real architectural decisions under pressure.',
    tags: ['React', 'Next.js', 'TypeScript', 'Chart.js'],
  },
  {
    icon: '💻',
    category: 'DSA Practice',
    title: 'LeetCode & Problem Solving',
    subtitle: 'Consistent practice across topics',
    body: 'Practising data structures (arrays, trees, graphs, heaps) and algorithms (BFS, DFS, dynamic programming, sliding window) on LeetCode. Focus on understanding time/space complexity rather than memorising solutions.',
    tags: ['Arrays', 'Trees', 'Dynamic Programming', 'Binary Search'],
  },
  {
    icon: '🏗️',
    category: 'Projects',
    title: '5+ Frontend Projects Shipped',
    subtitle: 'Each one a learning milestone',
    body: 'From a blood banking system to a real-time social platform UI — each project taught me something specific about React architecture, state management, accessibility, or API integration. Not side projects that live in a drawer.',
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    icon: '📖',
    category: 'Self-Learning',
    title: 'System Design & Architecture',
    subtitle: 'Building mental models',
    body: 'Reading about distributed systems, caching strategies, database design, and API design patterns. Not because I\'ve used them all — but because I want to understand the decisions I\'ll be asked to make.',
    tags: ['Load Balancing', 'Caching', 'API Design', 'Database Design'],
  },
  {
    icon: '🌐',
    category: 'Open Source',
    title: 'Active GitHub Profile',
    subtitle: 'github.com/ahamad30626',
    body: 'Maintaining public repositories, documenting projects properly, and contributing to the GitHub ecosystem. Treating READMEs as a product — something another developer should be able to understand and run.',
    tags: [],
    link: 'https://github.com/ahamad30626',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 lg:py-28" aria-label="Achievements section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          Experience &amp; Achievements
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          What I've done
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-10 max-w-xl">
          No fake certifications or inflated statistics. Just honest milestones
          in my learning journey so far.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <motion.div
              key={a.title}
              {...fade(0.05 * i)}
              className="bg-[#0e1018] border border-white/[0.08] hover:border-white/[0.13] rounded-xl p-5 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">{a.icon}</span>
                <div>
                  <p className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-0.5">
                    {a.category}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-200 leading-snug">{a.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{a.subtitle}</p>
                </div>
              </div>

              <p className="text-sm text-slate-400 leading-relaxed mb-3">{a.body}</p>

              {a.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {a.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-800/60 border border-white/[0.05] text-slate-500 text-[10px] rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {a.link && (
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                  aria-label={`Visit ${a.link}`}
                >
                  {a.link.replace('https://', '')} →
                </a>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
