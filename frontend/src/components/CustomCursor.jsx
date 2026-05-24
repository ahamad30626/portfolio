import { useEffect, useRef, useState } from 'react';

/* ── Palette ──────────────────────────────────── */
const DARK    = '#1a1e2e';
const DARK2   = '#252a3c';
const DARK3   = '#2f364a';
const WRAP_LT = '#d4e8f0';  // light handle wrap
const WRAP_DK = '#9ab8cc';  // dark handle wrap
const GOLD    = '#c8a83a';
const GOLD_HI = '#f0d060';
const STRING  = '#252a3c';

/* ─────────────────────────────────────────────────────────
   DEFAULT  — slingshot, ball at rest
   Hotspot at the ring/tip (top-left of SVG)
   ───────────────────────────────────────────────────────── */
function SlingshotDefault() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
         xmlns="http://www.w3.org/2000/svg">

      {/* ── Handle (drawn first, sits behind everything) ───── */}
      {/* Solid base */}
      <rect x="-3" y="-5" width="46" height="11" rx="5.5"
            fill={WRAP_LT}
            transform="rotate(42 38 50) translate(0 0)"
            style={{ transformOrigin: '38px 50px' }}
      />
      {/* Wrapping segments using individual rects */}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i}
              x={-3 + i * 5} y={-5}
              width="3.5" height="11"
              rx="1"
              fill={i % 2 === 0 ? WRAP_LT : WRAP_DK}
              transform="rotate(42 38 50)"
        />
      ))}
      {/* Handle outline */}
      <rect x="-3" y="-5" width="46" height="11" rx="5.5"
            stroke={DARK} strokeWidth="1.5" fill="none"
            transform="rotate(42 38 50)"
      />

      {/* ── 5 parallel strings ──────────────────────────────── */}
      {[-3.5, -1.75, 0, 1.75, 3.5].map((off, i) => (
        <line key={i}
              x1={18 + off * 0.7} y1={30}
              x2={30 + off * 0.5} y2={53}
              stroke={STRING} strokeWidth="1.15"
              opacity="0.85"
        />
      ))}

      {/* ── Fork stem (centre spine from ring to ball) ──────── */}
      <path d="M18 29 L30 54"
            stroke={DARK} strokeWidth="5"
            strokeLinecap="round" />

      {/* ── Left prong ─────────────────────────────────────── */}
      <path d="M13 29 Q6 22 9 13 Q11 5 18 5"
            stroke={DARK} strokeWidth="4.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Right prong ─────────────────────────────────────── */}
      <path d="M23 27 Q30 20 27 11 Q24 4 18 5"
            stroke={DARK} strokeWidth="4.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Circular ring / guide wheel ─────────────────────── */}
      {/* Outer ring */}
      <circle cx="18" cy="14" r="10" stroke={DARK} strokeWidth="3.5" fill="none"/>
      {/* Inner fill */}
      <circle cx="18" cy="14" r="6"  fill={DARK2}/>
      {/* Inner ring detail */}
      <circle cx="18" cy="14" r="3"  fill={DARK3}/>
      {/* Spoke lines */}
      <line x1="18" y1="7"  x2="18" y2="21" stroke={DARK2} strokeWidth="1.3"/>
      <line x1="11" y1="14" x2="25" y2="14" stroke={DARK2} strokeWidth="1.3"/>
      {/* Outer ring highlight */}
      <path d="M11 10 Q14 5 20 6" stroke={DARK3} strokeWidth="1.5" fill="none" opacity="0.5"/>

      {/* ── Golden ball ─────────────────────────────────────── */}
      <circle cx="30" cy="55" r="5.5" fill={GOLD}/>
      {/* Highlight */}
      <circle cx="28" cy="53" r="2.5" fill={GOLD_HI} opacity="0.6"/>
      {/* Outline */}
      <circle cx="30" cy="55" r="5.5" stroke={DARK} strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   HOVER  — ball pulled back, strings taut & angled
   ───────────────────────────────────────────────────────── */
