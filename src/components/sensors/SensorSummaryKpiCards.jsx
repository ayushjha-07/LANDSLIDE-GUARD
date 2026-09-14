import React from 'react';
import { 
  Radio, 
  Wifi, 
  XCircle, 
  AlertTriangle, 
  ShieldAlert, 
  BarChart2
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
      label: 'Total Nodes',
      value: String(total).padStart(2, '0'),
      note: '8 stations deployed',
      icon: Radio,
      iconContainer: 'bg-emerald-950/70 border border-emerald-500/35 text-emerald-400',
      borderClass: 'border-slate-800/80 hover:border-slate-700'
    },
    {
      id: 'online',
      label: 'Online',
      value: String(online).padStart(2, '0'),
      note: '87.5% operational',
      icon: Wifi,
      iconContainer: 'bg-sky-950/70 border border-sky-500/35 text-sky-400',
      borderClass: 'border-slate-800/80 hover:border-slate-700'
    },
    {
      id: 'offline',
      label: 'Offline',
      value: String(offline).padStart(2, '0'),
      note: 'Node 06 signal lost',
      icon: XCircle,
      iconContainer: 'bg-slate-900 border border-slate-700 text-slate-400',
      borderClass: 'border-slate-800/80 hover:border-slate-700'
    },
    {
      id: 'warning',
      label: 'Warning',
      value: String(warning).padStart(2, '0'),
      note: '12.5% of nodes',
      icon: AlertTriangle,
      iconContainer: 'bg-amber-950/70 border border-amber-500/35 text-amber-400',
      borderClass: 'border-slate-800/80 hover:border-slate-700'
    },
    {
      id: 'highRisk',
      label: 'High Risk',
      value: String(highRisk).padStart(2, '0'),
      note: '12.5% of nodes',
      icon: ShieldAlert,
      iconContainer: 'bg-rose-950/70 border border-rose-500/35 text-rose-400',
      borderClass: 'border-slate-800/80 hover:border-slate-700'
    },
    {
      id: 'networkHealth',
      label: 'Network Health',
      value: networkHealth,
      note: 'Packet delivery rate',
      icon: BarChart2,
      iconContainer: 'bg-emerald-950/70 border border-emerald-500/35 text-emerald-400',
      borderClass: 'border-slate-800/80 hover:border-slate-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className={`p-2.5 sm:p-3 rounded-2xl bg-[#0c1626]/85 backdrop-blur-md border ${card.borderClass} shadow-lg transition-all flex items-center gap-2.5 min-w-0`}
          >
            {/* Left: Icon Container */}
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md ${card.iconContainer}`}>
              <Icon className="w-4.5 h-4.5" />
            </div>

            {/* Right: Metrics */}
            <div className="min-w-0 flex-1">
              <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white leading-none">
                {card.value}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-300 truncate mt-0.5">
                {card.label}
              </div>
              <div className="text-[9.5px] sm:text-[10px] text-slate-400 truncate">
                {card.note}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SensorSummaryKpiCards;
