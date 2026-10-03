import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolioData';
import './Projects.css';

/* ─────────────────────────────────────
   SVG Mockup Components
───────────────────────────────────── */
const JobPortalMockup = () => (
  <div className="mockup-wrap" aria-label="Job Portal UI preview">
    <div className="mockup-bar">
      <span /><span /><span />
    </div>
    <div className="mockup-body mockup-jobportal">
      {/* Top nav */}
      <div className="mock-nav">
        <div className="mock-logo" />
        <div className="mock-nav-links">
          <div className="mock-link active" />
          <div className="mock-link" />
          <div className="mock-link" />
        </div>
        <div className="mock-btn-sm" />
      </div>
      {/* Search bar */}
      <div className="mock-search-row">
        <div className="mock-search-box">
          <div className="mock-search-icon">🔍</div>
          <div className="mock-search-text" />
        </div>
        <div className="mock-search-filter" />
        <div className="mock-search-submit" />
      </div>
      {/* Job cards */}
      <div className="mock-job-grid">
        {[
          { color: '#1e90ff' },
          { color: '#e52e71' },
          { color: '#38a169' },
        ].map((j, i) => (
          <div key={i} className="mock-job-card">
            <div className="mock-job-logo" style={{ background: j.color }} />
            <div className="mock-job-info">
              <div className="mock-job-title" />
              <div className="mock-job-company" />
            </div>
            <div className="mock-job-badge" style={{ borderColor: j.color, color: j.color }}>Apply</div>
          </div>
        ))}
      </div>
      {/* Status tracker */}
      <div className="mock-tracker">
        <div className="mock-tracker-label">Application Status</div>
        <div className="mock-tracker-steps">
          {['Applied', 'Reviewed', 'Interview', 'Offer'].map((s, i) => (
            <div key={s} className={`mock-step ${i < 2 ? 'done' : i === 2 ? 'active' : ''}`}>
              <div className="mock-step-dot" />
              <div className="mock-step-label">{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CertMockup = () => (
  <div className="mockup-wrap" aria-label="Certificate System UI preview">
    <div className="mockup-bar">
      <span /><span /><span />
    </div>
    <div className="mockup-body mockup-cert">
      {/* Upload zone */}
      <div className="mock-upload">
        <div className="mock-upload-icon">📄</div>
        <div className="mock-upload-text">
          <div className="mock-line w80" />
          <div className="mock-line w50" />
        </div>
        <div className="mock-upload-btn">Upload Excel</div>
      </div>
      {/* Certificate preview */}
      <div className="mock-cert-preview">
        <div className="mock-cert-border">
          <div className="mock-cert-title" />
          <div className="mock-cert-name" />
          <div className="mock-cert-body">
            <div className="mock-line w90" />
            <div className="mock-line w70" />
          </div>
          <div className="mock-cert-footer">
            <div className="mock-cert-sig" />
            <div className="mock-cert-qr">
              <div className="mock-qr-inner">QR</div>
            </div>
          </div>
        </div>
      </div>
      {/* Verify row */}
      <div className="mock-verify-row">
        <div className="mock-verify-input">
          <div className="mock-line w60" />
        </div>
        <div className="mock-verify-badge">✅ Verified</div>
      </div>
    </div>
  </div>
);

const MOCKUPS = { 'job-portal': JobPortalMockup, 'certificate-system': CertMockup };

/* ─────────────────────────────────────
   Architecture Diagram
───────────────────────────────────── */
const ARCH_TIPS = {
  'React.js (Frontend)':   'Responsive UI — component-based architecture with optimised rendering.',
  'REST API Layer':         'Clean RESTful endpoints with resource-based routing and validation.',
  'Node.js + Express.js':  'Lightweight, event-driven backend handling business logic and auth.',
  'MySQL Database':         'Relational schema with indexed queries and integrity constraints.',
};

const ArchDiagram = ({ layers }) => (
  <div className="arch-diagram" role="list" aria-label="Architecture layers">
    {layers.map((layer, i) => (
      <React.Fragment key={layer}>
        <motion.div
          className="arch-layer"
          role="listitem"
          tabIndex={0}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          title={ARCH_TIPS[layer]}
        >
          <span className="arch-layer-name">{layer}</span>
          <span className="arch-layer-tip">{ARCH_TIPS[layer]}</span>
        </motion.div>
        {i < layers.length - 1 && (
          <motion.div
            className="arch-arrow"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.12 + 0.1, duration: 0.3 }}
            aria-hidden="true"
          >
            <div className="arch-arrow-line" />
            <div className="arch-arrow-head">↓</div>
          </motion.div>
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ─────────────────────────────────────
   Workflow Steps
───────────────────────────────────── */
const Workflow = ({ steps }) => (
  <div className="workflow" role="list" aria-label="Project workflow">
    {steps.map((step, i) => (
      <React.Fragment key={step.label}>
        <motion.div
          className="workflow-step"
          role="listitem"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <span className="workflow-icon" aria-hidden="true">{step.icon}</span>
          <span className="workflow-label">{step.label}</span>
        </motion.div>
        {i < steps.length - 1 && (
          <motion.div
            className="workflow-connector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 + 0.15 }}
            aria-hidden="true"
          >↓</motion.div>
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ─────────────────────────────────────
   Case Study Modal
───────────────────────────────────── */
const CaseStudyModal = ({ project, onClose }) => {
  const cs = project.caseStudy;

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${project.title}`}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
      >
        {/* Modal header */}
        <div className="modal-header">
          <div>
            <span className="modal-label">Case Study</span>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close case study"
          >✕</button>
        </div>

        <div className="modal-body">
          {/* Tech badges */}
          <div className="modal-tech-row">
            {project.techStack.map((t) => (
              <span key={t} className="modal-tech-badge">{t}</span>
            ))}
          </div>

          {/* Problem & Solution */}
          <div className="modal-grid-two">
            <div className="modal-card">
              <h3 className="modal-section-heading">🔍 Problem</h3>
              <p className="modal-text">{cs.problem}</p>
            </div>
            <div className="modal-card">
              <h3 className="modal-section-heading">💡 Solution</h3>
              <p className="modal-text">{cs.solution}</p>
            </div>
          </div>

          {/* Architecture + Workflow side by side */}
          <div className="modal-grid-two">
            <div className="modal-card">
              <h3 className="modal-section-heading">🏗 Architecture</h3>
              <ArchDiagram layers={cs.architecture} />
            </div>
            <div className="modal-card">
              <h3 className="modal-section-heading">🔄 Workflow</h3>
              <Workflow steps={cs.workflow} />
            </div>
          </div>

          {/* Engineering details */}
          <div className="modal-card">
            <h3 className="modal-section-heading">⚙️ Engineering Details</h3>
            <ul className="modal-detail-list">
              {cs.engineeringDetails.map((d, i) => (
                <motion.li
                  key={i}
                  className="modal-detail-item"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <span className="modal-detail-dot" aria-hidden="true" />
                  {d}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="modal-card modal-outcome">
            <h3 className="modal-section-heading">🎯 Outcome</h3>
            <p className="modal-text">{cs.outcome}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   Tech badge colours
───────────────────────────────────── */
const TECH_COLORS = {
  'React.js':   '#61dafb',
  'Node.js':    '#68d391',
  'Express.js': '#a0aec0',
  'MySQL':      '#f6ad55',
};

/* ─────────────────────────────────────
   Project Card
───────────────────────────────────── */
const ProjectCard = ({ project, index, onCaseStudy }) => {
  const MockupComp = MOCKUPS[project.id];
  return (
    <motion.article
      className={`project-card ${index % 2 === 1 ? 'project-card--reverse' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.1 }}
      aria-label={project.title}
    >
      {/* Mockup visual */}
      <motion.div
        className="project-visual"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {MockupComp && <MockupComp />}
      </motion.div>

      {/* Content */}
      <div className="project-content">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        {/* Tech stack */}
        <div className="project-tech-row" aria-label="Technologies used">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="project-tech-badge"
              style={{ '--tech-color': TECH_COLORS[tech] ?? '#a0aec0' }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Key features */}
        <ul className="project-features" aria-label="Key features">
          {project.features.map((f, i) => (
            <motion.li
              key={i}
              className="project-feature"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <span className="feature-dot" aria-hidden="true" />
              {f}
            </motion.li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="project-actions">
          <button
            className="btn-case-study"
            onClick={() => onCaseStudy(project)}
            aria-label={`View case study for ${project.title}`}
          >
            View Case Study
            <motion.span
              className="btn-arrow"
              whileHover={{ x: 4 }}
              aria-hidden="true"
            >→</motion.span>
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.11.793-.26.793-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013-.404 11.5 11.5 0 013 .404c2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.372.823 1.102.823 2.222v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              aria-label={`Live demo for ${project.title}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────
   Projects Section (root)
───────────────────────────────────── */
const FILTERS = ['All', 'Full Stack'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [caseStudyProject, setCaseStudyProject] = useState(null);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const closeCaseStudy = useCallback(() => setCaseStudyProject(null), []);

  return (
    <section id="projects" className="projects-section" aria-label="Projects">
      <div className="container projects-wrapper">

        {/* Section header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="projects-label">Portfolio</span>
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            End-to-end full-stack applications built from requirements through deployment.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="projects-filter"
          role="tablist"
          aria-label="Filter projects"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Project list */}
        <AnimatePresence mode="wait">
          <div className="projects-list" key={activeFilter}>
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onCaseStudy={setCaseStudyProject}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {caseStudyProject && (
          <CaseStudyModal
            project={caseStudyProject}
            onClose={closeCaseStudy}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