function SlingshotHover() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none"
         xmlns="http://www.w3.org/2000/svg">

      {/* ── Handle ──────────────────────────────────────────── */}
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i}
              x={-3 + i * 5} y={-5}
              width="3.5" height="11"
              rx="1"
              fill={i % 2 === 0 ? WRAP_LT : WRAP_DK}
              transform="rotate(42 38 50)"
        />
      ))}
      <rect x="-3" y="-5" width="46" height="11" rx="5.5"
            stroke={DARK} strokeWidth="1.5" fill="none"
            transform="rotate(42 38 50)"
      />

      {/* ── Taut strings — pulled toward lower-right ────────── */}
      {[-3.5, -1.75, 0, 1.75, 3.5].map((off, i) => (
        <line key={i}
              x1={18 + off * 0.7} y1={30}
              x2={44 + off * 0.4} y2={62}
              stroke={STRING} strokeWidth="1.2"
              opacity="0.9"
        />
      ))}

      {/* ── Fork stem ────────────────────────────────────────── */}
      <path d="M18 29 L44 63"
            stroke={DARK} strokeWidth="5"
            strokeLinecap="round"/>

      {/* ── Left prong ──────────────────────────────────────── */}
      <path d="M13 29 Q6 22 9 13 Q11 5 18 5"
            stroke={DARK} strokeWidth="4.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Right prong ─────────────────────────────────────── */}
      <path d="M23 27 Q30 20 27 11 Q24 4 18 5"
            stroke={DARK} strokeWidth="4.5"
            strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Ring ─────────────────────────────────────────────── */}
      <circle cx="18" cy="14" r="10" stroke={DARK} strokeWidth="3.5" fill="none"/>
      <circle cx="18" cy="14" r="6"  fill={DARK2}/>
      <circle cx="18" cy="14" r="3"  fill={DARK3}/>
      <line x1="18" y1="7"  x2="18" y2="21" stroke={DARK2} strokeWidth="1.3"/>
      <line x1="11" y1="14" x2="25" y2="14" stroke={DARK2} strokeWidth="1.3"/>
      <path d="M11 10 Q14 5 20 6" stroke={DARK3} strokeWidth="1.5" fill="none" opacity="0.5"/>

      {/* ── Ball pulled back — glowing slightly ─────────────── */}
      {/* Glow aura */}
      <circle cx="46" cy="64" r="9" fill={GOLD} opacity="0.18"/>
      {/* Ball */}
      <circle cx="46" cy="64" r="5.5" fill={GOLD}/>
      {/* Highlight */}
      <circle cx="44" cy="62" r="2.5" fill={GOLD_HI} opacity="0.7"/>
      {/* Outline */}
      <circle cx="46" cy="64" r="5.5" stroke={DARK} strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────────────────── */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Touch / coarse-pointer devices → skip entirely
    if (!window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(true);
      return;
    }

    const el = cursorRef.current;

    const onMove = (e) => {
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const interactive = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, ' +
        '.btn, .chip, .skill-card-new, .project-card, .social-link, ' +
        '.project-link-btn, .nav-link, .nav-cta, .hamburger, ' +
        '.mobile-nav-link, .form-submit, .back-to-top'
      );
      setIsHover(!!interactive);
    };

    const onLeaveWin  = () => { el.style.opacity = '0'; };
    const onEnterWin  = () => { if (visible) el.style.opacity = '1'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeaveWin);
    document.documentElement.addEventListener('mouseenter', onEnterWin);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeaveWin);
      document.documentElement.removeEventListener('mouseenter', onEnterWin);
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:     'fixed',
        left:         '-200px',
        top:          '-200px',
        pointerEvents:'none',
        zIndex:       99999,
        opacity:      visible ? 1 : 0,
        /* The ring tip of the slingshot is ~(8, 4) in the SVG;
           shift so that point sits exactly at the mouse hotspot */
        transform:    'translate(-8px, -4px)',
        filter:       'drop-shadow(0 4px 10px rgba(0,0,0,0.45))',
        willChange:   'left, top',
        transition:   'opacity 0.25s ease',
      }}
    >
      {isHover ? <SlingshotHover /> : <SlingshotDefault />}
    </div>
  );
}
