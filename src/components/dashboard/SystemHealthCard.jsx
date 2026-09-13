import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Card from '../common/Card';
import { SYSTEM_HEALTH_SUBSYSTEMS } from '../../data/dashboardData';

export const SystemHealthCard = () => {
  return (
    <Card 
      title="System Health" 
      subtitle="Subsystem diagnostics & watchdog state"
      className="min-w-0 flex flex-col justify-between"
    >
      <div className="divide-y divide-stone-100 dark:divide-forest-900/40 text-xs">
        {SYSTEM_HEALTH_SUBSYSTEMS.map((sub, i) => (
          <div key={i} className="py-2.5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-stone-800 dark:text-stone-200">{sub.name}</div>
              <div className="text-[10px] text-stone-400">{sub.note}</div>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-nature-600 dark:text-nature-400 bg-nature-500/10 px-2 py-0.5 rounded-full border border-nature-500/20">
              <CheckCircle2 className="w-3 h-3 text-nature-500" />
              {sub.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SystemHealthCard;
