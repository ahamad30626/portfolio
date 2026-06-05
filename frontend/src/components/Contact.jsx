import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContact } from '../services/api';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true, margin: '-60px' },
});

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/ahamad30626',
    ariaLabel: 'GitHub Profile',
    handle: 'ahamad30626',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/salam-ahamad-shaik-634686346/',
    ariaLabel: 'LinkedIn Profile',
    handle: 'Salam Ahamad Shaik',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:2300030626cseh1@gmail.com',
    ariaLabel: 'Send Email',
    handle: '2300030626cseh1@gmail.com',
    isEmail: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Required';
  if (!/\S+@\S+\.\S+/.test(f.email)) e.email = 'Valid email required';
  if (!f.message.trim() || f.message.length < 10) e.message = 'At least 10 characters';
  return e;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'ok' | 'err'

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');
    try {
      await submitContact(form);
      setStatus('ok');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('err');
    }
  };

  const inputCls = (field) =>
    `w-full bg-[#0c0d14] border ${errors[field] ? 'border-red-500/50' : 'border-white/[0.09]'} rounded-lg px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/60 transition-colors`;

  return (
    <section id="contact" className="py-20 lg:py-28" aria-label="Contact section">
      <div className="max-w-5xl mx-auto px-6">

        <motion.p {...fade()} className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-3">
          Get in touch
        </motion.p>
        <motion.h2 {...fade(0.05)} className="text-3xl lg:text-4xl font-bold text-slate-100 mb-3">
          Let's talk
        </motion.h2>
        <motion.p {...fade(0.1)} className="text-slate-400 mb-10 max-w-xl">
          I'm actively looking for <span className="text-slate-300">SWE internships and junior frontend roles</span>.
          If you have an opportunity, want to collaborate, or just want to talk tech —
          my inbox is open.
        </motion.p>

        <div className="grid lg:grid-cols-[1fr_360px] gap-10">

          {/* Form */}
          <motion.form {...fade(0.12)} onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set('name')}
                  className={inputCls('name')}
                  aria-label="Your name"
                  required
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={set('email')}
                  className={inputCls('email')}
                  aria-label="Your email"
                  required
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            <input
              id="contact-subject"
              type="text"
              placeholder="Subject (optional)"
              value={form.subject}
              onChange={set('subject')}
              className={inputCls('subject')}
              aria-label="Subject"
            />

            <div>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={set('message')}
                className={`${inputCls('message')} resize-none`}
                aria-label="Message"
                required
              />
              {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
            </div>

            <button
              id="form-submit"
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
              aria-label="Send message"
            >
              {status === 'sending' ? 'Sending…' : 'Send Message →'}
            </button>

            {status === 'ok' && (
              <p className="text-sm text-emerald-400 flex items-center gap-2">
                <span>✓</span> Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'err' && (
              <p className="text-sm text-red-400">
                Something went wrong. Email me directly at{' '}
                <a href="mailto:2300030626cseh1@gmail.com" className="underline">
                  2300030626cseh1@gmail.com
                </a>
              </p>
            )}
          </motion.form>

          {/* Social links */}
          <motion.div {...fade(0.15)} className="space-y-4">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-5">
              Or reach me directly
            </p>

            {SOCIALS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.isEmail ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.ariaLabel}
                className="flex items-center gap-4 p-4 bg-[#0e1018] border border-white/[0.08] hover:border-white/[0.16] rounded-xl transition-all group"
              >
                <span className="text-slate-400 group-hover:text-indigo-400 transition-colors flex-shrink-0">
                  {s.icon}
                </span>
                <div>
                  <p className="text-xs text-slate-500 font-medium">{s.label}</p>
                  <p className="text-sm text-slate-300 group-hover:text-slate-100 transition-colors break-all">
                    {s.handle}
                  </p>
                </div>
                <span className="ml-auto text-slate-600 group-hover:text-slate-400 transition-colors">→</span>
              </a>
            ))}

            <div className="mt-6 p-4 bg-[#0e1018] border border-indigo-500/20 rounded-xl">
              <p className="text-xs font-semibold text-indigo-400 mb-1.5">Preferred mode</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                I respond fastest to emails. LinkedIn DMs also work.
                I typically reply within 24 hours.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
