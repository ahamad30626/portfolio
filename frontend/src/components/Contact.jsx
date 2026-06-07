import { useState } from 'react';
import { submitContact } from '../services/api';

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/ahamad30626',
    label: 'GitHub',
    ariaLabel: 'GitHub Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/salam-ahamad-shaik-634686346/',
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn Profile',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    href: 'mailto:2300030626cseh1@gmail.com',
    label: 'Email',
    ariaLabel: 'Send Email',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
];

function Toast({ message, type, show }) {
  return (
    <div className={`toast${show ? ' show' : ''} ${type}`} role="alert" aria-live="polite">
      {message}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 4000);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      const res = await submitContact(form);
      showToast(res.message || "Message sent! I'll be in touch soon. 🚀", 'success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      showToast('Oops! Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" aria-label="Contact section">
      <div className="container">
        <div className="contact-wrapper">
          <span className="section-label reveal" style={{ justifyContent: 'center' }}>Get In Touch</span>
          <h2 className="section-title reveal delay-1">Let's Build Something<br />Together ✨</h2>
          <p className="contact-tagline reveal delay-2">
            Have a project in mind or just want to say hello? My inbox is always open — I'll get back to you within 24 hours.
          </p>

          <form className="contact-form reveal delay-3" id="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="form-name">Your Name</label>
                <input type="text" id="form-name" name="name" className="form-input" placeholder="John Doe"
                  value={form.name} onChange={handleChange} required aria-required="true" autoComplete="name" />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="form-email">Email Address</label>
                <input type="email" id="form-email" name="email" className="form-input" placeholder="john@example.com"
                  value={form.email} onChange={handleChange} required aria-required="true" autoComplete="email" />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="form-subject">Subject</label>
              <input type="text" id="form-subject" name="subject" className="form-input"
                placeholder="Project collaboration, freelance work..."
                value={form.subject} onChange={handleChange} autoComplete="off" />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="form-message">Message</label>
              <textarea id="form-message" name="message" className="form-textarea"
                placeholder="Tell me about your project or idea..."
                value={form.message} onChange={handleChange} required aria-required="true" />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="form-submit" id="form-submit" disabled={loading} aria-label="Send message">
              {loading ? 'Sending...' : 'Send Message 🚀'}
            </button>
          </form>

          {/* Social links */}
          <div className="social-row reveal delay-4" role="list" aria-label="Social media links">
            {SOCIAL_LINKS.map(s => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="social-link"
                data-label={s.label}
                role="listitem"
                aria-label={s.ariaLabel}
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Visible email — direct contact without filling the form */}
          <p className="contact-direct-email reveal delay-4">
            Or reach me directly at{' '}
            <a href="mailto:2300030626cseh1@gmail.com" className="contact-email-link" aria-label="Send Email">
              2300030626cseh1@gmail.com
            </a>
          </p>
        </div>
      </div>

      <Toast {...toast} />
    </section>
  );
}
