import { createContext } from 'react';

/**
 * Holds the current theme ("light" | "dark") and the functions that change it.
 * The provider lives in ThemeProvider.jsx, the hook in useTheme.js.
 */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});
