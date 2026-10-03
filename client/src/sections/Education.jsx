import React from 'react';
import { motion } from 'framer-motion';
import { education } from '../data/portfolioData';
import './Education.css';

/* Determine if a degree is currently ongoing */
const isOngoing = (endYear) => endYear >= new Date().getFullYear();

/* Simple icon per education level */
const DegreeIcon = ({ degree }) => {
  if (degree.toLowerCase().includes('b.tech') || degree.toLowerCase().includes('bachelor')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  );
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: 'easeOut', delay: i * 0.15 },
  }),
};

const Education = () => (
  <section id="education" className="edu-section" aria-label="Education">
    <div className="container edu-wrapper">

      {/* Header */}
      <motion.div
        className="edu-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="edu-label">Background</span>
        <h2 className="edu-title">Education</h2>
        <p className="edu-subtitle">
          Academic foundation in Computer Science Engineering.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="edu-timeline">
        {/* Animated vertical line */}
        <motion.div
          className="edu-line"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ originY: 0 }}
        />

        <div className="edu-items">
          {education.map((item, i) => {
            const ongoing = isOngoing(item.endYear);
            return (
              <motion.article
                key={i}
                className="edu-card card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -4, transition: { duration: 0.22 } }}
                aria-label={`${item.degree} at ${item.institute}`}
              >
                {/* Dot on line */}
                <div className={`edu-dot${ongoing ? ' edu-dot--active' : ''}`}>
                  <div className="edu-dot-inner" />
                </div>

                {/* Card content */}
                <div className="edu-card-content">
                  {/* Top row */}
                  <div className="edu-card-top">
                    <div
                      className={`edu-icon-wrap${ongoing ? ' edu-icon-wrap--active' : ''}`}
                      aria-hidden="true"
                    >
                      <DegreeIcon degree={item.degree} />
                    </div>

                    <div className="edu-date-badge-wrap">
                      <span className="edu-date-badge">
                        {item.startYear} – {ongoing ? 'Present' : item.endYear}
                      </span>
                      {ongoing && (
                        <span className="edu-ongoing-pill">
                          <span className="edu-ongoing-dot" />
                          Ongoing
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Degree */}
                  <h3 className="edu-degree">{item.degree}</h3>

                  {/* Institute */}
                  <p className="edu-institute">{item.institute}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

    </div>
  </section>
);

export default Education;
