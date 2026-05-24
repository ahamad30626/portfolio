import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch/mobile device — skip cursor entirely
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) {
      setIsTouch(true);
      return;
    }

    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onFirstMove = () => setVisible(true);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      if (!visible) setVisible(true);
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top = ring.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, select, .skill-card-new, .project-card, .chip, .social-link, .project-link-btn, .nav-link, .nav-cta, .hamburger')) {
        dot.classList.add('hovering');
        ringEl.classList.add('hovering');
      }
    };

    const onLeave = (e) => {
      const t = e.target;
      if (t.closest('a, button, [role="button"], input, textarea, select, .skill-card-new, .project-card, .chip, .social-link, .project-link-btn, .nav-link, .nav-cta, .hamburger')) {
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
    window.addEventListener('mousemove', onFirstMove, { once: true });
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

  // Don't render on touch/mobile
  if (isTouch) return null;

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
