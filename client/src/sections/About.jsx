import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="section-title">About Me</h2>
        <p className="about-text">
          I am {personalInfo.name}, a {personalInfo.title} with a passion for building
          end‑to‑end web applications. I specialise in full‑stack development using
          React, Node.js, Express, and REST APIs, focusing on clean, maintainable code
          and secure authentication. I thrive on solving complex problems, collaborating
          with UI/UX designers, and delivering performant, responsive products.
        </p>
        <ul className="about-highlights">
          <li>✔️ End‑to‑end product ownership</li>
          <li>✔️ REST API design & implementation</li>
          <li>✔️ Secure authentication flows</li>
          <li>✔️ Clean, maintainable code</li>
          <li>✔️ Strong communication & teamwork</li>
        </ul>
      </motion.div>
    </section>
  );
};

export default About;
