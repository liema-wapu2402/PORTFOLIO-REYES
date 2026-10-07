/**
 * Smoothly scrolls to a section by its id (used by the navbar and hero buttons).
 *
 * The sections have `scroll-mt-20` in their class list. That sets
 * `scroll-margin-top`, which tells the browser to stop 5rem BEFORE the section
 * so the fixed navbar does not cover its heading.
 * Visitors who asked their OS for reduced motion get an instant jump instead.
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
