import { useEffect, useRef, useState } from 'react';

// Detect touch device outside component to avoid setState-in-effect lint error
const IS_TOUCH = !window.matchMedia('(pointer: fine)').matches;

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Skip cursor setup on touch/mobile devices
    if (IS_TOUCH) return;

    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      setVisible(true);
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top = ring.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, .project-card, .chip, .social-link, .project-link-btn, .nav-link, .nav-cta, .hamburger';

    const onEnter = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        dot.classList.add('hovering');
        ringEl.classList.add('hovering');
      }
    };

    const onLeave = (e) => {
      if (e.target.closest(INTERACTIVE)) {
        dot.classList.remove('hovering');
        ringEl.classList.remove('hovering');
      }
    };

    const onMouseLeaveWindow = () => {
      dot.style.opacity = '0';
      ringEl.style.opacity = '0';
    };

    const onMouseEnterWindow = () => {
      dot.style.opacity = '1';
      ringEl.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    document.documentElement.addEventListener('mouseleave', onMouseLeaveWindow);
    document.documentElement.addEventListener('mouseenter', onMouseEnterWindow);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      document.documentElement.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.documentElement.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render cursor elements on touch/mobile
  if (IS_TOUCH) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot${visible ? ' cursor-visible' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`cursor-ring${visible ? ' cursor-visible' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
