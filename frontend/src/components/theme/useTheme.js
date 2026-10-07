import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

/** Access the current theme and the toggle function from any component. */
export function useTheme() {
  return useContext(ThemeContext);
}
