export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo" className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-brand">Ahamad.dev</p>
          <p className="footer-text">
            Designed &amp; Built by <strong>Salam Ahamad Shaik</strong> · {year}
          </p>
          <div className="footer-links" aria-label="Footer links">
            <a href="https://github.com/ahamad30626" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-link">GitHub</a>
            <span aria-hidden="true">·</span>
            <a href="https://www.linkedin.com/in/salam-ahamad-shaik-634686346/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-link">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href="mailto:2300030626cseh1@gmail.com" aria-label="Email" className="footer-link">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
