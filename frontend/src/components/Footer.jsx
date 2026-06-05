export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-10 border-t border-white/[0.05]" role="contentinfo">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm text-slate-500">
          ahamad<span className="text-indigo-500">.</span>dev
        </span>
        <p className="text-sm text-slate-600">
          Designed &amp; built by Ahamad · {year}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ahamad30626"
            target="_blank" rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-400 transition-colors text-sm"
            aria-label="GitHub Profile"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/salam-ahamad-shaik-634686346/"
            target="_blank" rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-400 transition-colors text-sm"
            aria-label="LinkedIn Profile"
          >
            LinkedIn
          </a>
          <a
            href="mailto:2300030626cseh1@gmail.com"
            className="text-slate-600 hover:text-slate-400 transition-colors text-sm"
            aria-label="Send Email"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
