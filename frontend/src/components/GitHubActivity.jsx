import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const GH = 'ahamad30626';

export default function GitHubActivity() {
  return (
    <section id="github" className="py-20 lg:py-28" aria-label="GitHub activity section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          GitHub
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          Coding Activity
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-10 max-w-xl">
          I try to push code every day — even if it's just a small fix or a note in the README.
          Consistency over intensity.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Stats card */}
          <motion.div {...fade(0.12)} className="bg-[#0e1018] border border-white/[0.08] rounded-2xl p-5 overflow-hidden">
            <p className="text-xs text-slate-500 font-medium mb-3">GitHub Stats</p>
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${GH}&show_icons=true&theme=transparent&hide_border=true&title_color=818cf8&icon_color=6366f1&text_color=94a3b8&bg_color=00000000&rank_icon=github`}
              alt="GitHub stats for ahamad30626"
              loading="lazy"
              className="w-full"
              style={{ minHeight: 140 }}
            />
          </motion.div>

          {/* Top languages */}
          <motion.div {...fade(0.14)} className="bg-[#0e1018] border border-white/[0.08] rounded-2xl p-5 overflow-hidden">
            <p className="text-xs text-slate-500 font-medium mb-3">Top Languages</p>
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GH}&layout=compact&theme=transparent&hide_border=true&title_color=818cf8&text_color=94a3b8&bg_color=00000000&langs_count=6`}
              alt="Top languages for ahamad30626"
              loading="lazy"
              className="w-full"
              style={{ minHeight: 140 }}
            />
          </motion.div>
        </div>

        {/* Streak */}
        <motion.div {...fade(0.16)} className="bg-[#0e1018] border border-white/[0.08] rounded-2xl p-5 overflow-hidden mb-6">
          <p className="text-xs text-slate-500 font-medium mb-3">Contribution Streak</p>
          <img
            src={`https://streak-stats.demolab.com?user=${GH}&theme=transparent&hide_border=true&stroke=1e2030&ring=6366f1&fire=f59e0b&currStreakLabel=94a3b8&sideLabels=94a3b8&currStreakNum=818cf8&sideNums=818cf8&dates=475569&background=00000000`}
            alt="GitHub contribution streak for ahamad30626"
            loading="lazy"
            className="w-full max-w-xl mx-auto block"
          />
        </motion.div>

        {/* GitHub CTA */}
        <motion.div {...fade(0.2)} className="text-center">
          <a
            href={`https://github.com/${GH}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-[#0e1018] border border-white/[0.09] hover:border-white/[0.16] text-slate-300 hover:text-slate-100 text-sm font-medium rounded-lg transition-all"
            aria-label="View GitHub profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View github.com/{GH} →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
