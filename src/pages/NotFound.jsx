import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="w-14 h-14 rounded-2xl bg-forest-50 dark:bg-forest-950/70 text-forest-600 dark:text-nature-400 border border-forest-200 dark:border-forest-800 flex items-center justify-center mb-4">
        <Compass className="w-7 h-7 animate-pulse" />
      </div>
      <h2 className="text-2xl font-bold font-heading text-stone-900 dark:text-white">
        Coordinate / Sector Not Found
      </h2>
      <p className="text-sm text-stone-500 dark:text-stone-400 max-w-sm mt-1 mb-6">
        The requested monitoring sector or telemetry resource does not exist or has been relocated.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-semibold shadow-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Operational Dashboard</span>
      </Link>
    </div>
  );
};

export default NotFound;
