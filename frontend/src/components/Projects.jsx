const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'SECURESYNC AI',
    category: 'Dashboard / PWA',
    imageUrl: '/project1.png',
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
  },
  {
    id: 2,
    num: '02',
    title: 'CODESYNC',
    category: 'Collaboration Tool',
    imageUrl: '/project2.png',
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
  },
  {
    id: 3,
    num: '03',
    title: 'BLOOD BANKING',
    category: 'Healthcare Platform',
    imageUrl: '/project4.png',
    demoUrl: 'https://github.com/ahamad30626',
    githubUrl: 'https://github.com/ahamad30626',
  },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" aria-label="Selected Projects">
      <div className="container">

        <div className="projects-top reveal">
          <h2 className="projects-heading">SELECTED PROJECTS</h2>
          <a
            href="https://github.com/ahamad30626"
            target="_blank"
            rel="noopener noreferrer"
            className="projects-view-all"
            aria-label="View all projects on GitHub"
          >
            VIEW ALL PROJECTS
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <article
              key={p.id}
              className={`project-card reveal delay-${i + 1}`}
              aria-label={`Project ${p.num}: ${p.title}`}
            >
              <div className="project-img-wrapper">
                <img src={p.imageUrl} alt={`${p.title} screenshot`} loading="lazy" />
                <div className="project-img-overlay" aria-hidden="true" />
              </div>
              <div className="project-card-body">
                <div className="project-num">{p.num}</div>
                <div className="project-card-bottom">
                  <div className="project-title-wrap">
                    <div className="project-card-title">{p.title}</div>
                    <div className="project-category">{p.category}</div>
                  </div>
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-arrow"
                    aria-label={`View ${p.title} on GitHub`}
                  >
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
