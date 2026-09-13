import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, WifiOff, Activity } from 'lucide-react';
import Card from '../common/Card';
import { useAlertContext } from '../../context/AlertContext';

export const RiskDistributionCard = () => {
  const { riskDistribution } = useAlertContext();

  const total = 
    riskDistribution.safe + 
    riskDistribution.warning + 
    riskDistribution.highRisk + 
    riskDistribution.critical + 
    riskDistribution.offline;

  const categories = [
    { label: "Safe", count: riskDistribution.safe, color: "bg-forest-600 dark:bg-nature-500", textColor: "text-forest-700 dark:text-nature-400", bgLight: "bg-forest-500/10" },
    { label: "Warning", count: riskDistribution.warning, color: "bg-amber-500", textColor: "text-amber-600 dark:text-amber-400", bgLight: "bg-amber-500/10" },
    { label: "High Risk", count: riskDistribution.highRisk, color: "bg-orange-500", textColor: "text-orange-600 dark:text-orange-400", bgLight: "bg-orange-500/10" },
    { label: "Critical", count: riskDistribution.critical, color: "bg-red-500", textColor: "text-red-600 dark:text-red-400", bgLight: "bg-red-500/10" },
    { label: "Offline", count: riskDistribution.offline, color: "bg-stone-400 dark:bg-stone-600", textColor: "text-stone-600 dark:text-stone-400", bgLight: "bg-stone-500/10" },
  ];

  return (
    <Card 
      title="Current Risk Distribution" 
      subtitle="Node status breakdown across 8 monitoring stations"
      className="p-4 sm:p-5"
    >
      <div className="space-y-4 pt-1">
        {/* Multi-segment distribution bar */}
        <div className="h-3 w-full rounded-full bg-stone-100 dark:bg-forest-950 overflow-hidden flex shadow-inner">
          {categories.map(cat => {
            const pct = total > 0 ? (cat.count / total) * 100 : 0;
            if (pct === 0) return null;
            return (
              <div
                key={cat.label}
                style={{ width: `${pct}%` }}
                className={`h-full ${cat.color} transition-all duration-500`}
                title={`${cat.label}: ${cat.count} (${pct.toFixed(0)}%)`}
              />
            );
          })}
        </div>

        {/* Legend & Exact Dynamic Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {categories.map(cat => (
            <div 
              key={cat.label}
              className={`p-2 rounded-xl border border-stone-200/60 dark:border-forest-800/60 ${cat.bgLight} flex items-center justify-between`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  {cat.label}
                </span>
              </div>
              <span className={`font-mono text-xs font-bold ${cat.textColor}`}>
                {cat.count}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
          * Node 06 is classified as Offline and is excluded from Safe counts.
        </p>
      </div>
    </Card>
  );
};

export default RiskDistributionCard;
