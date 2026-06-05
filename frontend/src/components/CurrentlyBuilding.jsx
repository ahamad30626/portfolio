import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const FEATURES = [
  'Real-time collaborative editing with cursor presence',
  'Room-based sessions — share a link, code together',
  'Syntax highlighting across 20+ languages (Monaco Editor)',
  'Auto-save and session history',
  'Chat panel alongside the editor',
  'Mobile-friendly read-only viewer',
];

const STACK = ['React', 'TypeScript', 'WebSockets', 'Monaco Editor', 'Node.js', 'Express'];

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="py-20 lg:py-28" aria-label="Currently building section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-amber-400 tracking-widest uppercase mb-3">
          In progress
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          Currently Building
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-10 max-w-xl">
          A project I'm actively developing alongside my studies. Not shipped yet —
          but the bones are solid and I'm learning a lot building it.
        </motion.p>

        <motion.div
          {...fade(0.12)}
          className="bg-[#0e1018] border border-white/[0.08] rounded-2xl overflow-hidden"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-[#0c0e17]">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-semibold text-slate-100">CodeSync</h3>
                <p className="text-xs text-slate-500">Real-Time Collaborative Code Editor</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-medium text-amber-400">In Development · ~40%</span>
            </div>
          </div>

          <div className="p-6 grid lg:grid-cols-2 gap-8">
            {/* Description */}
            <div className="space-y-4">
              <p className="text-slate-400 leading-relaxed text-sm">
                Google Docs for code. I started this because every time I want to debug
                with a friend we end up screensharing and losing 10 minutes. CodeSync lets you
                open a room, share the link, and both edit the same file in real time — with
                live cursors, syntax highlighting, and a chat panel.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                The hardest part has been handling operational transforms — making sure two
                people typing simultaneously don't corrupt each other's code. Currently exploring
                CRDTs as an alternative approach.
              </p>

              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">Overall progress</span>
                  <span className="text-xs font-mono text-amber-400">40%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className="progress-fill" style={{ width: '40%' }} />
                </div>
              </div>

              {/* What's left */}
              <div className="space-y-2">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Next up</p>
                {[
                  { done: true,  t: 'WebSocket connection layer' },
                  { done: true,  t: 'Monaco Editor integration' },
                  { done: true,  t: 'Room creation & joining' },
                  { done: false, t: 'Conflict resolution (CRDT)' },
                  { done: false, t: 'Persistent session history' },
                  { done: false, t: 'Deployment & auth' },
                ].map(item => (
                  <div key={item.t} className="flex items-center gap-2.5 text-sm">
                    <span className={item.done ? 'text-emerald-400' : 'text-slate-600'}>
                      {item.done ? '✓' : '○'}
                    </span>
                    <span className={item.done ? 'text-slate-400 line-through' : 'text-slate-300'}>
                      {item.t}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features + Stack */}
            <div className="space-y-6">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Planned features</p>
                <ul className="space-y-2">
                  {FEATURES.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span className="text-indigo-400 mt-0.5 flex-shrink-0">→</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-3">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {STACK.map(t => (
                    <span key={t} className="px-2.5 py-1 bg-slate-800/60 border border-white/[0.06] text-slate-300 text-xs rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="https://github.com/ahamad30626"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors group"
                aria-label="View CodeSync on GitHub"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Track progress on GitHub
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
