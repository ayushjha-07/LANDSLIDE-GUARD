import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = ({ className = "" }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="header-theme-toggle"
      type="button"
      onClick={toggleTheme}
      className={`relative min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 
        text-stone-600 dark:text-stone-300 
        hover:bg-stone-200/70 dark:hover:bg-forest-900/60 
        hover:text-forest-700 dark:hover:text-nature-400
        border border-stone-200/60 dark:border-forest-800/60
        focus:outline-none focus:ring-2 focus:ring-forest-500/50 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-forest-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
