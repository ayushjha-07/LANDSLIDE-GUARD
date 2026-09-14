import React from 'react';
import { 
  Radio, 
  Wifi, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  BarChart2,
  Mountain
} from 'lucide-react';

export const SensorSummaryKpiCards = ({ summaryCounts = {} }) => {
  const total = summaryCounts.total ?? 8;
  const online = summaryCounts.online ?? 7;
  const offline = summaryCounts.offline ?? 1;
  const warning = summaryCounts.warning ?? 1;
  const highRisk = summaryCounts.highRisk ?? 1;
  const networkHealth = summaryCounts.networkHealth ?? '98.6%';

  const CARDS = [
    {
      id: 'total',
      label: 'TOTAL NODES',
      value: String(total).padStart(2, '0'),
      note: '8 stations deployed',
      icon: Radio,
      iconContainer: 'bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-500/35 text-sky-600 dark:text-sky-400',
      valueColor: 'text-slate-900 dark:text-white',
      miniBarColor: 'text-slate-400',
      type: 'mountain'
    },
    {
      id: 'online',
      label: 'ONLINE',
      value: String(online).padStart(2, '0'),
      note: 'Active uplink',
      icon: Wifi,
      iconContainer: 'bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/35 text-emerald-600 dark:text-emerald-400',
      valueColor: 'text-cyan-600 dark:text-cyan-400',
      miniBarColor: 'bg-emerald-500',
      type: 'bars'
    },
    {
      id: 'offline',
      label: 'OFFLINE',
      value: String(offline).padStart(2, '0'),
      note: 'Node 06 signal lost',
      icon: XCircle,
      iconContainer: 'bg-rose-50 dark:bg-slate-900 border border-rose-200 dark:border-slate-700 text-rose-500 dark:text-slate-400',
      valueColor: 'text-slate-900 dark:text-white',
      miniBarColor: 'bg-orange-400',
      type: 'bars'
    },
    {
      id: 'warning',
      label: 'WARNING',
      value: String(warning).padStart(2, '0'),
      note: 'Node 03 elevated',
      icon: AlertTriangle,
      iconContainer: 'bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-500/35 text-amber-600 dark:text-amber-400',
      valueColor: 'text-amber-500 dark:text-amber-400',
      miniBarColor: 'bg-amber-500',
      type: 'bars'
    },
    {
      id: 'highRisk',
      label: 'HIGH RISK',
      value: String(highRisk).padStart(2, '0'),
      note: 'Node 05 elevated',
      icon: ShieldAlert,
      iconContainer: 'bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-500/35 text-rose-600 dark:text-rose-400',
      valueColor: 'text-rose-600 dark:text-rose-400',
      miniBarColor: 'bg-rose-500',
      type: 'bars'
    },
    {
      id: 'networkHealth',
      label: 'NETWORK HEALTH',
      value: networkHealth,
      note: 'Packet delivery rate',
      icon: BarChart2,
      iconContainer: 'bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-500/35 text-teal-600 dark:text-teal-400',
      valueColor: 'text-cyan-600 dark:text-cyan-400',
      miniBarColor: 'bg-teal-500',
      type: 'bars'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white dark:bg-[#0c1626]/85 backdrop-blur-md border border-slate-200 dark:border-slate-800/80 shadow-xs dark:shadow-lg hover:shadow-md transition-all flex flex-col justify-between min-w-0"
          >
            {/* Top row: Icon + Label */}
            <div className="flex items-center gap-2 min-w-0 mb-1.5">
              <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 shadow-xs ${card.iconContainer}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-300 truncate">
                {card.label}
              </span>
            </div>

            {/* Middle row: Big Number + Mini Indicator Graphic */}
            <div className="flex items-baseline justify-between gap-1.5 my-1">
              <div className={`text-2xl sm:text-[26px] font-black font-mono tracking-tight leading-none ${card.valueColor}`}>
                {card.value}
              </div>

              {/* Mini Graphic on the right of the number */}
              {card.type === 'mountain' ? (
                <Mountain className="w-5 h-5 text-slate-400 dark:text-slate-500 shrink-0 opacity-70" />
              ) : (
                <div className="flex items-end gap-0.5 h-4 shrink-0 pb-0.5">
                  <span className={`w-1 h-1.5 rounded-xs ${card.miniBarColor}`} />
                  <span className={`w-1 h-2.5 rounded-xs ${card.miniBarColor}`} />
                  <span className={`w-1 h-3.5 rounded-xs ${card.miniBarColor}`} />
                  <span className={`w-1 h-4 rounded-xs ${card.miniBarColor}`} />
                </div>
              )}
            </div>

            {/* Bottom row: Subtext Note */}
            <div className="text-[10px] text-slate-400 dark:text-slate-400 truncate">
              {card.note}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SensorSummaryKpiCards;
