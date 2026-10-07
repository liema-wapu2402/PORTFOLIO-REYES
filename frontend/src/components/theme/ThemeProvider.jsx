import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ThemeContext } from './ThemeContext';

// Must match the key used by the inline script in index.html.
const STORAGE_KEY = 'aacr-theme';

/** The visitor's operating-system preference. */
function getSystemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** A saved choice wins; otherwise follow the operating system. */
function getInitialTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    /* localStorage can be blocked (private mode); fall through to the OS value. */
  }
  return getSystemTheme();
}

/**
 * ThemeProvider
 * -------------
 * Light or dark depending on the viewer:
 *   - first visit      -> follows the OS setting
 *   - after a toggle   -> remembers the visitor's explicit choice
 *   - no saved choice  -> keeps following the OS if it changes while the page is open
 *
 * HOW THE THEME REACHES THE CSS
 * We add or remove the class `dark` on <html>. In src/index.css:
 *   - `.dark { --background: ...; }` swaps every colour variable
 *   - `@custom-variant dark (&:is(.dark *))` makes Tailwind's `dark:` utilities
 *     apply under that class
 * No component needs to know which theme is active just to look right.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme);

  // True once the visitor has pressed the toggle (or a saved choice exists).
  const hasExplicitChoice = useRef(
    (() => {
      try {
        return localStorage.getItem(STORAGE_KEY) !== null;
      } catch {
        return false;
      }
    })()
  );

  // Apply the theme to the document whenever it changes.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Follow live OS changes, but only if the visitor has not chosen manually.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!hasExplicitChoice.current) setThemeState(getSystemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next) => {
    hasExplicitChoice.current = true;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore: the choice still works for this visit */
    }
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
