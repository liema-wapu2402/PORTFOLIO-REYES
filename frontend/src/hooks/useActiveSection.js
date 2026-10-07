import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently crossing the middle of the screen,
 * so the navbar can highlight the matching link.
 *
 * rootMargin "-40% 0px -55% 0px" shrinks the observed area to a thin band
 * just above the vertical centre: a section counts as "active" when it
 * overlaps that band.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
