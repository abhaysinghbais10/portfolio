import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { problemSolving, personalInfo } from '../data/portfolioData';
import './ProblemSolving.css';

/* ─────────────────────────────────────
   Animated counter hook
   Counts from 0 → target when in view.
───────────────────────────────────── */
const useCounter = (target, duration = 1800) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const rafRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const start = () => {
    if (started) return;
    setStarted(true);

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => rafRef.current && cancelAnimationFrame(rafRef.current), []);

  return [count, start];
};

/* ─────────────────────────────────────
   Java code snippet (syntactically valid,
   topic: Two-pointer / array illustration)
   Labelled as "code illustration"
───────────────────────────────────── */
const CODE_LINES = [
  { t: 'comment',  v: '// Two-pointer approach — code illustration' },
  { t: 'keyword',  v: 'public int[]' },
  { t: 'fn',       v: ' twoSum' },
  { t: 'plain',    v: '(int[] nums, int target) {' },
  { t: 'keyword',  v: '    Map' },
  { t: 'plain',    v: '<Integer, Integer> map = ' },
  { t: 'keyword',  v: 'new' },
  { t: 'plain',    v: ' HashMap<>();' },
  { t: 'keyword',  v: '    for' },
  { t: 'plain',    v: ' (int i = 0; i < nums.length; i++) {' },
  { t: 'keyword',  v: '        int' },
  { t: 'plain',    v: ' complement = target - nums[i];' },
  { t: 'keyword',  v: '        if' },
  { t: 'plain',    v: ' (map.containsKey(complement)) {' },
  { t: 'keyword',  v: '            return new int' },
  { t: 'plain',    v: '[]{ map.get(complement), i };' },
  { t: 'plain',    v: '        }' },
  { t: 'plain',    v: '        map.put(nums[i], i);' },
  { t: 'plain',    v: '    }' },
  { t: 'keyword',  v: '    return new int' },
  { t: 'plain',    v: '[]{ -1, -1 };' },
  { t: 'plain',    v: '}' },
];

/* Render a single code line with tokens */
const CodeLine = ({ line, lineNum }) => {
  const cls = {
    comment: 'code-comment',
    keyword: 'code-keyword',
    fn:      'code-fn',
    plain:   'code-plain',
  };
  return (
    <div className="code-line">
      <span className="code-lineno">{lineNum}</span>
      <span className={cls[line.t] ?? 'code-plain'}>{line.v}</span>
    </div>
  );
};

/* ─────────────────────────────────────
   Code editor panel — reveals lines
   progressively once, then stays.
───────────────────────────────────── */
const CodePanel = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const timerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const reveal = () => {
    if (triggered) return;
    setTriggered(true);

    if (prefersReducedMotion) {
      setVisibleLines(CODE_LINES.length);
      return;
    }

    let idx = 0;
    const next = () => {
      idx += 1;
      setVisibleLines(idx);
      if (idx < CODE_LINES.length) {
        timerRef.current = setTimeout(next, 55);
      }
    };
    timerRef.current = setTimeout(next, 400);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <motion.div
      className="code-panel"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onViewportEnter={reveal}
      role="region"
      aria-label="Code illustration — Two-pointer algorithm in Java"
    >
      {/* Editor chrome */}
      <div className="code-panel-bar">
        <div className="code-dots">
          <span /><span /><span />
        </div>
        <span className="code-filename">TwoSum.java</span>
        <span className="code-badge">illustration</span>
      </div>

      {/* Code body */}
      <div className="code-body" aria-hidden="true">
        {CODE_LINES.slice(0, visibleLines).map((line, i) => (
          <CodeLine key={i} line={line} lineNum={i + 1} />
        ))}
        {/* Blinking cursor while typing */}
        {visibleLines < CODE_LINES.length && triggered && (
          <span className="code-cursor" aria-hidden="true">▌</span>
        )}
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────
   DSA concept tags
   — labelled as general CS concepts,
     NOT personal problem counts.
───────────────────────────────────── */
const DSA_CONCEPTS = [
  'Arrays', 'Strings', 'Hash Maps',
  'Binary Search', 'Sorting', 'Two Pointers',
  'Linked Lists', 'Stacks & Queues', 'Trees',
  'Recursion', 'Dynamic Programming', 'Graphs',
];

/* ─────────────────────────────────────
   Section
───────────────────────────────────── */
const ProblemSolving = () => {
  const [count, startCount] = useCounter(problemSolving.leetCodeSolved, 1800);

  return (
    <section
      id="problem-solving"
      className="ps-section"
      aria-label="Problem Solving and DSA"
    >
      {/* Subtle bg grid */}
      <div className="ps-grid-bg" aria-hidden="true" />

      <div className="container ps-wrapper">

        {/* Header */}
        <motion.div
          className="ps-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="ps-label">DSA</span>
          <h2 className="ps-title">Problem Solving</h2>
          <p className="ps-subtitle">
            Consistent practice building strong algorithmic thinking and data-structure fundamentals.
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="ps-content">

          {/* Left — stat + info */}
          <div className="ps-left">

            {/* Big counter card */}
            <motion.div
              className="ps-stat-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              onViewportEnter={startCount}
            >
              <div className="ps-stat-number" aria-label={`${problemSolving.leetCodeSolved} plus LeetCode problems solved`}>
                <span className="ps-count">{count}</span>
                <span className="ps-plus">+</span>
              </div>
              <div className="ps-stat-label">Problems Solved</div>
              <div className="ps-stat-platform">
                {/* LeetCode wordmark-style */}
                <span className="ps-platform-icon" aria-hidden="true">⚡</span>
                <span className="ps-platform-name">LeetCode</span>
              </div>

              {/* LeetCode link — only renders if real URL exists */}
              {personalInfo.leetcode && (
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ps-leetcode-link"
                  aria-label="View LeetCode profile"
                >
                  View LeetCode Profile →
                </a>
              )}
            </motion.div>

            {/* Supporting info cards */}
            <div className="ps-info-cards">
              {[
                {
                  icon: '🧩',
                  heading: 'Consistent Practice',
                  body: 'Regular problem-solving sessions targeting algorithmic efficiency and edge-case handling.',
                },
                {
                  icon: '📐',
                  heading: 'Core CS Foundations',
                  body: 'Strong grounding in data structures and algorithms — supporting both academic and professional work.',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  className="ps-info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <span className="ps-info-icon" aria-hidden="true">{card.icon}</span>
                  <div>
                    <h3 className="ps-info-heading">{card.heading}</h3>
                    <p className="ps-info-body">{card.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* DSA concept cloud */}
            <motion.div
              className="ps-concepts"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              aria-label="General DSA concept areas"
            >
              <p className="ps-concepts-label">
                Concept areas practiced — <em>not individual problem counts</em>
              </p>
              <div className="ps-concepts-grid">
                {DSA_CONCEPTS.map((concept, i) => (
                  <motion.span
                    key={concept}
                    className="ps-concept-tag"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    {concept}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — code editor panel */}
          <div className="ps-right">
            <CodePanel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolving;
