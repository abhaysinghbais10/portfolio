import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Contact.css';

/* ─── Contact method cards — only real URLs ─── */
const CONTACT_METHODS = [
  {
    id: 'email',
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    description: 'Best way to reach me.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    show: true,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: personalInfo.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: personalInfo.github,
    description: 'Browse my projects and contributions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013-.404 11.5 11.5 0 013 .404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
    show: !!personalInfo.github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: personalInfo.linkedIn || null,
    href: personalInfo.linkedIn || null,
    description: 'Connect with me professionally.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    // Only show if URL is present
    show: !!personalInfo.linkedIn,
  },
].filter((m) => m.show);

/* ─── Framer variants ─── */
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

/* ─── Contact Method Card ─── */
const ContactCard = ({ method }) => (
  <motion.a
    href={method.href}
    target={method.id !== 'email' ? '_blank' : undefined}
    rel={method.id !== 'email' ? 'noopener noreferrer' : undefined}
    className="contact-method-card"
    variants={fadeUp}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    aria-label={`${method.label}: ${method.value}`}
  >
    <div className="contact-method-icon">{method.icon}</div>
    <div className="contact-method-info">
      <span className="contact-method-label">{method.label}</span>
      <span className="contact-method-value">{method.value}</span>
      <span className="contact-method-desc">{method.description}</span>
    </div>
    <span className="contact-method-arrow" aria-hidden="true">↗</span>
  </motion.a>
);

/* ─── Contact Form (mailto-based) ─── */
const ContactForm = () => {
  const [fields, setFields] = useState({ name: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!fields.name.trim())    e.name    = 'Name is required.';
    if (!fields.subject.trim()) e.subject = 'Subject is required.';
    if (!fields.message.trim()) e.message = 'Message is required.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    // Construct mailto — genuinely functional, opens the user's email client
    const body = encodeURIComponent(
      `Hi Abhay,\n\n${fields.message}\n\n— ${fields.name}`
    );
    const subject = encodeURIComponent(fields.subject);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="contact-form-success"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        role="status"
        aria-live="polite"
      >
        <span className="success-icon" aria-hidden="true">✉️</span>
        <h3 className="success-heading">Email client opened!</h3>
        <p className="success-body">
          Your default email app should have opened with the message pre-filled.
          Send it from there to reach Abhay directly at{' '}
          <strong>{personalInfo.email}</strong>.
        </p>
        <button
          className="btn-reset"
          onClick={() => { setSubmitted(false); setFields({ name: '', subject: '', message: '' }); }}
        >
          Write another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form — opens your email client on submit"
    >
      <div className="contact-form-note" role="note">
        <span aria-hidden="true">ℹ️</span>
        Submitting opens your email client with the message pre-filled.
      </div>

      {/* Name */}
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">Your Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          className={`form-input${errors.name ? ' form-input--error' : ''}`}
          value={fields.name}
          onChange={handleChange}
          placeholder="Jane Smith"
          autoComplete="name"
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <span id="contact-name-error" className="form-error" role="alert">{errors.name}</span>
        )}
      </div>

      {/* Subject */}
      <div className="form-group">
        <label className="form-label" htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          className={`form-input${errors.subject ? ' form-input--error' : ''}`}
          value={fields.subject}
          onChange={handleChange}
          placeholder="Opportunity / Project / Hello"
          autoComplete="off"
          aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <span id="contact-subject-error" className="form-error" role="alert">{errors.subject}</span>
        )}
      </div>

      {/* Message */}
      <div className="form-group">
        <label className="form-label" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          className={`form-textarea${errors.message ? ' form-input--error' : ''}`}
          value={fields.message}
          onChange={handleChange}
          placeholder="Tell me about the opportunity or project..."
          rows={5}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <span id="contact-message-error" className="form-error" role="alert">{errors.message}</span>
        )}
      </div>

      <motion.button
        type="submit"
        className="btn-send"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Open Email Client
        <span className="btn-send-icon" aria-hidden="true">→</span>
      </motion.button>
    </form>
  );
};

/* ─── Section ─── */
const Contact = () => (
  <section id="contact" className="contact-section" aria-label="Contact">
    {/* Ambient glow */}
    <div className="contact-glow" aria-hidden="true" />

    <div className="container contact-wrapper">

      {/* Header */}
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="contact-label">Get in Touch</span>
        <h2 className="contact-title">Contact</h2>
        <p className="contact-subtitle">
          Open to full-time roles, internships, and interesting projects.
          Feel free to reach out.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="contact-body">

        {/* Left — contact methods */}
        <div className="contact-left">
          <motion.div
            className="contact-methods"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="contact-methods-heading" variants={fadeUp}>
              Reach me directly
            </motion.p>
            {CONTACT_METHODS.map((m) => (
              <ContactCard key={m.id} method={m} />
            ))}

            {/* LinkedIn placeholder — shown only when URL is missing */}
            {!personalInfo.linkedIn && (
              <motion.div
                className="contact-placeholder-card"
                variants={fadeUp}
                aria-label="LinkedIn — URL not yet configured"
              >
                <div className="contact-method-icon contact-placeholder-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="contact-method-info">
                  <span className="contact-method-label">LinkedIn</span>
                  <span className="contact-placeholder-note">
                    Add <code>linkedIn</code> URL in <code>portfolioData.js</code> to activate
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right — mailto form */}
        <motion.div
          className="contact-right"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <div className="contact-form-card">
            <h3 className="contact-form-heading">Send a Message</h3>
            <ContactForm />
          </div>
        </motion.div>
      </div>

    </div>
  </section>
);

export default Contact;
