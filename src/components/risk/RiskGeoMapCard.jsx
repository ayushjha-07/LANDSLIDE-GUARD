import React, { useState } from 'react';
import { ShieldCheck, Plus, Minus, Crosshair } from 'lucide-react';
import riskMapImg from '../../assets/risk_map_full.jpg';

export const RiskGeoMapCard = () => {
  const [mapLayer, setMapLayer] = useState('Map');
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 1.0));
  const handleReset = () => setZoomLevel(1);

  return (
    <div className="bg-white dark:bg-[#0c121e] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-500 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 fill-emerald-500/20 text-emerald-500" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
            Geographical Risk Assessment
          </h2>
        </div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          Real-time sensor network and AI-derived risk zones
        </div>
      </div>

      {/* Map Display Container */}
      <div className="relative w-full flex-1 min-h-[300px] sm:min-h-[340px] rounded-xl overflow-hidden border border-slate-200/70 dark:border-slate-800 bg-slate-950 group select-none">
        {/* Map Image with zoom transform */}
        <div 
          className="w-full h-full transition-transform duration-300 ease-out origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img 
            src={riskMapImg} 
            alt="Geographical Risk Map" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Map Type Switcher Buttons (Top Left) */}
        <div className="absolute top-3 left-3 z-10 flex items-center bg-black/60 dark:bg-black/70 backdrop-blur-md p-0.5 rounded-lg border border-white/20 shadow-md">
          {['Map', 'Satellite', 'Terrain'].map((layer) => (
            <button
              key={layer}
              type="button"
              onClick={() => setMapLayer(layer)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                mapLayer === layer 
                  ? 'bg-white text-slate-900 font-semibold shadow-xs' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Zoom & Target Controls (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 flex flex-col gap-1.5">
          <div className="flex flex-col bg-black/60 dark:bg-black/70 backdrop-blur-md rounded-lg border border-white/20 shadow-md overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 text-white/90 hover:text-white hover:bg-white/15 transition-colors"
              title="Zoom In"
            >
              <Plus className="w-4 h-4" />
            </button>
            <div className="h-[1px] bg-white/15 w-full" />
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 text-white/90 hover:text-white hover:bg-white/15 transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-black/60 dark:bg-black/70 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:bg-white/15 shadow-md transition-colors w-fit"
            title="Recenter"
          >
            <Crosshair className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskGeoMapCard;
