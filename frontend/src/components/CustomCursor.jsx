import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── Color palette ────────────────────────────────────── */
const C = {
  purple: '#9B5ED6',
  purpleDark: '#7B3DB8',
  pink: '#F0539A',
  pinkBright: '#FF3D8F',
  orange: '#F5A020',
  orangeLight: '#FFC046',
};

/* ─── Normal arrow cursor SVG ──────────────────────────── *
 * Hotspot is the very top-left of this SVG (the arrow tip) */
function ArrowSVG() {
  return (
    <svg
      width="62"
      height="78"
      viewBox="0 0 62 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Purple main arrow body (large diagonal pill) ── */}
      <ellipse
        cx="16" cy="30"
        rx="13.5" ry="32"
        fill={C.purple}
        transform="rotate(-28 16 30)"
      />
      {/* ── Darker purple highlight on top edge ── */}
      <ellipse
        cx="14" cy="26"
        rx="7" ry="18"
        fill={C.purpleDark}
        opacity="0.35"
        transform="rotate(-28 14 26)"
      />
      {/* ── Pink overlay pill (narrower, shifted right) ── */}
      <ellipse
        cx="24" cy="32"
        rx="10.5" ry="27"
        fill={C.pink}
        transform="rotate(-28 24 32)"
      />
      {/* ── Orange bottom blob (the "heel") ── */}
      <ellipse
        cx="8" cy="54"
        rx="10" ry="7.5"
        fill={C.orange}
        transform="rotate(-15 8 54)"
      />

      {/* ── Dripping dots ── */}
      {/* Big purple dot */}
      <circle cx="40" cy="54" r="5.5" fill={C.purple} />
      {/* Big pink dot */}
      <circle cx="50" cy="61" r="4.5" fill={C.pink} />
      {/* Orange dot */}
      <circle cx="46" cy="69" r="3.5" fill={C.orange} />
      {/* Small orange */}
      <circle cx="56" cy="53" r="2.5" fill={C.orange} />
      {/* Small purple */}
      <circle cx="55" cy="68" r="2" fill={C.purple} />
      {/* Tiny pink */}
      <circle cx="38" cy="67" r="2" fill={C.pink} />
      {/* Tiny orange */}
      <circle cx="60" cy="62" r="1.5" fill={C.orangeLight} />
    </svg>
  );
}

/* ─── Hover finger cursor SVG ──────────────────────────── *
 * Hotspot is the finger tip, offset via parent transform   */
function FingerSVG() {
  return (
    <svg
      width="70"
      height="82"
      viewBox="0 0 70 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Purple palm / hand base (large blob) ── */}
      <ellipse
        cx="24" cy="48"
        rx="17" ry="22"
        fill={C.purple}
        transform="rotate(-8 24 48)"
      />
      {/* ── Purple highlight ── */}
      <ellipse
        cx="18" cy="44"
        rx="9" ry="13"
        fill={C.purpleDark}
        opacity="0.3"
        transform="rotate(-8 18 44)"
      />
      {/* ── Pink pointing finger (tall vertical pill) ── */}
      <ellipse
        cx="33" cy="22"
        rx="11" ry="26"
        fill={C.pink}
        transform="rotate(10 33 22)"
      />
      {/* ── Pink highlight on finger ── */}
      <ellipse
        cx="30" cy="16"
        rx="5.5" ry="14"
        fill={C.pinkBright}
        opacity="0.4"
        transform="rotate(10 30 16)"
      />
      {/* ── Orange accent blob at bottom ── */}
      <ellipse
        cx="12" cy="60"
        rx="11" ry="8"
        fill={C.orange}
        transform="rotate(-5 12 60)"
      />

      {/* ── Scattered dots (more spread out for hover) ── */}
      <circle cx="50" cy="58" r="5.5" fill={C.purple} />
      <circle cx="59" cy="65" r="4.5" fill={C.pink} />
      <circle cx="55" cy="73" r="3.5" fill={C.orange} />
      <circle cx="64" cy="56" r="2.5" fill={C.orange} />
      <circle cx="62" cy="70" r="2" fill={C.pink} />
      <circle cx="46" cy="71" r="2" fill={C.purple} />
      <circle cx="66" cy="63" r="1.5" fill={C.orangeLight} />
    </svg>
  );
}

/* ─── Main component ───────────────────────────────────── */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Only show on mouse (fine pointer) devices
    if (!window.matchMedia('(pointer: fine)').matches) {
      setIsTouch(true);
      return;
    }

    const el = cursorRef.current;

    const onMove = (e) => {
      // Position the cursor element
      el.style.left = e.clientX + 'px';
      el.style.top = e.clientY + 'px';
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      const interactive = e.target.closest(
        'a, button, [role="button"], input, textarea, select, label, ' +
        '.btn, .chip, .skill-card-new, .project-card, .social-link, ' +
        '.project-link-btn, .nav-link, .nav-cta, .hamburger, .mobile-nav-link, ' +
        '.form-submit, .back-to-top'
      );
      setIsHover(!!interactive);
    };

    const onLeave = () => { el.style.opacity = '0'; };
    const onEnter = () => { el.style.opacity = '1'; };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [visible]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        /* Start off-screen until first mousemove */
        left: '-200px',
        top: '-200px',
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
        /* Shift so the arrow TIP (top-left) or FINGER TIP is at mouse */
        transform: isHover ? 'translate(-28px, -4px)' : 'translate(-2px, -2px)',
        filter: 'drop-shadow(0px 6px 16px rgba(0,0,0,0.30))',
        willChange: 'left, top',
        /* Smooth between cursor states */
        transition: 'opacity 0.25s ease, transform 0.2s ease',
      }}
    >
      {isHover ? <FingerSVG /> : <ArrowSVG />}
    </div>
  );
}
