import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/portfolioData';
import './Achievements.css';

/* ─── Type badge colour map ─── */
const TYPE_STYLE = {
  Program:   { color: '#4299e1', bg: 'rgba(66,153,225,0.12)', border: 'rgba(66,153,225,0.3)' },
  Hackathon: { color: '#ed8936', bg: 'rgba(237,137,54,0.12)', border: 'rgba(237,137,54,0.3)' },
  Training:  { color: '#68d391', bg: 'rgba(104,211,145,0.12)', border: 'rgba(104,211,145,0.3)' },
  Certification: { color: '#b794f4', bg: 'rgba(183,148,244,0.12)', border: 'rgba(183,148,244,0.3)' },
};

/* ─── Issuer logo initials ─── */
const IssuerBadge = ({ issuer, color }) => {
  const initials = issuer
    .split(/[\s(/]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
  return (
    <div
      className="achievement-issuer-badge"
      style={{ '--badge-color': color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

/* ─── Single Achievement Card ─── */
const AchievementCard = ({ item, index }) => {
  const style = TYPE_STYLE[item.type] ?? TYPE_STYLE.Training;

  return (
    <motion.article
      className="achievement-card"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.22 } }}
      aria-label={item.title}
    >
      {/* Top row: issuer badge + type pill + year */}
      <div className="achievement-card-top">
        <IssuerBadge issuer={item.issuer} color={style.color} />
        <div className="achievement-card-meta">
          <span
            className="achievement-type-pill"
            style={{
              color: style.color,
              background: style.bg,
              borderColor: style.border,
            }}
          >
            {item.type}
          </span>
          {item.year && (
            <span className="achievement-year">{item.year}</span>
          )}
        </div>
      </div>

      {/* Icon + Title */}
      <div className="achievement-title-row">
        <span className="achievement-icon" aria-hidden="true">
          {item.icon}
        </span>
        <h3 className="achievement-title">{item.title}</h3>
      </div>

      {/* Issuer name */}
      <p className="achievement-issuer">
        <span aria-label="Issued by">Issued by</span>{' '}
        <strong>{item.issuer}</strong>
      </p>

      {/* Description */}
      <p className="achievement-description">{item.description}</p>

      {/* Credential link — only if real URL exists */}
      {item.credentialUrl && (
        <a
          href={item.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="achievement-credential-link"
          aria-label={`View credential for ${item.title}`}
        >
          View Credential
          <motion.span
            className="credential-arrow"
            whileHover={{ x: 4 }}
            aria-hidden="true"
          >
            →
          </motion.span>
        </a>
      )}

      {/* Glow accent */}
      <div
        className="achievement-glow"
        style={{ '--glow-color': style.color }}
        aria-hidden="true"
      />
    </motion.article>
  );
};

/* ─── Section ─── */
const Achievements = () => (
  <section id="achievements" className="achievements-section" aria-label="Achievements and certifications">
    <div className="container achievements-wrapper">

      {/* Header */}
      <motion.div
        className="achievements-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="achievements-label">Recognition</span>
        <h2 className="achievements-title">Achievements & Certifications</h2>
        <p className="achievements-subtitle">
          Continuous learning beyond the classroom — programs, training, and hackathons.
        </p>
      </motion.div>

      {/* Cards grid */}
      <div className="achievements-grid" role="list">
        {achievements.map((item, i) => (
          <AchievementCard key={item.id} item={item} index={i} />
        ))}
      </div>

    </div>
  </section>
);

export default Achievements;
