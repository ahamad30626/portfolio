import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { submitContact } from '../services/api';

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/ahamad30626', icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com',           icon: '∈' },
  { label: 'Twitter',  href: 'https://twitter.com',            icon: '✕' },
  { label: 'Email',    href: 'mailto:ahamad@example.com',      icon: '✉' },
];

function Toast({ msg, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
      className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-medium border z-50 ${
        type === 'success'
          ? 'bg-green-500/10 border-green-500/30 text-green-400'
          : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      }`}
    >
      {msg}
    </motion.div>
  );
}

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState(null);
  const [errors, setErrors]     = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name too short';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))   e.email = 'Invalid email';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message too short';
    return e;
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await submitContact({ ...form, subject: 'Portfolio Contact' });
      setToast({ msg: "Message sent! I'll reply within a day ✦", type: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch {
      setToast({ msg: 'Something went wrong. Try emailing directly.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 4500);
    }
  };

  const inputClass = (field) => `w-full bg-[#141416] border ${
    errors[field] ? 'border-rose-500/50' : 'border-[#242428] focus:border-[#6366f1]'
  } rounded-xl px-4 py-3 text-sm text-[#f0f0f2] placeholder:text-[#4a4a54] outline-none transition-colors font-sans`;

  return (
    <section id="contact" className="section-pad" ref={ref} aria-label="Contact section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#6366f1] tracking-widest uppercase mb-4"
        >
          06 / contact
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22,1,0.36,1] }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
              Let's build<br />something
              <span className="grad-accent"> real.</span>
            </h2>
            <p className="text-[#8a8a94] leading-relaxed mb-8 max-w-sm">
              I reply to every message. Usually within a day. Whether it's a project,
              a question, or just to say hi — I'd love to hear from you.
            </p>

            {/* Timezone note */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-[#242428] bg-[#141416] mb-8">
              <span className="text-xl">🕐</span>
              <div>
                <p className="text-xs font-mono text-[#4a4a54] mb-0.5">Timezone</p>
                <p className="text-sm text-[#f0f0f2]">IST (UTC+5:30) — usually online evenings</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 flex-wrap">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hoverable flex items-center gap-2 px-4 py-2.5 border border-[#242428] rounded-xl text-sm text-[#8a8a94] hover:border-[#6366f1] hover:text-[#f0f0f2] transition-all"
                  aria-label={s.label}
                >
                  <span className="font-mono">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.form
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22,1,0.36,1] }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            aria-label="Contact form"
          >
            <div>
              <label className="block text-xs font-mono text-[#4a4a54] mb-2" htmlFor="cf-name">Name</label>
              <input
                id="cf-name" name="name" type="text" autoComplete="name"
                placeholder="Your name"
                value={form.name} onChange={handleChange}
                className={inputClass('name')}
                required aria-required
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono text-[#4a4a54] mb-2" htmlFor="cf-email">Email</label>
              <input
                id="cf-email" name="email" type="email" autoComplete="email"
                placeholder="your@email.com"
                value={form.email} onChange={handleChange}
                className={inputClass('email')}
                required aria-required
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-mono text-[#4a4a54] mb-2" htmlFor="cf-message">What do you want to build?</label>
              <textarea
                id="cf-message" name="message"
                placeholder="Tell me what you're working on, or just say hello..."
                value={form.message} onChange={handleChange}
                rows={5}
                className={`${inputClass('message')} resize-none`}
                required aria-required
              />
              {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="hoverable w-full py-3.5 bg-[#6366f1] text-white text-sm font-semibold rounded-xl hover:bg-[#5254cc] transition-all disabled:opacity-60 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              {loading ? 'Sending…' : 'Send message ↗'}
            </button>

            <p className="text-center text-xs text-[#4a4a54] font-mono">
              Or email directly: <a href="mailto:ahamad@example.com" className="text-[#6366f1] hover:underline">ahamad@example.com</a>
            </p>
          </motion.form>
        </div>
      </div>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </section>
  );
}
