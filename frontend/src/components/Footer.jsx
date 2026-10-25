export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} <strong>Salam Ahamad Shaik</strong>. All rights reserved.
          </p>
          <p className="footer-copy" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            DESIGNED &amp; BUILT BY SALAM AHAMAD SHAIK
          </p>
        </div>
      </div>
    </footer>
  );
}
