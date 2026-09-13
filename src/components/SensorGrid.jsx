import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import SensorCard from './SensorCard';

export const SensorGrid = ({ nodes, onViewDetails, onResetFilters }) => {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-2xl border-2 border-dashed border-stone-200 dark:border-forest-900/60 bg-white/50 dark:bg-forest-950/20 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-forest-900/40 text-stone-400 dark:text-stone-500 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold font-heading text-stone-900 dark:text-white">
          No sensor nodes found
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-xs mx-auto">
          Try changing your search or filters to see monitoring stations.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="mt-4 min-h-[44px] px-4 py-2 rounded-xl bg-forest-600 hover:bg-forest-500 text-white text-xs font-semibold inline-flex items-center gap-2 shadow-sm transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
      {nodes.map(node => (
        <SensorCard 
          key={node.id} 
          node={node} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};

export default SensorGrid;
