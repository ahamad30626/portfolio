import { useEffect, useRef } from 'react';

// The JS object that will type itself out — split into token spans
// Each entry: { text, cls } where cls is a CSS token class
const CODE_TOKENS = [
  { text: 'const',       cls: 'tok-keyword' },
  { text: ' ',           cls: 'tok-plain'   },
  { text: 'developer',   cls: 'tok-fn'      },
  { text: ' = {',        cls: 'tok-punct'   },
  { text: '\n  ',        cls: 'tok-plain'   },
  { text: 'name',        cls: 'tok-fn'      },
  { text: ': ',          cls: 'tok-punct'   },
  { text: '"Salam Ahamad Shaik"', cls: 'tok-string' },
  { text: ',',           cls: 'tok-punct'   },
  { text: '\n  ',        cls: 'tok-plain'   },
  { text: 'role',        cls: 'tok-fn'      },
  { text: ': ',          cls: 'tok-punct'   },
  { text: '"Frontend React Developer"', cls: 'tok-string' },
  { text: ',',           cls: 'tok-punct'   },
  { text: '\n  ',        cls: 'tok-plain'   },
  { text: 'stack',       cls: 'tok-fn'      },
  { text: ': ',          cls: 'tok-punct'   },
  { text: '["React"',    cls: 'tok-string'  },
  { text: ', ',          cls: 'tok-punct'   },
  { text: '"Next.js"',   cls: 'tok-string'  },
  { text: ', ',          cls: 'tok-punct'   },
  { text: '"TypeScript"', cls: 'tok-string' },
  { text: '],',          cls: 'tok-punct'   },
  { text: '\n  ',        cls: 'tok-plain'   },
  { text: 'status',      cls: 'tok-fn'      },
  { text: ': ',          cls: 'tok-punct'   },
  { text: '"open to internships"', cls: 'tok-string' },
  { text: ',',           cls: 'tok-punct'   },
  { text: '\n',          cls: 'tok-plain'   },
  { text: '};',          cls: 'tok-punct'   },
];

// Flatten tokens into a list of {char, cls} for character-level typing
function buildCharList(tokens) {
  const chars = [];
  for (const tok of tokens) {
    for (const ch of tok.text) {
      chars.push({ char: ch, cls: tok.cls });
    }
  }
  return chars;
}

const CHARS = buildCharList(CODE_TOKENS);
const LINE_COUNT = 8; // number of gutter lines to show

export default function Hero() {
  const editorRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = editorRef.current;
    const cursor = cursorRef.current;
    if (!el || !cursor) return;

    // Respect reduced motion — render fully typed immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      renderFull(el);
      return;
    }

    let i = 0;
    let spans = []; // track open spans per class
    let currentSpan = null;
    let currentCls = null;

    // Speed: total ~1800ms for ~120 chars → ~15ms/char average
    const SPEED = 14;

    const tick = () => {
      if (i >= CHARS.length) {
        // Done — stop cursor blink after 3s
        setTimeout(() => {
          if (cursor) cursor.style.animation = 'none';
        }, 3000);
        return;
      }

      const { char, cls } = CHARS[i];

      if (char === '\n') {
        // End current span, add a <br>
        currentSpan = null;
        currentCls = null;
        el.appendChild(document.createElement('br'));
      } else {
        // Same class → append to current span; else new span
        if (cls !== currentCls || !currentSpan) {
          currentSpan = document.createElement('span');
          currentSpan.className = cls;
          spans.push(currentSpan);
          el.appendChild(currentSpan);
          currentCls = cls;
        }
        currentSpan.textContent += char;
      }

      i++;
      setTimeout(tick, SPEED);
    };

    setTimeout(tick, 600);

    return () => { i = CHARS.length; }; // cleanup
  }, []);

  return (
    <section id="hero" aria-label="Hero section">
      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="hero-content">
        <div className="container">
          <div className="hero-layout">

            {/* ── LEFT: Name + tagline + CTAs ── */}
            <div className="hero-left">
              <p className="hero-eyebrow">// frontend developer</p>

              <h1 className="hero-name" aria-label="Salam Ahamad Shaik">
                <span className="hero-name-line">Salam Ahamad</span>
                <span className="hero-name-line">Shaik</span>
              </h1>

              <p className="hero-tagline">
                Building <strong>pixel-perfect</strong>, high-performance interfaces
                with <strong>React.js</strong> &amp; <strong>Next.js</strong>.
                Focused on clean architecture, accessibility, and UI that users remember.
              </p>

              <div className="hero-meta">
                <span>📍 Andhra Pradesh, India</span>
                <span className="hero-meta-dot">·</span>
                <span>🎓 B.Tech CSE — 2026</span>
              </div>

              <div className="hero-buttons">
                <a
                  href="#projects"
                  className="btn btn-primary"
                  id="hero-cta-work"
                  onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                  aria-label="View my projects"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  view-work()
                </a>
                <a
                  href="https://drive.google.com/file/d/1GuprfBP4TYeouOslvQg7SXZb9DwLSHcw/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  id="hero-cta-resume"
                  aria-label="View resume PDF"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  resume.pdf
                </a>
                <a
                  href="#contact"
                  className="btn btn-ghost"
                  id="hero-cta-contact"
                  onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                  aria-label="Contact me"
                >
                  say-hello()
                </a>
              </div>

              <div className="hero-tech-strip" aria-label="Core stack">
                {['React', 'Next.js', 'TypeScript', 'Tailwind', 'JavaScript', 'Git'].map(t => (
                  <span key={t} className="hero-tech-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Mock code editor ── */}
            <div className="hero-editor" role="img" aria-label="Code snippet showing developer info">
              {/* Tab bar */}
              <div className="editor-titlebar">
                <div className="editor-traffic" aria-hidden="true">
                  <span /><span /><span />
                </div>
                <div className="editor-tab">about-me.js</div>
              </div>

              {/* Code body */}
              <div className="editor-body">
                {/* Line numbers */}
                <div className="editor-lines" aria-hidden="true">
                  {Array.from({ length: LINE_COUNT }, (_, i) => (
                    <span key={i}>{i + 1}</span>
                  ))}
                </div>

                {/* Typed code output */}
                <code className="editor-code" ref={editorRef} aria-label="Code output" />
                <span className="editor-cursor" ref={cursorRef} aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <div className="scroll-mouse" />
        <span>scroll</span>
      </div>
    </section>
  );
}

// Helper: render the full code immediately (no animation)
function renderFull(el) {
  // Build complete HTML string
  let html = '';
  for (const tok of CODE_TOKENS) {
    const escaped = tok.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, `</span><br><span class="${tok.cls}">`);
    html += `<span class="${tok.cls}">${escaped}</span>`;
  }
  el.innerHTML = html;
}
