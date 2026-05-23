/* ============================================================
   PORTFOLIO MAIN.JS — Interactions & Animations
   ============================================================ */

'use strict';

/* --------------------------------------------------------
   1. CUSTOM CURSOR
   → Handled by cursor.js (Premium Futuristic Cursor System)
   -------------------------------------------------------- */



/* --------------------------------------------------------
   2. PARTICLE / DOT-GRID CANVAS BACKGROUND
   -------------------------------------------------------- */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let W, H;

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.vx   = (Math.random() - 0.5) * 0.3;
    this.vy   = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.color = Math.random() > 0.5
      ? `rgba(79, 70, 229, ${this.opacity})`
      : `rgba(6, 182, 212, ${this.opacity})`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  const count = Math.min(Math.floor((W * H) / 8000), 160);
  particles = Array.from({ length: count }, () => new Particle());
}
initParticles();

function drawConnections() {
  const maxDist = 130;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.08;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* --------------------------------------------------------
   3. TYPEWRITER EFFECT
   -------------------------------------------------------- */
const roles      = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver', 'React Specialist', 'Creative Coder'];
const typeEl     = document.getElementById('typewriter');
let roleIndex    = 0;
let charIndex    = 0;
let isDeleting   = false;
let typeTimeout;

function typewrite() {
  const currentRole = roles[roleIndex];
  if (!isDeleting) {
    typeEl.textContent = currentRole.slice(0, ++charIndex);
    if (charIndex === currentRole.length) {
      isDeleting = true;
      typeTimeout = setTimeout(typewrite, 2200);
      return;
    }
  } else {
    typeEl.textContent = currentRole.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting  = false;
      roleIndex   = (roleIndex + 1) % roles.length;
    }
  }
  typeTimeout = setTimeout(typewrite, isDeleting ? 55 : 90);
}

// Start typewriter after hero animation
setTimeout(typewrite, 1600);


/* --------------------------------------------------------
   4. NAVBAR — Scroll glass + active section highlight
   -------------------------------------------------------- */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('section[id]');

function updateNavbar() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

function updateActiveLink() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', () => {
  updateNavbar();
  updateActiveLink();
  updateBackToTop();
}, { passive: true });
updateNavbar();


/* --------------------------------------------------------
   5. HAMBURGER / MOBILE NAV
   -------------------------------------------------------- */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (mobileNav.classList.contains('open') &&
      !mobileNav.contains(e.target) &&
      !hamburger.contains(e.target)) {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});


/* --------------------------------------------------------
   6. SCROLL-TRIGGERED REVEAL ANIMATIONS
   -------------------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


/* --------------------------------------------------------
   7. BACK TO TOP BUTTON
   -------------------------------------------------------- */
const backToTopBtn = document.getElementById('back-to-top');

function updateBackToTop() {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* --------------------------------------------------------
   8. CONTACT FORM — Validation + Toast
   -------------------------------------------------------- */
const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('form-submit');
const toast      = document.getElementById('toast');
let toastTimeout;

function showToast(message, isError = false) {
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.style.borderColor = isError ? 'rgba(248, 113, 113, 0.3)' : 'rgba(74, 222, 128, 0.3)';
  toast.style.color       = isError ? '#f87171' : '#4ade80';
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 4000);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('form-name').value.trim();
  const email   = document.getElementById('form-email').value.trim();
  const message = document.getElementById('form-message').value.trim();

  // Validation
  if (!name) {
    showToast('⚠️ Please enter your name.', true);
    document.getElementById('form-name').focus();
    return;
  }
  if (!email || !validateEmail(email)) {
    showToast('⚠️ Please enter a valid email address.', true);
    document.getElementById('form-email').focus();
    return;
  }
  if (!message) {
    showToast('⚠️ Please write your message.', true);
    document.getElementById('form-message').focus();
    return;
  }

  // Simulate sending
  submitBtn.textContent = 'Sending';
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  await new Promise(res => setTimeout(res, 1800));

  submitBtn.textContent = 'Send Message 🚀';
  submitBtn.classList.remove('loading');
  submitBtn.disabled = false;
  form.reset();
  showToast('✅ Message sent! I\'ll get back to you soon.');
});

// Real-time input border feedback
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
  input.addEventListener('blur', () => {
    if (input.value.trim()) {
      input.style.borderColor = 'rgba(74, 222, 128, 0.3)';
    }
  });
  input.addEventListener('focus', () => {
    input.style.borderColor = '';
  });
});


/* --------------------------------------------------------
   9. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   -------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'), 10) || 72;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* --------------------------------------------------------
   10. SKILLS SECTION — Premium Interactions
   -------------------------------------------------------- */

/* -- Inject SVG gradient definition for proficiency rings -- */
(function injectSkillGradient() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;overflow:hidden;width:0;height:0;';
  svg.innerHTML = `<defs>
    <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="#8b5cf6"/>
      <stop offset="50%"  stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
  </defs>`;
  document.body.insertBefore(svg, document.body.firstChild);
})();

/* -- Proficiency ring scroll reveal -- */
const CIRCUMFERENCE = 2 * Math.PI * 22; // r=22 → 138.2

const ringObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    const fill = card.querySelector('.skill-ring-fill');
    if (!fill) return;
    const pct = parseInt(fill.getAttribute('data-pct'), 10) || 0;
    const offset = CIRCUMFERENCE * (1 - pct / 100);
    // Stagger by card index within its grid
    const idx = Array.from(card.parentElement.children).indexOf(card);
    fill.style.transitionDelay = `${idx * 80}ms`;
    fill.style.strokeDashoffset = offset;
    ringObserver.unobserve(card);
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card-new').forEach(c => ringObserver.observe(c));

/* -- Mouse-follow spotlight inside #skills -- */
const skillsSection = document.getElementById('skills');
const spotlight     = document.getElementById('skills-spotlight');

if (skillsSection && spotlight) {
  skillsSection.addEventListener('mouseenter', () => {
    spotlight.style.opacity = '1';
  });
  skillsSection.addEventListener('mouseleave', () => {
    spotlight.style.opacity = '0';
  });
  skillsSection.addEventListener('mousemove', (e) => {
    const rect = skillsSection.getBoundingClientRect();
    spotlight.style.left = (e.clientX - rect.left) + 'px';
    spotlight.style.top  = (e.clientY - rect.top)  + 'px';
  });
}

/* -- 3D tilt parallax on new skill cards -- */
document.querySelectorAll('.skill-card-new').forEach(card => {
  let raf;
  card.addEventListener('mousemove', (e) => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width  / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-8px) scale(1.03) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
      card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
    });
  });
  card.addEventListener('mouseleave', () => {
    if (raf) cancelAnimationFrame(raf);
    card.style.transform = '';
    card.style.transition = 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease';
  });
});

/* -- Animated underline on section title -- */
const skillsTitleEl = document.querySelector('.skills-section-title');
if (skillsTitleEl) {
  const titleObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { skillsTitleEl.classList.add('visible'); titleObs.unobserve(skillsTitleEl); }
    });
  }, { threshold: 0.4 });
  titleObs.observe(skillsTitleEl);
}

/* -- Re-run reveal observer for new .reveal elements in skills -- */
document.querySelectorAll('#skills .reveal').forEach(el => {
  if (!el.classList.contains('visible')) revealObserver.observe(el);
});




/* --------------------------------------------------------
   11. PROJECT CARD — Subtle parallax image on hover
   -------------------------------------------------------- */
document.querySelectorAll('.project-card, .project-card-featured').forEach(card => {
  const img = card.querySelector('img');
  if (!img) return;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px   = (e.clientX - rect.left) / rect.width  - 0.5;
    const py   = (e.clientY - rect.top)  / rect.height - 0.5;
    img.style.transform = `scale(1.06) translate(${px * -8}px, ${py * -8}px)`;
  });
  card.addEventListener('mouseleave', () => {
    img.style.transform = '';
  });
});


/* --------------------------------------------------------
   12. ANIMATED NUMBER COUNTER for stats
   -------------------------------------------------------- */
function animateCounter(el) {
  const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
  const suffix = el.textContent.replace(/[0-9]/g, '');
  let current  = 0;
  const step   = Math.ceil(target / 40);
  const timer  = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));


/* --------------------------------------------------------
   13. PAGE VISIBILITY — Pause animations when hidden
   -------------------------------------------------------- */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearTimeout(typeTimeout);
  else typewrite();
});


/* --------------------------------------------------------
   14. KEYBOARD NAVIGATION — Close mobile nav on Escape
   -------------------------------------------------------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }
});


/* --------------------------------------------------------
   15. PERFORMANCE — Lazy-load detection utility
   -------------------------------------------------------- */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading is supported; images have loading="lazy" in HTML
  console.log('%c⚡ Portfolio loaded — native lazy loading active', 'color:#818cf8; font-weight:600;');
} else {
  // Fallback: Intersection Observer for lazy loading older browsers
  const lazyImgs = document.querySelectorAll('img[loading="lazy"]');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        lazyObserver.unobserve(img);
      }
    });
  });
  lazyImgs.forEach(img => lazyObserver.observe(img));
}


/* --------------------------------------------------------
   16. SCROLL PROGRESS INDICATOR (thin top bar)
   -------------------------------------------------------- */
const progressBar = document.createElement('div');
progressBar.setAttribute('aria-hidden', 'true');
Object.assign(progressBar.style, {
  position: 'fixed', top: '0', left: '0', height: '2px',
  background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #06b6d4)',
  zIndex: '10000', width: '0%', transition: 'width 0.1s ease',
  transformOrigin: 'left', pointerEvents: 'none'
});
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollable = document.body.scrollHeight - window.innerHeight;
  const progress   = (window.scrollY / scrollable) * 100;
  progressBar.style.width = Math.min(progress, 100) + '%';
}, { passive: true });


/* --------------------------------------------------------
   INIT LOG
   -------------------------------------------------------- */
console.log(
  '%c 🚀 Portfolio by Shaik ',
  'background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; padding: 6px 12px; border-radius: 6px; font-weight: 700; font-size: 14px;'
);
