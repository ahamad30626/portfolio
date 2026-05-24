import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PROJECTS = [
  {
    id: 1,
    featured: true,
    title: 'NeuralChat AI',
    tagline: 'An AI chat interface that actually feels fast.',
    problem: 'I got frustrated with AI chat UIs that felt slow and clunky. Streaming responses felt janky. I wanted to build something that felt instant — where the AI response felt like it was thinking in front of you.',
    what: 'Built a full-stack chat app with OpenAI GPT-4 streaming, real-time token rendering, conversation threading, and a dark-mode UI that stays out of the way.',
    learned: 'Streaming HTTP responses in React is harder than it looks. I spent three days debugging SSE chunks that were merging incorrectly. Worth every minute.',
    challenge: 'Making token streaming feel smooth without layout shifts',
    tech: ['React', 'Node.js', 'OpenAI API', 'WebSockets', 'Tailwind CSS'],
    image: '/project1.png',
    github: 'https://github.com/ahamad30626',
    demo: '#',
    duration: '3 weeks',
  },
  {
    id: 2,
    featured: false,
    title: 'ShopVerse',
    tagline: 'E-commerce without the usual jank.',
    problem: 'Every e-commerce tutorial produces the same app. I built one that handles real edge cases — concurrent cart updates, optimistic UI, Stripe webhook failures.',
    what: 'Full-stack e-commerce with Next.js, Stripe payments, admin dashboard, and inventory management.',
    challenge: 'Handling Stripe webhook idempotency correctly',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    image: '/project2.png',
    github: 'https://github.com/ahamad30626',
    demo: '#',
    duration: '5 weeks',
  },
  {
    id: 3,
    featured: false,
    title: 'ConnectSphere',
    tagline: 'Real-time social — built from scratch.',
    problem: 'I wanted to understand WebSockets deeply, not just use Socket.io and move on. So I built a full social app to stress-test my understanding.',
    what: 'Social platform with real-time messaging, post feeds, and live notifications.',
    challenge: 'Scaling WebSocket connections without memory leaks',
    tech: ['React', 'Socket.io', 'MongoDB', 'Redis'],
    image: '/project3.png',
    github: 'https://github.com/ahamad30626',
    demo: '#',
    duration: '4 weeks',
  },
];

function FeaturedProject({ p }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
      className="group grid lg:grid-cols-2 gap-8 items-center border border-[#242428] rounded-2xl p-6 lg:p-8 hover:border-[#3a3a42] transition-colors bg-[#0d0d0f]"
      aria-label={`Featured project: ${p.title}`}
    >
      {/* Image */}
      <div className="relative rounded-xl overflow-hidden aspect-video bg-[#141416] border border-[#242428]">
        <img
          src={p.image}
          alt={`${p.title} screenshot`}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {p.tech.slice(0,3).map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-[#f0f0f2] border border-white/10">{t}</span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full border border-[#6366f1]/40 text-[10px] font-mono text-[#6366f1] bg-[#6366f1]/5">Featured</span>
          <span className="text-[#4a4a54] text-xs font-mono">{p.duration} to ship</span>
        </div>
        <h3 className="text-2xl font-bold mb-1">{p.title}</h3>
        <p className="text-[#8a8a94] text-sm mb-4 italic">"{p.tagline}"</p>

        <div className="space-y-3 text-sm text-[#8a8a94] leading-relaxed mb-5">
          <p><span className="text-[#f0f0f2] font-medium">The problem: </span>{p.problem}</p>
          <p><span className="text-[#f0f0f2] font-medium">What I built: </span>{p.what}</p>
          <p><span className="text-[#f0f0f2] font-medium">What I learned: </span>{p.learned}</p>
        </div>

        <div className="flex items-center gap-2 mb-5 p-3 rounded-lg bg-[#141416] border border-[#242428]">
          <span className="text-xs font-mono text-[#f59e0b]">⚡ Hardest part:</span>
          <span className="text-xs text-[#8a8a94]">{p.challenge}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {p.tech.map(t => (
            <span key={t} className="px-2.5 py-1 text-xs font-mono border border-[#242428] rounded-lg text-[#8a8a94] bg-[#141416]">{t}</span>
          ))}
        </div>

        <div className="flex gap-3">
          <a href={p.demo} className="hoverable flex-1 text-center px-4 py-2.5 bg-[#6366f1] text-white text-sm font-medium rounded-xl hover:bg-[#5254cc] transition-colors">
            Live Demo ↗
          </a>
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="hoverable flex-1 text-center px-4 py-2.5 border border-[#3a3a42] text-sm rounded-xl text-[#f0f0f2] hover:border-[#6366f1] transition-colors">
            GitHub ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ p, delay }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22,1,0.36,1] }}
      className="group border border-[#242428] rounded-2xl overflow-hidden hover:border-[#3a3a42] transition-colors bg-[#0d0d0f] flex flex-col"
      aria-label={`Project: ${p.title}`}
    >
      <div className="relative h-44 bg-[#141416] border-b border-[#242428] overflow-hidden">
        <img
          src={p.image}
          alt={`${p.title} screenshot`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className="absolute bottom-3 left-3 text-xs font-mono text-[#4a4a54] bg-black/60 px-2 py-0.5 rounded">{p.duration}</span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-1">{p.title}</h3>
        <p className="text-sm text-[#8a8a94] italic mb-3">"{p.tagline}"</p>
        <p className="text-sm text-[#8a8a94] leading-relaxed mb-4 flex-1">{p.problem.slice(0, 110)}…</p>

        <div className="flex items-center gap-2 text-xs mb-4 p-2.5 rounded-lg bg-[#141416] border border-[#242428]">
          <span className="text-[#f59e0b] font-mono">⚡</span>
          <span className="text-[#8a8a94]">{p.challenge}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {p.tech.map(t => (
            <span key={t} className="px-2 py-0.5 text-[10px] font-mono border border-[#242428] rounded text-[#8a8a94]">{t}</span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <a href={p.demo} className="hoverable flex-1 text-center py-2 bg-[#141416] border border-[#3a3a42] text-xs rounded-lg text-[#f0f0f2] hover:border-[#6366f1] transition-colors">Demo ↗</a>
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="hoverable flex-1 text-center py-2 bg-[#141416] border border-[#3a3a42] text-xs rounded-lg text-[#8a8a94] hover:border-[#6366f1] transition-colors">GitHub ↗</a>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const featured = PROJECTS.find(p => p.featured);
  const rest     = PROJECTS.filter(p => !p.featured);

  return (
    <section id="projects" className="section-pad" ref={ref} aria-label="Projects section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#6366f1] tracking-widest uppercase mb-4"
        >
          03 / work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-3"
        >
          Things I've shipped.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[#8a8a94] mb-12 max-w-lg leading-relaxed"
        >
          Real projects. Real challenges. Real things I learned.
          Not a collection of cloned tutorials.
        </motion.p>

        {/* Featured */}
        {featured && <div className="mb-8"><FeaturedProject p={featured} /></div>}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {rest.map((p, i) => <ProjectCard key={p.id} p={p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}
