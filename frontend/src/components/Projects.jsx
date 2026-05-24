import { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';

const STATIC_PROJECTS = [
  {
    id: 1, title: 'NeuralChat AI',
    description: 'An AI-powered chat application integrating OpenAI GPT-4, featuring real-time streaming responses, conversation history, and a sleek dark-mode UI built with React.',
    imageUrl: '/project1.png', tags: ['React', 'OpenAI API', 'Node.js', 'WebSockets'],
    demoUrl: '#', githubUrl: '#', featured: true,
  },
  {
    id: 2, title: 'ShopVerse E-Commerce',
    description: 'Full-stack e-commerce platform with cart management, Stripe payments, and an admin dashboard for inventory control.',
    imageUrl: '/project2.png', tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Prisma'],
    demoUrl: '#', githubUrl: '#', featured: true,
  },
  {
    id: 3, title: 'ConnectSphere Social',
    description: 'A real-time social media app with live messaging, post feeds, story features, and full authentication via OAuth.',
    imageUrl: '/project3.png', tags: ['React', 'Socket.io', 'MongoDB', 'Redis'],
    demoUrl: '#', githubUrl: '#', featured: true,
  },
  {
    id: 4, title: 'DevFlow CLI Tool',
    description: "A developer productivity CLI that scaffolds projects, manages git workflows, and integrates with GitHub API for streamlined development.",
    imageUrl: '', tags: ['Node.js', 'TypeScript', 'GitHub API', 'npm'],
    demoUrl: '#', githubUrl: '#', featured: false,
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
      </div>
      <div className="project-card-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags" aria-label="Technologies">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="project-links">
          <a href={project.demoUrl} className="project-link-btn demo" aria-label={`Live demo of ${project.title}`}>
            Live Demo
          </a>
          <a href={project.githubUrl} className="project-link-btn github" aria-label={`GitHub for ${project.title}`} target="_blank" rel="noopener noreferrer">
            GitHub
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
          <h2 className="section-title reveal delay-1">Featured Projects</h2>
          <p className="reveal delay-2" style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', fontSize: '0.95rem' }}>
            A selection of projects that showcase my technical breadth and design sensibility.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} delay={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
