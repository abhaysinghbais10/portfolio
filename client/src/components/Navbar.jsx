import React, { useEffect, useState } from 'react';
import useScroll from '../hooks/useScroll';
import './Navbar.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const scrolled = useScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="container flex-center navbar-content">
        <div className="logo">
          <a href="#home" className="logo-link">Abhay</a>
        </div>
        <ul className={`nav-list ${menuOpen ? 'open' : ''}`} id="nav-menu" role="list">
          {navItems.map(item => (
            <li key={item.id} className="nav-item">
              <a href={`#${item.id}`} className="nav-link" onClick={handleLinkClick}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
        >
          <span className="hamburger-line" aria-hidden="true" />
          <span className="hamburger-line" aria-hidden="true" />
          <span className="hamburger-line" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
