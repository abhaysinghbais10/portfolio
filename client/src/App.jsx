import React from 'react';
import './styles/theme.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Achievements from './sections/Achievements';
import ProblemSolving from './sections/ProblemSolving';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <MotionConfig reducedMotion="user">
        <div className="app">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Achievements />
            <ProblemSolving />
            <Education />
            <Contact />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </Router>
  );
}

export default App;
