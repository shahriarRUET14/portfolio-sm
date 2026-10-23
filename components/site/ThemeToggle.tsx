'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from '../icons';

type Theme = 'dark' | 'light';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

const getServerTheme = (): Theme => 'dark';

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this visit.
  }
  listeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const next: Theme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex h-11 w-11 items-center justify-center text-muted transition-colors hover:text-fg"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
