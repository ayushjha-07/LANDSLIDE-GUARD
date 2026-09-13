import React from 'react';
import Card from '../common/Card';
import { Lightbulb, Info, AlertTriangle, CheckCircle, Radio } from 'lucide-react';
import { generateRuleBasedInsights } from '../../utils/reportCalculations';

export const AutomatedInsightsCard = ({ nodes = [], alerts = [] }) => {
  const insights = generateRuleBasedInsights(nodes, alerts);

  const getBadgeStyle = (level) => {
    switch (level) {
      case 'warning':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/30';
      case 'alert':
        return 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/30';
      default:
        return 'bg-[#2B6CB0]/10 text-[#2B6CB0] dark:text-[#63B3ED] border-[#2B6CB0]/30';
    }
  };

  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#D97706] dark:text-[#FBBF24]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Automated Insights
          </h2>
        </div>
        <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
          Rule-Based Prototype Diagnostics
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map(item => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] flex flex-col justify-between space-y-2"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-bold text-[#1A202C] dark:text-white">
                  {item.title}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getBadgeStyle(item.level)}`}>
                  {item.tag}
                </span>
              </div>
              <p className="text-xs text-[#4A5568] dark:text-[#CBD5E0] leading-relaxed">
                {item.text}
              </p>
            </div>
            <div className="text-[10px] text-[#718096] dark:text-[#A0AEC0] italic pt-1 border-t border-[#E2E8F0]/60 dark:border-[#2D3748]/60">
              Evaluated from current simulated telemetry matrix
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] italic">
        These are deterministic rule-based prototype observations, not conclusions from a trained AI model.
      </div>
    </Card>
  );
};

export default AutomatedInsightsCard;
