import { Moon, Sun } from 'lucide-react';
import { useTheme } from './useTheme';

/**
 * ThemeToggle
 * -----------
 * A round sun/moon button. It is placed at the far right of the navbar
 * (top-right of the site, on desktop and mobile).
 *
 * HOW THE ICON SWAP WORKS (pure Tailwind, no JavaScript animation)
 * Both icons sit in the same spot (the Moon is `absolute`). The `dark:` variants
 * only apply while <html> has the `dark` class:
 *   Sun  : scale-100 rotate-0       -> dark:scale-0 dark:-rotate-90  (shrinks + spins away)
 *   Moon : scale-0 rotate-90        -> dark:scale-100 dark:rotate-0  (grows + spins in)
 * `transition-all duration-300` animates the change between those two states.
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-border bg-linear-to-br from-surface-from to-surface-to text-foreground shadow-sm transition duration-300 hover:border-ring/60 hover:shadow-md ${className}`}
    >
      <Sun className="size-[1.15rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-[1.15rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
    </button>
  );
}
