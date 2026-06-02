import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';

const STATIC_PROJECTS = [
  {
    id: 1,
    title: 'SecureSync AI',
    tagline: 'AI-powered income insurance dashboard for delivery partners',
    description: 'Designed and built a responsive React dashboard that visualises real-time weather alerts, AQI data, and payout status for delivery partners. Focused on intuitive data presentation, live status indicators, animated chart components, and a mobile-first PWA layout optimised for field workers.',
    result: 'Mobile-first PWA with live alert panels, animated risk gauges, and instant payout notification UI',
    imageUrl: '/project1.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React Query', 'Chart.js', 'PWA'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: true,
  },
  {
    id: 2,
    title: 'ShopVerse E-Commerce',
    tagline: 'Pixel-perfect e-commerce UI with smooth checkout experience',
    description: 'Built a fully responsive e-commerce front-end with product listing, filtering, cart state management via Redux, and an animated multi-step checkout flow. Integrated REST APIs for live product data, implemented optimistic UI updates, and tuned Lighthouse performance scores above 95.',
    result: 'Lighthouse performance score 95+, smooth animated checkout, fully responsive across all breakpoints',
    imageUrl: '/project2.png',
    tags: ['Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'REST API'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
  },
  {
    id: 3,
    title: 'ConnectSphere Social',
    tagline: 'Real-time social feed UI with live messaging and stories',
    description: 'Designed and implemented the complete UI for a social platform — real-time message threads, animated post feed with infinite scroll, story carousel, notification badge system, and a full OAuth login flow. Focused on smooth transitions, accessible markup, and efficient component re-rendering.',
    result: 'Sub-100ms UI updates with WebSocket integration, accessible ARIA markup, smooth 60fps animations',
    imageUrl: '/project3.png',
    tags: ['React', 'TypeScript', 'Framer Motion', 'WebSocket Client', 'Context API'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
  },
  {
    id: 4,
    title: 'DevFlow CLI Tool',
    tagline: 'Interactive CLI with rich terminal UI for project scaffolding',
    description: 'Built an interactive command-line tool with a rich terminal UI — animated spinners, colour-coded prompts, progress bars, and formatted output tables. Focused on intuitive UX within the terminal environment, consistent visual feedback, and a clean user interaction flow.',
    result: 'Saves ~15 mins of project setup with guided interactive prompts and visual progress feedback',
    imageUrl: '',
    tags: ['Node.js', 'TypeScript', 'Inquirer.js', 'Chalk', 'CLI UX'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
  },
  {
    id: 5,
    title: 'Blood Banking System',
    tagline: 'Healthcare management dashboard with real-time inventory UI',
    description: 'Built the complete front-end for a blood banking platform — role-based dashboard views for donors, hospitals, and admins. Features animated blood stock gauges per blood type, a request approval workflow UI, donor registration forms with validation, and a responsive admin panel for inventory management.',
    result: 'Role-based UI with animated blood inventory gauges, approval workflow, and fully responsive admin panel',
    imageUrl: '/project4.png',
    tags: ['React', 'Tailwind CSS', 'REST API Integration', 'React Hook Form', 'Chart.js'],
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
    featured: false,
    accentColor: '#ef4444',
  },
];



function ProjectCard({ project, delay }) {
  const accent = project.accentColor || null;

  return (
    <article
      className={`project-card reveal delay-${delay}`}
      aria-label={`Project: ${project.title}`}
      style={accent ? { '--card-accent': accent } : {}}
    >
      <div className="project-img-wrapper">
        {project.imageUrl ? (
          <>
            <img src={project.imageUrl} alt={`${project.title} screenshot`} loading="lazy" />
            <div className="project-img-overlay" aria-hidden="true" />
          </>
        ) : (
          <div className="project-emoji-wrapper" aria-hidden="true"><span>⚡</span></div>
        )}
        {/* Featured badge — first project only */}
        {project.id === 1 && (
          <span className="project-featured-badge" aria-label="Featured project">⭐ Featured</span>
        )}
        {/* Healthcare badge — blood banking project */}
        {project.accentColor && (
          <span className="project-domain-badge" style={{ background: `${project.accentColor}cc` }} aria-label="Healthcare project">
            🩸 Healthcare
          </span>
        )}
      </div>
      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-tagline" style={accent ? { color: accent } : {}}>{project.tagline}</p>
        <p className="project-desc">{project.description}</p>

        {/* Result / impact */}
        <div
          className="project-result"
          aria-label="Project result"
          style={accent ? { background: `${accent}10`, borderColor: `${accent}33`, color: '#fca5a5' } : {}}
        >
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
            style={accent ? { background: `linear-gradient(135deg, ${accent}, #b91c1c)` } : {}}
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
