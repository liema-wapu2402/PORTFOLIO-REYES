import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE } from '@/data/site';
import { cn } from '@/lib/utils';
import { scrollToSection } from '@/lib/scrollToSection';
import useActiveSection from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/theme';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
const NAV_IDS = NAV_LINKS.map((link) => link.id);

/**
 * Navbar
 * ------
 * Fixed at the top. Left: AACR monogram. Right: links, then the THEME TOGGLE
 * as the last item, which puts it in the top-right corner of the site.
 *
 * - Transparent over the hero, becomes frosted glass (.glass in index.css)
 *   after the page scrolls a little.
 * - On phones (< md = 768px) the links collapse into a menu button.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  // Switch to the glass style once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        // fixed + inset-x-0 + top-0 pins the bar to the top edge, full width.
        // z-40 keeps it above page content (the dock uses z-40 too, but sits at the bottom).
        'fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300',
        // Menu open: nearly opaque so page text cannot show through the links.
        // Scrolled: frosted glass (.glass). At the top of the page: fully transparent.
        open
          ? 'border-b border-border/60 bg-background/95 backdrop-blur-xl'
          : scrolled
            ? 'glass'
            : 'border-b border-transparent'
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Brand / monogram */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label={`${SITE.fullName}, back to top`}
          className="font-display text-lg font-semibold tracking-tight"
        >
          {SITE.initials}
          <span className="text-muted-foreground">.</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop links: hidden on phones, shown from md (768px) up */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-sm transition-colors duration-200',
                    active === link.id
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Theme toggle: the right-most item = top-right corner */}
          <ThemeToggle />
        </div>
      </nav>

      {/*
        Mobile menu panel. Smooth open/close without knowing the height:
          grid-rows-[0fr] -> the single row collapses to 0 height
          grid-rows-[1fr] -> the row takes its natural height
        Animating `grid-template-rows` between those two values slides the panel open.
        The inner div needs `overflow-hidden` + `min-h-0` so its content gets clipped
        while the row is collapsing.
      */}
      <div
        id="mobile-menu"
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out md:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-4 pt-1 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => go(e, link.id)}
                  // While the menu is closed the links are clipped but still exist, so tabIndex -1 keeps them out of keyboard focus.
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-base transition-colors',
                    active === link.id
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
