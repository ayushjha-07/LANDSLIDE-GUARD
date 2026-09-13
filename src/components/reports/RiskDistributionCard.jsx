import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Card from '../common/Card';
import { PieChart as PieIcon } from 'lucide-react';

export const RiskDistributionCard = ({ distribution }) => {
  // Ensure Offline node is NEVER counted as Safe
  const {
    safe = 5,
    warning = 1,
    highRisk = 1,
    critical = 0,
    offline = 1
  } = distribution || {};

  const chartData = [
    { name: 'Safe', count: safe, color: '#38A169', desc: 'Normal baseline stability' },
    { name: 'Warning', count: warning, color: '#D97706', desc: 'Moisture accumulation (Node 03)' },
    { name: 'High Risk', count: highRisk, color: '#EA580C', desc: 'Heavy rainfall & creep (Node 05)' },
    { name: 'Critical', count: critical, color: '#DC2626', desc: 'Emergency threshold' },
    { name: 'Offline', count: offline, color: '#718096', desc: 'RF link timeout (Node 06)' }
  ];

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <PieIcon className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Risk Distribution
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#718096] dark:text-[#A0AEC0]">
          8 Deployed Stations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        {/* Donut Chart */}
        <div className="h-44 w-full min-w-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData.filter(d => d.count > 0)}
                dataKey="count"
                nameKey="name"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={3}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A202C',
                  borderColor: '#2D3748',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
                formatter={(val, name) => [`${val} Station(s)`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-bold font-heading text-[#1A202C] dark:text-white leading-none">
              {safe + warning + highRisk + critical + offline}
            </span>
            <span className="text-[10px] text-[#718096] dark:text-[#A0AEC0] uppercase tracking-wider font-semibold mt-0.5">
              Total Nodes
            </span>
          </div>
        </div>

        {/* Legend Breakdown */}
        <div className="space-y-2 text-xs">
          {chartData.map(item => (
            <div key={item.name} className="flex items-center justify-between p-1.5 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0]/80 dark:border-[#2D3748]">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></span>
                <span className="font-semibold text-[#1A202C] dark:text-white truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-mono font-bold text-[#1A202C] dark:text-white text-sm">
                  {item.count}
                </span>
                <span className="text-[10px] text-[#718096]">
                  ({Math.round((item.count / 8) * 100)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] flex items-center justify-between">
        <span className="font-medium text-amber-600 dark:text-amber-400">Node 06 isolated as Offline</span>
        <span className="italic">Excludes non-reporting stations</span>
      </div>
    </Card>
  );
};

export default RiskDistributionCard;
