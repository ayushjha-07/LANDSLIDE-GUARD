import React from 'react';
import { Clock, Activity, AlertTriangle, ShieldCheck, CloudRain } from 'lucide-react';
import Card from '../common/Card';
import { useAlertContext } from '../../context/AlertContext';

export const AlertTimeline = () => {
  const { timeline } = useAlertContext();

  const getDotStyle = (type) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500 ring-4 ring-red-500/20';
      case 'high':
        return 'bg-orange-500 ring-4 ring-orange-500/20';
      case 'warning':
      case 'advisory':
        return 'bg-amber-500 ring-4 ring-amber-500/20';
      case 'safe':
      default:
        return 'bg-nature-500 ring-4 ring-nature-500/20';
    }
  };

  return (
    <Card 
      title="Recent Warning Activity" 
      subtitle="Chronological log of threshold events and sensor transitions"
      className="p-4 sm:p-5"
    >
      <div className="relative pl-6 space-y-4 pt-1 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-stone-200 dark:before:bg-forest-800">
        {timeline.map((item, idx) => (
          <div key={`${item.time}-${idx}`} className="relative group">
            {/* Timeline Dot */}
            <div className={`absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 ${getDotStyle(item.type)}`} />

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-stone-500 dark:text-stone-400">
                  {item.time}
                </span>
                <span className="text-stone-300 dark:text-stone-700">&bull;</span>
                <span className="text-xs font-bold text-stone-900 dark:text-white">
                  {item.event}
                </span>
              </div>
              {item.details && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-snug">
                  {item.details}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertTimeline;
