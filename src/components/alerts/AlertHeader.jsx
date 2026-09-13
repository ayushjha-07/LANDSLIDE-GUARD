import React, { useState } from 'react';
import { Radio, Volume2, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AlertHeader = () => {
  const { toast } = useToast();
  const [broadcasting, setBroadcasting] = useState(false);

  const handleTestBroadcast = () => {
    setBroadcasting(true);
    toast.warning("Emergency LoRa payload transmitted on 868.1 MHz (Prototype Simulation).", "LoRa Siren Broadcast");
    setTimeout(() => {
      setBroadcasting(false);
    }, 4000);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Breadcrumb & Environment Status */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 dark:text-stone-400">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 font-mono">
          <span>Home</span>
          <span>/</span>
          <span className="text-forest-600 dark:text-nature-400 font-semibold">Alerts</span>
        </nav>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            ● Alert System Active
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-100 dark:bg-forest-900/60 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-forest-800">
            Prototype Simulation
          </span>
        </div>
      </div>

      {/* Main Page Title and Siren Broadcast Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold font-heading text-stone-900 dark:text-white tracking-tight">
            Alerts &amp; Early Warning
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Monitor, investigate and manage landslide risk alerts
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0 w-full sm:w-auto">
          <button 
            type="button"
            onClick={handleTestBroadcast}
            aria-label="Test LoRa Siren Broadcast"
            className={`min-h-[44px] w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 ${
              broadcasting
                ? 'bg-amber-600 text-white'
                : 'bg-stone-900 hover:bg-stone-800 dark:bg-forest-800 dark:hover:bg-forest-700 text-white'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${broadcasting ? 'animate-bounce' : ''}`} />
            <span>{broadcasting ? "LoRa Siren Beacon Transmitted!" : "Test LoRa Siren Broadcast"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertHeader;
