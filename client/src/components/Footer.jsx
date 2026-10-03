import React, { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Footer.css';

/* ─── Section nav links — IDs verified against existing section elements ─── */
const NAV_LINKS_COL_A = [
  { label: 'Home',       href: '#home' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
];

const NAV_LINKS_COL_B = [
  { label: 'Achievements',    href: '#achievements' },
  { label: 'Problem Solving', href: '#problem-solving' },
  { label: 'Education',       href: '#education' },
  { label: 'Contact',         href: '#contact' },
];

/* ─── Build social links — only includes entries with a non-empty URL ─── */
const buildSocialLinks = () => {
  const links = [];

  if (personalInfo.github) {
    links.push({
      id: 'github',
      label: 'GitHub profile — opens in new tab',
      href: personalInfo.github,
      external: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013-.404 11.5 11.5 0 013 .404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    });
  }

  if (personalInfo.email) {
    links.push({
      id: 'email',
      label: `Send email to ${personalInfo.name}`,
      href: `mailto:${personalInfo.email}`,
      external: false,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden="true" focusable="false">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    });
  }

  /* LinkedIn — only added when URL is configured */
  if (personalInfo.linkedIn) {
    links.push({
      id: 'linkedin',
      label: 'LinkedIn profile — opens in new tab',
      href: personalInfo.linkedIn,
      external: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    });
  }

  return links;
};

const SOCIAL_LINKS = buildSocialLinks();

/* ─── Fade-up animation variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Footer = () => {
  const [year] = useState(() => new Date().getFullYear());
  const prefersReducedMotion = useReducedMotion();

  /* Smooth-scroll for in-page anchor links — respects reduced-motion preference */
  const handleNavClick = useCallback(
    (e, href) => {
      const id = href.replace('#', '');
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        /* Shift focus to destination for screen-reader users */
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    },
    [prefersReducedMotion],
  );

  /* Animation props — omitted entirely when the user prefers reduced motion */
  const sectionMotion = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px' },
        variants: fadeUp,
        transition: { duration: 0.45, ease: 'easeOut' },
      };

  const navMotion = prefersReducedMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-40px' },
        variants: fadeUp,
        transition: { duration: 0.45, delay: 0.1, ease: 'easeOut' },
      };

  return (
    <footer className="footer" aria-label="Site footer">

      {/* ── Top gradient divider ── */}
      <div className="footer-divider" aria-hidden="true" />

      <div className="container footer-inner">

        {/* ── Brand column ── */}
        <motion.div className="footer-brand" {...sectionMotion}>
          <a
            href="#home"
            className="footer-logo"
            aria-label="Back to top — Abhay Singh Bais"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            Abhay<span className="footer-logo-dot">.</span>
          </a>

          <p className="footer-tagline">{personalInfo.title}</p>

          <p className="footer-email">
            <a
              href={`mailto:${personalInfo.email}`}
              className="footer-email-link"
              aria-label={`Email ${personalInfo.email}`}
            >
              {personalInfo.email}
            </a>
          </p>

          {/* Social icons — only rendered for configured links */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="footer-socials" role="list" aria-label="Social and contact links">
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.id}
                  role="listitem"
                  href={s.href}
                  target={s.external ? '_blank' : undefined}
                  rel={s.external ? 'noopener noreferrer' : undefined}
                  className="footer-social-icon"
                  aria-label={s.label}
                  whileHover={prefersReducedMotion ? {} : { y: -3, transition: { duration: 0.18 } }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.92 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Navigation columns ── */}
        <motion.nav
          className="footer-nav"
          aria-label="Footer site navigation"
          {...navMotion}
        >
          <div className="footer-nav-group">
            <h3 className="footer-nav-heading">Sections</h3>
            <ul className="footer-nav-list" role="list">
              {NAV_LINKS_COL_A.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-nav-group">
            <h3 className="footer-nav-heading">More</h3>
            <ul className="footer-nav-list" role="list">
              {NAV_LINKS_COL_B.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="footer-nav-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* Resume download — only rendered when URL is configured */}
              {personalInfo.resumeUrl && (
                <li>
                  <a
                    href={personalInfo.resumeUrl}
                    download
                    className="footer-nav-link footer-nav-link--highlight"
                    aria-label="Download résumé PDF"
                  >
                    Download Résumé ↓
                  </a>
                </li>
              )}
            </ul>
          </div>
        </motion.nav>

      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            &copy; {year} {personalInfo.name}. Built with React &amp; Vite.
          </p>
          <a
            href="#home"
            className="footer-back-top"
            aria-label="Scroll back to top"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            Back to top ↑
          </a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
