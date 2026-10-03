import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';
import './Experience.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut', delay: i * 0.08 },
  }),
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="experience-section">
      <div className="container experience-wrapper">
        {/* Section header */}
        <motion.div
          className="experience-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="experience-label">Career</span>
          <h2 className="experience-title">Work Experience</h2>
          <p className="experience-subtitle">
            Building real products and owning features end‑to‑end.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="experience-timeline">
          {/* Animated vertical line */}
          <motion.div
            className="timeline-line"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ originY: 0 }}
          />

          <motion.div
            className="timeline-items"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {experience.map((job, idx) => (
              <motion.div
                key={idx}
                className="timeline-item"
                variants={cardVariants}
              >
                {/* Dot on the line */}
                <div className="timeline-dot">
                  <div className="timeline-dot__inner" />
                </div>

                {/* Card */}
                <div className="experience-card card">
                  {/* Header row */}
                  <div className="exp-card-header">
                    <div className="exp-card-meta">
                      <h3 className="exp-role">{job.role}</h3>
                      <div className="exp-company-row">
                        <span className="exp-company">{job.company}</span>
                        <span className="exp-separator">·</span>
                        <span className="exp-location">{job.location}</span>
                      </div>
                    </div>
                    <div className="exp-dates">
                      <span className="exp-dates__badge">
                        {job.start} – {job.end}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="exp-divider" />

                  {/* Responsibilities */}
                  <ul className="exp-responsibilities">
                    {job.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        className="exp-responsibility"
                        custom={i}
                        variants={listItemVariants}
                      >
                        <span className="exp-bullet" aria-hidden="true" />
                        {resp}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
