import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

const ROLES = ['Full Stack Developer', 'React Developer', 'Node.js Engineer', 'Problem Solver'];

const Hero = () => {
  const roleRef = useRef(null);
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef(null);

  // Typewriter loop — respects prefers-reduced-motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Skip animation — show first role immediately
      if (roleRef.current) roleRef.current.textContent = ROLES[0];
      return;
    }

    const type = () => {
      const role = ROLES[indexRef.current];
      if (!deletingRef.current) {
        charRef.current += 1;
        if (roleRef.current) roleRef.current.textContent = role.slice(0, charRef.current);
        if (charRef.current === role.length) {
          deletingRef.current = true;
          timerRef.current = setTimeout(type, 1600);
          return;
        }
      } else {
        charRef.current -= 1;
        if (roleRef.current) roleRef.current.textContent = role.slice(0, charRef.current);
        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % ROLES.length;
        }
      }
      timerRef.current = setTimeout(type, deletingRef.current ? 60 : 100);
    };
    timerRef.current = setTimeout(type, 600);
    return () => clearTimeout(timerRef.current);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
  };

  return (
    <section id="home" className="hero-section">
      {/* Ambient background blobs */}
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />

      <div className="hero-grid-overlay" aria-hidden="true" />

      <div className="hero-layout container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
        {/* Greeting pill */}
        <motion.div className="hero-greeting" variants={itemVariants}>
          <span className="hero-greeting__dot" />
          <span>Available for opportunities</span>
        </motion.div>

        {/* Name */}
        <motion.h1 className="hero-name" variants={itemVariants}>
          Hi, I'm{' '}
          <span className="hero-name__highlight">{personalInfo.name.split(' ')[0]}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div className="hero-role" variants={itemVariants}>
          <span ref={roleRef} className="hero-role__text" />
          <span className="hero-role__cursor" aria-hidden="true">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p className="hero-tagline" variants={itemVariants}>
          I craft end‑to‑end web applications — clean APIs, responsive UIs,
          and architecture that scales.
        </motion.p>

        {/* CTA buttons */}
        <motion.div className="hero-cta" variants={itemVariants}>
          <a href="#projects" className="button-primary hero-cta__btn">
            View Projects
          </a>
          {personalInfo.resumeUrl && (
            <a
              href={personalInfo.resumeUrl}
              download
              className="button-secondary hero-cta__btn"
            >
              Download Résumé
            </a>
          )}
        </motion.div>

        {/* Social links */}
        <motion.div className="hero-socials" variants={itemVariants}>
          {personalInfo.github && (
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub profile — opens in new tab"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.404c1.02.005 2.047.138 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {personalInfo.linkedIn && (
            <a
              href={personalInfo.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="LinkedIn profile — opens in new tab"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          )}
          <a
            href="#contact"
            className="hero-social-link"
            aria-label="Go to Contact section"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </motion.div>
        </motion.div>

        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        >
          <img src="/abhay.png" alt="Abhay" className="hero-photo__image" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        aria-hidden="true"
      >
        <div className="hero-scroll-indicator__line" />
        <span className="hero-scroll-indicator__label">scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
