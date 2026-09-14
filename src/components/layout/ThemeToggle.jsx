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
        text-slate-700 dark:text-slate-300 
        bg-white/80 dark:bg-slate-900/80 
        hover:bg-white dark:hover:bg-slate-800 
        hover:text-slate-900 dark:hover:text-white
        border border-slate-200/80 dark:border-slate-700/80
        shadow-xs dark:shadow-md
        focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;
