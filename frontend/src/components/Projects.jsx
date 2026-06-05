import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const PROJECTS = [
  {
    id: 1,
    title: 'SecureSync AI',
    subtitle: 'AI-powered income insurance dashboard for delivery partners',
    image: '/project1.png',
    featured: true,
    status: 'Hackathon Project',
    description:
      'Designed and built a responsive dashboard that visualises real-time weather alerts, AQI data, and payout status for Swiggy/Zomato delivery partners. The concept: when a worker\u2019s route becomes unsafe due to weather or civil unrest, payouts trigger automatically \u2014 no claims filed. My contribution was the entire frontend: live data panels, animated risk gauges, and a mobile-first PWA layout.',
    challenge:
      'Representing live, multi-signal data (weather + AQI + disruption alerts) on a single screen without overwhelming the user. Solved with a priority-based alert system and collapsed card states.',
    features: [
      'Mobile-first PWA with offline-ready shell',
      'Live weather & AQI monitoring panels',
      'Animated risk gauge components (Chart.js)',
      'Auto-payout notification toasts',
      'Role-based dashboard views (partner / admin)',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'Chart.js', 'PWA'],
    github: 'https://github.com/ahamad30626',
    demo: 'https://github.com/ahamad30626',
    accent: 'indigo',
  },
  {
    id: 2,
    title: 'Blood Banking System',
    subtitle: 'Healthcare management UI with real-time inventory tracking',
    image: '/project4.png',
    featured: false,
    status: 'Course Project',
    description:
      'Built the complete frontend for a blood banking platform handling three user roles: donors, hospitals, and admins. Each role gets a custom dashboard view. The admin panel shows blood type inventory as animated gauges, hospitals submit requests through a multi-step form, and donors register and track their history.',
    challenge:
      'Managing three completely different UX flows (donor, hospital, admin) in one React app without it becoming a tangled mess. Used React Router v6 with nested layouts and role-based route guards.',
    features: [
      'Role-based dashboard (donor / hospital / admin)',
      'Animated blood stock gauges per blood type',
      'Multi-step request workflow with form validation',
      'Donor registration with real-time eligibility check UI',
      'Fully responsive admin panel',
    ],
    tags: ['React', 'Tailwind CSS', 'React Hook Form', 'Chart.js', 'REST API'],
    github: 'https://github.com/ahamad30626',
    demo: 'https://github.com/ahamad30626',
    accent: 'red',
    accentColor: '#ef4444',
  },
  {
    id: 3,
    title: 'ShopVerse',
    subtitle: 'E-commerce storefront with cart, filtering, and checkout flow',
    image: '/project2.png',
    featured: false,
    status: 'Personal Project',
    description:
      'A fully responsive e-commerce front-end — not another tutorial todo app. Product listing with category/price filters, a Redux-managed cart with optimistic updates, and an animated multi-step checkout. Focused on getting the details right: skeleton loaders, empty states, error boundaries, and Lighthouse performance above 95.',
    challenge:
      'Cart state that persists across refreshes, stays in sync with quantity updates, and handles out-of-stock edge cases gracefully — without the code becoming a Redux nightmare.',
    features: [
      'Product grid with live filter + search',
      'Redux Toolkit cart with localStorage persistence',
      'Animated multi-step checkout (3 steps)',
      'Skeleton loading states for all async data',
      'Lighthouse score 95+ (performance & accessibility)',
    ],
    tags: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/ahamad30626',
    demo: 'https://github.com/ahamad30626',
    accent: 'indigo',
  },
  {
    id: 4,
    title: 'ConnectSphere',
    subtitle: 'Social platform UI with live feeds, stories, and messaging',
    image: '/project3.png',
    featured: false,
    status: 'Personal Project',
    description:
      'Implemented the complete frontend for a social platform — real-time message threads, animated post feed with infinite scroll, story carousel, and notification badge system. The goal was to understand WebSocket client integration deeply, not just use it as a black box.',
    challenge:
      'Keeping the feed performant with 100+ posts while messages update in real-time. Used React.memo, virtualised list rendering, and debounced re-renders to keep things smooth.',
    features: [
      'WebSocket-powered live messaging UI',
      'Infinite scroll feed with optimistic post creation',
      'Story carousel with auto-advance',
      'Notification badge system',
      'Accessible ARIA markup throughout',
    ],
    tags: ['React', 'TypeScript', 'Framer Motion', 'WebSocket Client', 'Context API'],
    github: 'https://github.com/ahamad30626',
    demo: 'https://github.com/ahamad30626',
    accent: 'indigo',
  },
];

const ACCENT = {
  indigo: { badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', border: 'hover:border-indigo-500/30' },
  red:    { badge: 'bg-red-500/10 text-red-400 border-red-500/20',           border: 'hover:border-red-500/30' },
};

function ProjectCard({ project, i }) {
  const [expanded, setExpanded] = useState(false);
  const ac = ACCENT[project.accent] || ACCENT.indigo;

  return (
    <motion.article
      {...fade(0.05 * i)}
      className={`bg-[#0e1018] border border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-200 ${ac.border}`}
      aria-label={`Project: ${project.title}`}
    >
      {/* Image */}
      {project.image && (
        <div className="relative h-48 overflow-hidden bg-[#0c0d14]">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1018] via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-indigo-600 text-white text-[11px] font-semibold rounded-md">
              ⭐ Featured
            </span>
          )}
          <span className={`absolute top-3 right-3 px-2.5 py-1 border text-[11px] font-medium rounded-md ${ac.badge}`}>
            {project.status}
          </span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-1">{project.title}</h3>
        <p className="text-sm text-slate-500 mb-3">{project.subtitle}</p>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{project.description}</p>

        {/* Challenge */}
        <div className="mb-4 p-3.5 bg-[#131620] border border-white/[0.05] rounded-lg">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1.5">Challenge I solved</p>
          <p className="text-xs text-slate-400 leading-relaxed">{project.challenge}</p>
        </div>

        {/* Features toggle */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium mb-3 flex items-center gap-1 transition-colors"
          aria-expanded={expanded}
        >
          {expanded ? '▲ Hide features' : '▼ Key features'}
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-1.5 mb-4"
            >
              {project.features.map(f => (
                <li key={f} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="text-indigo-400 mt-0.5 flex-shrink-0">→</span>{f}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(t => (
            <span key={t} className="px-2.5 py-1 bg-slate-800/60 border border-white/[0.05] text-slate-400 text-[11px] rounded-md">
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          <a
            href={project.demo}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
            aria-label={`Live demo of ${project.title}`}
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-2 border border-white/10 hover:border-white/20 text-slate-300 hover:text-slate-100 text-sm font-medium rounded-lg transition-colors"
            aria-label={`GitHub repo for ${project.title}`}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-28" aria-label="Projects section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          What I've built
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          Projects
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-10 max-w-xl">
          Real projects I've shipped. Each one taught me something specific — about React architecture,
          UX decisions, or just plain problem-solving.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} i={i} />)}
        </div>

        {/* View more on GitHub */}
        <motion.div {...fade(0.2)} className="mt-10 text-center">
          <a
            href="https://github.com/ahamad30626"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 border border-white/[0.08] hover:border-white/[0.14] px-5 py-2.5 rounded-lg transition-all"
            aria-label="View more projects on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            See more on GitHub →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
