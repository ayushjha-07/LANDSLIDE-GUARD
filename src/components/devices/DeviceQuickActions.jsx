import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Map, AlertTriangle, BrainCircuit } from 'lucide-react';
import Card from '../common/Card';

export const DeviceQuickActions = () => {
  const actions = [
    { title: 'View Sensors', path: '/sensors', icon: Activity, desc: 'Real-time pore pressure & geotechnical readings' },
    { title: 'Open Map', path: '/map', icon: Map, desc: 'Geospatial slope coordinates & terrain overlay' },
    { title: 'View Alerts', path: '/alerts', icon: AlertTriangle, desc: 'Early warning thresholds & community dispatches' },
    { title: 'Risk Analysis', path: '/risk-analysis', icon: BrainCircuit, desc: 'Random Forest hazard scoring & temporal LSTM' }
  ];

  return (
    <Card title="Operational Quick Actions" subtitle="Rapid navigation across system monitoring centers" className="w-full min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {actions.map((act, idx) => {
          const Icon = act.icon;
          return (
            <Link
              key={idx}
              to={act.path}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748] hover:border-forest-500 dark:hover:border-forest-400 transition-all group flex items-start gap-3 min-w-0"
            >
              <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] text-forest-600 dark:text-nature-400 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0 shadow-soft">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs sm:text-sm text-[#1A202C] dark:text-white group-hover:text-forest-600 dark:group-hover:text-nature-400 transition-colors truncate">
                  {act.title} &rarr;
                </div>
                <div className="text-[11px] text-[#718096] dark:text-slate-400 line-clamp-2 mt-0.5">
                  {act.desc}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default DeviceQuickActions;
