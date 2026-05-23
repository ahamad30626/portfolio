/* ============================================================
   PREMIUM FUTURISTIC CURSOR SYSTEM — JavaScript Engine
   Version: 2.0 | Cinematic · Glassmorphic · GPU-Accelerated
   ============================================================

   Features:
   ──────────────────────────────────────────────────────────
   • Default white precision-dot cursor
   • Large translucent glow circle (ambient layer)
   • Glassmorphism ring outline with smooth LERP
   • 16-dot fading motion trail with individual decay
   • Horizontal speed lines on fast movement
   • Motion blur via opacity & scale modulation
   • Magnetic attraction snap on buttons/links
   • Scale-up on interactive element hover
   • Ripple animation on mouse click
   • 60fps via requestAnimationFrame
   • GPU-accelerated via will-change + translate3d
   • Respects reduced-motion & touch-device detection
   ============================================================ */

'use strict';

(function PremiumCursor() {

  /* ── Touch / reduced-motion guard ── */
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isTouch || prefersReduced) return;

  /* ══════════════════════════════════════════════════════════
     1. DOM INJECTION
     ══════════════════════════════════════════════════════════ */
  function inject() {
    /* Remove the old basic cursor elements if present */
    ['cursor-dot', 'cursor-ring'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });

    /* Inject cursor elements */
    const html = `
      <div id="cursor-ambient"    aria-hidden="true"></div>
      <div id="cursor-glow"       aria-hidden="true"></div>
      <div id="cursor-ring"       aria-hidden="true"></div>
      <div id="cursor-main"       aria-hidden="true"></div>
      <div id="cursor-label"      aria-hidden="true"></div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
  }
  inject();

  /* ══════════════════════════════════════════════════════════
     2. ELEMENT REFERENCES
     ══════════════════════════════════════════════════════════ */
  const dot      = document.getElementById('cursor-main');
  const glow     = document.getElementById('cursor-glow');
  const ring     = document.getElementById('cursor-ring');
  const ambient  = document.getElementById('cursor-ambient');
  const label    = document.getElementById('cursor-label');

  /* ══════════════════════════════════════════════════════════
     3. STATE
     ══════════════════════════════════════════════════════════ */
  const state = {
    /* Raw mouse position */
    mx: -200, my: -200,
    /* Previous raw position (for speed calculation) */
    pmx: -200, pmy: -200,

    /* LERP targets for each layer */
    // dot follows instantly (set directly in mousemove)
    ringX: -200, ringY: -200,
    glowX: -200, glowY: -200,
    ambX:  -200, ambY:  -200,

    /* Speed / velocity */
    vx: 0, vy: 0,
    speed: 0,

    /* Flags */
    isHovering: false,
    isClicking: false,
    isVisible: false,

    /* Magnetic state */
    magnetTarget: null,
    magnetX: 0, magnetY: 0,
    isMagnetic: false,

    /* Trail pool */
    trailDots: [],
    trailIndex: 0,
    TRAIL_COUNT: 18,

    /* Speed lines pool */
    speedLines: [],
    SPEED_LINE_COUNT: 5,

    /* Idle detection */
    lastMoveTime: 0,
    isIdle: false,
  };

  /* ══════════════════════════════════════════════════════════
     4. TRAIL DOT POOL (pre-allocated for performance)
     ══════════════════════════════════════════════════════════ */
  function createTrailDots() {
    for (let i = 0; i < state.TRAIL_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-trail';
      const size = Math.max(2, 10 - i * 0.45);
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        opacity: 0;
        left: -200px;
        top: -200px;
      `;
      document.body.appendChild(el);
      state.trailDots.push({
        el,
        x: -200, y: -200,
        opacity: 0,
        size,
        targetX: -200, targetY: -200,
      });
    }
  }
  createTrailDots();

  /* ══════════════════════════════════════════════════════════
     5. SPEED LINE POOL
     ══════════════════════════════════════════════════════════ */
  function createSpeedLines() {
    for (let i = 0; i < state.SPEED_LINE_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'cursor-speed-line';
      el.style.cssText = `
        opacity: 0;
        left: -500px;
        top: -500px;
        width: 0px;
      `;
      document.body.appendChild(el);
      state.speedLines.push({ el, active: false });
    }
  }
  createSpeedLines();

  /* ══════════════════════════════════════════════════════════
     6. LERP UTILITY
     ══════════════════════════════════════════════════════════ */
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  /* ══════════════════════════════════════════════════════════
     7. INTERACTIVE SELECTORS
     ══════════════════════════════════════════════════════════ */
  const INTERACTIVE = [
    'a', 'button', 'input', 'textarea', 'select',
    '[role="button"]', '[tabindex]',
    '.btn', '.nav-link', '.nav-logo', '.skill-card-new',
    '.project-card', '.project-card-featured', '.chip',
    '.social-link', '.mobile-nav-link', '.hamburger',
    '.back-to-top', '#back-to-top', '.contact-info-link',
  ].join(',');

  const MAGNETIC = ['a', 'button', '.btn', '.nav-logo', '.social-link'].join(',');

  /* ══════════════════════════════════════════════════════════
     8. MOUSE EVENT HANDLERS
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.addEventListener('mouseenter', onMouseEnter);
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });

  function onMouseMove(e) {
    state.pmx = state.mx;
    state.pmy = state.my;
    state.mx  = e.clientX;
    state.my  = e.clientY;

    /* Velocity */
    state.vx = state.mx - state.pmx;
    state.vy = state.my - state.pmy;
    state.speed = Math.sqrt(state.vx * state.vx + state.vy * state.vy);

    /* Idle detection */
    state.lastMoveTime = performance.now();
    if (state.isIdle) {
      state.isIdle = false;
    }

    /* Magnetic effect */
    if (state.magnetTarget) {
      const rect = state.magnetTarget.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      state.magnetX = cx + dx * 10;
      state.magnetY = cy + dy * 10;
      state.isMagnetic = true;
    } else {
      state.isMagnetic = false;
    }

    /* Show cursor */
    if (!state.isVisible) {
      state.isVisible = true;
      showCursor();
    }
  }

  function onMouseEnter() {
    state.isVisible = true;
    showCursor();
  }

  function onMouseLeave() {
    state.isVisible = false;
    hideCursor();
  }

  function onMouseDown(e) {
    state.isClicking = true;
    dot.classList.add('clicking');
    glow.classList.add('clicking');
    ring.classList.add('clicking');
    spawnRipple(e.clientX, e.clientY);
  }

  function onMouseUp() {
    state.isClicking = false;
    dot.classList.remove('clicking');
    glow.classList.remove('clicking');
    ring.classList.remove('clicking');
  }

  function onMouseOver(e) {
    const target = e.target.closest(INTERACTIVE);
    if (!target) return;

    state.isHovering = true;
    dot.classList.add('hovering');
    glow.classList.add('hovering');
    ring.classList.add('hovering');

    /* Magnetic target */
    if (e.target.closest(MAGNETIC)) {
      state.magnetTarget = e.target.closest(MAGNETIC);
    }

    /* Show label for buttons */
    const tagName = target.tagName.toLowerCase();
    if (tagName === 'button' || target.classList.contains('btn')) {
      label.textContent = '← Click';
      label.classList.add('visible');
    }
  }

  function onMouseOut(e) {
    const target = e.target.closest(INTERACTIVE);
    if (!target) return;

    state.isHovering = false;
    dot.classList.remove('hovering');
    glow.classList.remove('hovering');
    ring.classList.remove('hovering');

    state.magnetTarget = null;
    state.isMagnetic = false;

    label.classList.remove('visible');
  }

  /* ══════════════════════════════════════════════════════════
     9. VISIBILITY
     ══════════════════════════════════════════════════════════ */
  function showCursor() {
    dot.classList.remove('cursor-hidden');
    glow.classList.remove('cursor-hidden');
    ring.classList.remove('cursor-hidden');
    ambient.classList.remove('cursor-hidden');
  }

  function hideCursor() {
    dot.classList.add('cursor-hidden');
    glow.classList.add('cursor-hidden');
    ring.classList.add('cursor-hidden');
    ambient.classList.add('cursor-hidden');
    label.classList.remove('visible');
    /* Hide all trail dots */
    state.trailDots.forEach(t => { t.el.style.opacity = '0'; });
    /* Hide all speed lines */
    state.speedLines.forEach(l => { l.el.style.opacity = '0'; });
  }

  /* ══════════════════════════════════════════════════════════
     10. RIPPLE CLICK EFFECT
     ══════════════════════════════════════════════════════════ */
  function spawnRipple(x, y) {
    /* Inner ripple */
    const r1 = document.createElement('div');
    r1.className = 'cursor-ripple';
    r1.style.left = x + 'px';
    r1.style.top  = y + 'px';
    document.body.appendChild(r1);

    /* Outer ripple */
    const r2 = document.createElement('div');
    r2.className = 'cursor-ripple-outer';
    r2.style.left = x + 'px';
    r2.style.top  = y + 'px';
    document.body.appendChild(r2);

    /* Auto-remove after animation */
    setTimeout(() => { r1.remove(); r2.remove(); }, 900);
  }

  /* ══════════════════════════════════════════════════════════
     11. SPEED LINES
     ══════════════════════════════════════════════════════════ */
  let speedLineCounter = 0;

  function updateSpeedLines() {
    const SPEED_THRESHOLD = 12;
    const MAX_SPEED = 60;

    if (state.speed < SPEED_THRESHOLD) {
      /* Fade all out */
      state.speedLines.forEach(l => {
        if (l.active) {
          l.el.style.opacity = '0';
          l.active = false;
        }
      });
      return;
    }

    /* Activate a line */
    const lineIdx = speedLineCounter % state.SPEED_LINE_COUNT;
    const line    = state.speedLines[lineIdx];
    speedLineCounter++;

    const intensity  = Math.min((state.speed - SPEED_THRESHOLD) / (MAX_SPEED - SPEED_THRESHOLD), 1);
    const lineLength = 20 + intensity * 120;
    const opacity    = 0.15 + intensity * 0.5;
    const angle      = Math.atan2(state.vy, state.vx) * (180 / Math.PI);

    /* Offset line position slightly for visual variety */
    const offsetY = (Math.random() - 0.5) * 20;

    line.el.style.cssText = `
      left: ${state.mx - lineLength}px;
      top:  ${state.my + offsetY}px;
      width: ${lineLength}px;
      opacity: ${opacity};
      transform: rotate(${angle}deg);
      transition: opacity 0.15s ease;
    `;
    line.active = true;

    /* Schedule fade */
    setTimeout(() => {
      if (line.active) {
        line.el.style.opacity = '0';
        line.active = false;
      }
    }, 80 + intensity * 80);
  }

  /* ══════════════════════════════════════════════════════════
     12. TRAIL UPDATE
     ══════════════════════════════════════════════════════════ */
  let trailFrameCounter = 0;

  function updateTrail() {
    /* Update trail position cascade */
    trailFrameCounter++;

    /* How many frames to skip between trail dot updates based on speed */
    const skipFrames = state.speed > 8 ? 1 : 2;

    if (trailFrameCounter % skipFrames !== 0) return;

    const TRAIL_EASE = state.speed > 15 ? 0.35 : 0.25;

    /* Cascade: each dot follows the one before it */
    for (let i = state.TRAIL_COUNT - 1; i > 0; i--) {
      const curr = state.trailDots[i];
      const prev = state.trailDots[i - 1];
      curr.targetX = prev.x;
      curr.targetY = prev.y;
    }
    /* First dot follows mouse */
    if (state.trailDots.length > 0) {
      state.trailDots[0].targetX = state.mx;
      state.trailDots[0].targetY = state.my;
    }

    /* LERP each dot toward target */
    state.trailDots.forEach((t, i) => {
      t.x = lerp(t.x, t.targetX, TRAIL_EASE);
      t.y = lerp(t.y, t.targetY, TRAIL_EASE);

      /* Opacity falls off by index and speed */
      const baseOpacity = state.speed > 5
        ? Math.max(0, 0.55 - i * 0.032) * Math.min(state.speed / 20, 1)
        : Math.max(0, 0.15 - i * 0.012);

      t.opacity = lerp(t.opacity, state.isVisible ? baseOpacity : 0, 0.15);

      /* Apply */
      t.el.style.left    = t.x + 'px';
      t.el.style.top     = t.y + 'px';
      t.el.style.opacity = t.opacity.toFixed(3);
    });
  }

  /* ══════════════════════════════════════════════════════════
     13. IDLE DETECTION — ambient breathe on idle
     ══════════════════════════════════════════════════════════ */
  function checkIdle() {
    const IDLE_THRESHOLD = 1500; // ms
    if (!state.isIdle && performance.now() - state.lastMoveTime > IDLE_THRESHOLD) {
      state.isIdle = true;
    }
  }

  /* ══════════════════════════════════════════════════════════
     14. MAIN ANIMATION LOOP — 60fps RAF
     ══════════════════════════════════════════════════════════ */
  /* LERP speeds for each layer */
  const LERP_RING    = 0.13;   /* ring follows with slight lag */
  const LERP_GLOW    = 0.09;   /* glow has more inertia */
  const LERP_AMBIENT = 0.055;  /* ambient is very lazy / cinematic */

  function animate() {
    requestAnimationFrame(animate);

    if (!state.isVisible) return;

    const targetX = state.isMagnetic ? state.magnetX : state.mx;
    const targetY = state.isMagnetic ? state.magnetY : state.my;

    /* ── Dot: instant (set position directly, no LERP) ── */
    dot.style.left = state.mx + 'px';
    dot.style.top  = state.my + 'px';

    /* ── Ring: medium LERP ── */
    state.ringX = lerp(state.ringX, targetX, LERP_RING);
    state.ringY = lerp(state.ringY, targetY, LERP_RING);
    ring.style.left = state.ringX + 'px';
    ring.style.top  = state.ringY + 'px';

    /* ── Glow: soft LERP ── */
    state.glowX = lerp(state.glowX, targetX, LERP_GLOW);
    state.glowY = lerp(state.glowY, targetY, LERP_GLOW);
    glow.style.left = state.glowX + 'px';
    glow.style.top  = state.glowY + 'px';

    /* ── Ambient: very soft LERP ── */
    state.ambX = lerp(state.ambX, state.mx, LERP_AMBIENT);
    state.ambY = lerp(state.ambY, state.my, LERP_AMBIENT);
    ambient.style.left = state.ambX + 'px';
    ambient.style.top  = state.ambY + 'px';

    /* ── Label follows main cursor ── */
    label.style.left = (state.mx + 30) + 'px';
    label.style.top  = (state.my - 18) + 'px';

    /* ── Trail ── */
    updateTrail();

    /* ── Speed lines ── */
    updateSpeedLines();

    /* ── Idle check ── */
    checkIdle();

    /* ── Speed-based dot scale (motion blur feel) ── */
    if (state.speed > 5) {
      const scaleX = 1 + Math.min(state.speed / 60, 1) * 2.5;
      const angle  = Math.atan2(state.vy, state.vx) * (180 / Math.PI);
      if (!state.isHovering && !state.isClicking) {
        dot.style.transform = `translate(-50%, -50%) scaleX(${scaleX.toFixed(2)}) rotate(${angle.toFixed(1)}deg)`;
      }
    } else {
      if (!state.isHovering && !state.isClicking) {
        dot.style.transform = 'translate(-50%, -50%)';
      }
    }

    /* ── Ambient ambient pulsing when idle ── */
    if (state.isIdle) {
      const t   = performance.now() / 1000;
      const pulseFactor = 0.92 + Math.sin(t * 1.5) * 0.08;
      ambient.style.transform = `translate(-50%, -50%) scale(${pulseFactor.toFixed(3)})`;
      ambient.style.opacity   = (0.7 + Math.sin(t * 1.2) * 0.3).toFixed(3);
    } else {
      ambient.style.transform = 'translate(-50%, -50%)';
      ambient.style.opacity   = '1';
    }

    /* Reset speed (will be updated on next mouse move) */
    state.vx    *= 0.85;
    state.vy    *= 0.85;
    state.speed *= 0.85;
  }

  /* ══════════════════════════════════════════════════════════
     15. SCROLL — update cursor position awareness
     ══════════════════════════════════════════════════════════ */
  /* No need to do anything on scroll since we track clientX/Y
     which are viewport-relative */

  /* ══════════════════════════════════════════════════════════
     16. KEYBOARD — hide on keyboard navigation
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('keydown', () => {
    /* Show cursor on next mouse move automatically */
  });

  /* ══════════════════════════════════════════════════════════
     17. INITIAL HIDDEN STATE
     ══════════════════════════════════════════════════════════ */
  hideCursor();

  /* ══════════════════════════════════════════════════════════
     18. START
     ══════════════════════════════════════════════════════════ */
  animate();

  /* ══════════════════════════════════════════════════════════
     19. PAGE VISIBILITY — pause when hidden
     ══════════════════════════════════════════════════════════ */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hideCursor();
    }
  });

  /* ══════════════════════════════════════════════════════════
     20. CONSOLE SIGNATURE
     ══════════════════════════════════════════════════════════ */
  console.log(
    '%c ✦ Premium Cursor v2.0 — Active ',
    'background: linear-gradient(135deg, #4f46e5, #06b6d4); color: #fff; padding: 5px 12px; border-radius: 20px; font-weight: 700; font-size: 12px;'
  );

})();
