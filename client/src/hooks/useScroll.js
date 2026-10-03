import { useEffect, useState } from 'react';

// Hook to track vertical scroll position
export default function useScroll() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 60);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 60;
      setScrolled((currentScrolled) => (
        currentScrolled === nextScrolled ? currentScrolled : nextScrolled
      ));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrolled;
}
