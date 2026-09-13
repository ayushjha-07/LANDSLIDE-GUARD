import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  MapPin, 
  Droplets, 
  CloudRain, 
  TrendingUp, 
  ExternalLink, 
  Map 
} from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { useAlertContext } from '../../context/AlertContext';

export const HighestRiskNodeCard = () => {
  const navigate = useNavigate();
  const { summary } = useAlertContext();
  const node = summary.highestNode;

  return (
    <Card 
      className="p-4 sm:p-5 border-orange-500/40 bg-gradient-to-br from-orange-500/5 via-white dark:via-forest-950 to-orange-500/10 dark:to-orange-950/20 ring-1 ring-orange-500/20"
    >
      <div className="space-y-3.5">
        {/* Header with Hazard Badge */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              Hazard Priority Surveillance
            </span>
            <h3 className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-white">
              Highest Current Risk
            </h3>
          </div>
          <StatusBadge status="High Risk" label="HIGH RISK" pulse />
        </div>

        {/* Node Name & Hazard Score */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-forest-900/60 border border-orange-200/80 dark:border-orange-900/40 shadow-xs">
          <div>
            <div className="font-mono font-bold text-sm sm:text-base text-stone-900 dark:text-white">
              {node?.id || node?.name || 'NODE-05'}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-orange-500" />
              <span>{node?.location?.name || node?.location || 'Mountain Zone C'}</span>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {node?.riskScore ?? node?.risk?.score ?? 68}
            </span>
            <span className="text-xs text-stone-400"> / 100</span>
          </div>
        </div>

        {/* Contributing Factors */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-400">
            Main contributing factors:
          </span>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-white/80 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800/40 text-center">
              <Droplets className="w-3.5 h-3.5 mx-auto text-nature-500" />
              <span className="text-[10px] text-stone-600 dark:text-stone-300 block mt-1">
                Soil Moisture
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/80 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800/40 text-center">
              <CloudRain className="w-3.5 h-3.5 mx-auto text-sky-500" />
              <span className="text-[10px] text-stone-600 dark:text-stone-300 block mt-1">
                Rainfall
              </span>
            </div>
            <div className="p-2 rounded-lg bg-white/80 dark:bg-forest-900/40 border border-stone-200/60 dark:border-forest-800/40 text-center">
              <TrendingUp className="w-3.5 h-3.5 mx-auto text-amber-500" />
              <span className="text-[10px] text-stone-600 dark:text-stone-300 block mt-1">
                Ground Tilt
              </span>
            </div>
          </div>
        </div>

        {/* Second Elevated Node Reference */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
            <span className="text-stone-700 dark:text-stone-300">
              Second Elevated Node: <strong className="text-stone-900 dark:text-white font-mono">Node 03</strong>
            </span>
          </div>
          <StatusBadge status="Warning" label="WARNING" />
        </div>

        {/* Navigation Action Buttons */}
        <div className="pt-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => navigate('/risk-analysis')}
            className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Risk Analysis</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/map')}
            className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-forest-900 hover:bg-stone-100 dark:hover:bg-forest-800 border border-stone-200 dark:border-forest-700 text-stone-800 dark:text-stone-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Map className="w-3.5 h-3.5 text-stone-500" />
            <span>View on Map</span>
          </button>
        </div>
      </div>
    </Card>
  );
};

export default HighestRiskNodeCard;
