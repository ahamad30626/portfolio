import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';

const STATIC_PROJECTS = [
  {
    id: 1,
    title: 'NeuralChat AI',
    tagline: 'Real-time AI chat with token-by-token GPT-4 streaming',
    description: 'Most AI chat UIs buffer the full response before showing anything. I wanted the opposite — instant token streaming that feels like the AI is thinking in front of you. Built with React + Node.js + Server-Sent Events.',
    result: 'Reduced perceived response latency by ~60% vs buffered responses',
    imageUrl: '/project1.png',
    tags: ['React', 'OpenAI API', 'Node.js', 'WebSockets', 'Dark Mode UI'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: true,
  },
  {
    id: 2,
    title: 'ShopVerse E-Commerce',
    tagline: 'Full-stack e-commerce that handles real edge cases',
    description: 'Built beyond the typical tutorial — handles concurrent cart updates, optimistic UI, Stripe webhook idempotency, and an admin dashboard for inventory management.',
    result: 'Complete checkout flow with Stripe, order tracking, and inventory control',
    imageUrl: '/project2.png',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
  },
  {
    id: 3,
    title: 'ConnectSphere Social',
    tagline: 'Real-time social platform built to understand WebSockets deeply',
    description: "I built this to stress-test my WebSocket knowledge — not just use Socket.io and move on. Includes live messaging, post feeds, story features, and OAuth authentication.",
    result: 'Live messaging with <100ms latency, full auth flow, Redis pub/sub',
    imageUrl: '/project3.png',
    tags: ['React', 'Socket.io', 'MongoDB', 'Redis', 'OAuth'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
  },
  {
    id: 4,
    title: 'DevFlow CLI Tool',
    tagline: 'A CLI that scaffolds projects and automates git workflows',
    description: 'Born from frustration with repetitive project setup. DevFlow scaffolds your stack, sets up git hooks, and integrates with the GitHub API to create repos and manage branches from the terminal.',
    result: 'Saves ~15 mins of setup per new project',
    imageUrl: '',
    tags: ['Node.js', 'TypeScript', 'GitHub API', 'npm'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
  },
];

function ProjectCard({ project, delay }) {
  return (
    <article className={`project-card reveal delay-${delay}`} aria-label={`Project: ${project.title}`}>
      <div className="project-img-wrapper">
        {project.imageUrl ? (
          <>
            <img src={project.imageUrl} alt={`${project.title} screenshot`} loading="lazy" />
            <div className="project-img-overlay" aria-hidden="true" />
          </>
        ) : (
          <div className="project-emoji-wrapper" aria-hidden="true"><span>⚡</span></div>
        )}
        {/* Featured badge only on first project */}
        {project.id === 1 && (
          <span className="project-featured-badge" aria-label="Featured project">⭐ Featured</span>
        )}
      </div>
      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline">{project.tagline}</p>
        <p className="project-desc">{project.description}</p>

        {/* Result / impact */}
        <div className="project-result" aria-label="Project result">
          <span className="project-result-icon" aria-hidden="true">📈</span>
          <span>{project.result}</span>
        </div>

        <div className="project-tags" aria-label="Technologies used">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="project-links">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn demo"
            aria-label={`Live demo of ${project.title}`}
          >
            Live Demo ↗
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn github"
            aria-label={`GitHub repo for ${project.title}`}
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState(STATIC_PROJECTS);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => { /* use static fallback */ });
  }, []);

  return (
    <section id="projects" aria-label="Projects section">
      <div className="container">
        <div className="projects-header">
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Portfolio</span>
          <h2 className="section-title reveal delay-1">Things I've Shipped</h2>
          <p className="reveal delay-2" style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
            Real projects, real challenges, real things I learned. Not a collection of cloned tutorials.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i + 1} />
          ))}
        </div>

        {/* View more on GitHub CTA */}
        <div className="projects-more reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href="https://github.com/ahamad30626"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            aria-label="View more projects on GitHub"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
