import React from 'react';
import { 
  LayoutDashboard, 
  BellRing, 
  Mail, 
  Smartphone, 
  Volume2, 
  Info, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import Card from '../common/Card';
import { NOTIFICATION_CHANNELS } from '../../data/mockAlerts';

export const NotificationChannels = () => {
  const iconMap = {
    LayoutDashboard,
    BellRing,
    Mail,
    Smartphone,
    Volume2
  };

  return (
    <Card 
      title="Notification Channels" 
      subtitle="Dispatch readiness for early warning broadcasts"
      className="p-4 sm:p-5"
    >
      <div className="space-y-3 pt-1">
        {NOTIFICATION_CHANNELS.map(ch => {
          const Icon = iconMap[ch.icon] || BellRing;
          const isActive = ch.status === 'Active';
          const isHardware = ch.status === 'Hardware Integration Later';

          return (
            <div 
              key={ch.name}
              className="p-3 rounded-xl border border-stone-200/80 dark:border-forest-800/80 bg-stone-50/50 dark:bg-forest-950/30 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                    : isHardware
                      ? 'bg-stone-200/70 dark:bg-forest-900/60 text-stone-500 dark:text-stone-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-stone-900 dark:text-white truncate">
                    {ch.name}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400 truncate">
                    {ch.description}
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                {isActive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                ) : isHardware ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-stone-200/80 dark:bg-forest-900 text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-forest-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                    Hardware Later
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Prototype
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Mandatory Prompt Label */}
        <div className="pt-2 p-2.5 rounded-xl bg-forest-50/60 dark:bg-forest-950/40 border border-forest-200/60 dark:border-forest-800/40 flex items-start gap-2 text-[11px] text-forest-800 dark:text-forest-300">
          <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-forest-600 dark:text-nature-400" />
          <span>
            <strong>Prototype Status:</strong> Notification integrations are planned for a later stage.
          </span>
        </div>
      </div>
    </Card>
  );
};

export default NotificationChannels;
