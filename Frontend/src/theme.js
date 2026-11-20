import { useSyncExternalStore } from 'react';

// Single source of truth for the colour theme.
// The theme is the `data-theme` attribute on <html>; every colour in the app is a
// CSS variable defined for that attribute in index.css. The same logic runs in the
// inline script in index.html so the correct theme is applied before first paint.
const STORAGE_KEY = 'theme';
const listeners = new Set();

const read = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

let current = typeof document !== 'undefined'
  ? (document.documentElement.getAttribute('data-theme') || read())
  : 'dark';

export function applyTheme(theme) {
  current = theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', current);
  try {
    localStorage.setItem(STORAGE_KEY, current);
  } catch {
    /* storage unavailable (private mode) — theme still applies for this visit */
  }
  listeners.forEach((l) => l());
}

export const toggleTheme = () => applyTheme(current === 'dark' ? 'light' : 'dark');

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current, () => 'dark');
  return { theme, isDark: theme === 'dark', toggleTheme };
}
