export default function Footer() {
  return (
    <footer className="border-t border-[#242428] py-10" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-[#4a4a54]">
          Made with curiosity — <span className="text-[#6366f1]">Ahamad</span> © 2026
        </p>
        <div className="flex gap-6 text-xs font-mono text-[#4a4a54]">
          {['React', 'Tailwind CSS', 'Framer Motion', 'Vite'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hoverable text-xs font-mono text-[#4a4a54] hover:text-[#f0f0f2] transition-colors"
          aria-label="Back to top"
        >
          back to top ↑
        </button>
      </div>
    </footer>
  );
}
