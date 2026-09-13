import React from 'react';
import { Search, X, MapPin, Navigation } from 'lucide-react';
import { HIMACHAL_PLACES } from './MapFilterBar';

export const MapSearchBar = ({
  searchQuery,
  onSearchChange,
  onSelectPlace,
  onSelectNodeById,
  className = ""
}) => {
  // Matching Himachal places (e.g. Manali, Kullu, Spiti)
  const matchingPlaces = searchQuery.trim().length >= 2 
    ? HIMACHAL_PLACES.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase().trim())).slice(0, 4)
    : [];

  const handleInputChange = (e) => {
    const val = e.target.value;
    onSearchChange(val);

    // If typing matches a node ID directly (e.g. "NODE-05" or "05"), auto-focus it
    const upper = val.toUpperCase().trim();
    if (upper.startsWith('NODE-') || upper.startsWith('NODE ') || /^0[1-8]$/.test(upper)) {
      const standardId = upper.startsWith('NODE-') ? upper : (upper.startsWith('NODE ') ? upper.replace('NODE ', 'NODE-0') : `NODE-${upper}`);
      if (onSelectNodeById) onSelectNodeById(standardId);
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search location (e.g. Manali, Kullu, Spiti) or node ID (e.g. NODE-05)..."
          className="w-full min-h-[42px] pl-10 pr-9 py-2 rounded-xl bg-[#0f172a]/95 dark:bg-[#0b1319]/95 border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#10b981]/40 focus:border-[#10b981] shadow-lg transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-white rounded-md transition-colors"
            title="Clear search"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Place Suggestions Fly-out */}
      {matchingPlaces.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0f172a]/95 dark:bg-[#0b1319]/95 border border-stone-800 rounded-xl shadow-2xl z-[1050] p-1.5 divide-y divide-stone-800 backdrop-blur-md">
          <div className="px-2.5 py-1 text-[10px] font-mono uppercase text-stone-400 font-bold">
            Himachal Geographic Places
          </div>
          {matchingPlaces.map(place => (
            <button
              key={place.name}
              type="button"
              onClick={() => {
                if (onSelectPlace) onSelectPlace(place);
              }}
              className="w-full px-2.5 py-2 text-left text-xs hover:bg-white/10 rounded-lg flex items-center justify-between text-stone-200 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                <span className="font-semibold text-white">{place.name}</span>
                <span className="text-[10px] text-stone-400">({place.type})</span>
              </div>
              <Navigation className="w-3.5 h-3.5 text-stone-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapSearchBar;
