import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const ring    = useRef({ x: -100, y: -100 });
  const pos     = useRef({ x: -100, y: -100 });
  const raf     = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) { setIsTouch(true); return; }

    const dot = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
      if (!visible) setVisible(true);
    };

    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;
      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top  = ring.current.y + 'px';
      raf.current = requestAnimationFrame(loop);
    };

    const onOver = e => {
      const el = e.target.closest('a,button,[role="button"],input,textarea,.hoverable');
      dot.classList.toggle('active',  !!el);
      ringEl.classList.toggle('active', !!el);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', () => { dot.style.opacity='0'; ringEl.style.opacity='0'; });
    document.documentElement.addEventListener('mouseenter', () => { dot.style.opacity='1'; ringEl.style.opacity='1'; });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  style={{ opacity: visible ? 1 : 0 }} aria-hidden />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: visible ? 1 : 0 }} aria-hidden />
    </>
  );
}
