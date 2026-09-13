import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import Card from '../common/Card';
import { Bell, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ALERT_ANALYTICS_DATA } from '../../data/mockHistoricalData';

export const AlertAnalyticsCard = ({ activeCount = 2, resolvedCount = 3, acknowledgedCount = 1 }) => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Alert Analytics
          </h2>
        </div>
        <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
          Incident classification &amp; resolution lifecycle
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Severity Distribution */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-[#1A202C] dark:text-white uppercase tracking-wider">
            Alerts by Severity
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {ALERT_ANALYTICS_DATA.bySeverity.map(item => (
              <div 
                key={item.name} 
                className="p-3 rounded-xl border border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between"
                style={{ backgroundColor: item.bg }}
              >
                <div>
                  <span className="font-semibold block" style={{ color: item.color }}>{item.name}</span>
                  <span className="text-[10px] text-[#718096] dark:text-[#A0AEC0]">Dispatched</span>
                </div>
                <span className="text-xl font-bold font-mono" style={{ color: item.color }}>
                  {String(item.count).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>

          {/* Resolution Lifecycle */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold text-[#1A202C] dark:text-white uppercase tracking-wider mb-2">
              Alert Resolution
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-[#EA580C]/10 border border-[#EA580C]/30 text-[#EA580C]">
                <span className="text-[11px] block font-medium">Active</span>
                <span className="text-lg font-bold font-mono block mt-0.5">{String(activeCount).padStart(2, '0')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#D97706]/10 border border-[#D97706]/30 text-[#D97706]">
                <span className="text-[11px] block font-medium">Acknowledged</span>
                <span className="text-lg font-bold font-mono block mt-0.5">{String(acknowledgedCount).padStart(2, '0')}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#38A169]/10 border border-[#38A169]/30 text-[#38A169]">
                <span className="text-[11px] block font-medium">Resolved</span>
                <span className="text-lg font-bold font-mono block mt-0.5">{String(resolvedCount).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Over Time Chart */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-xs font-semibold text-[#1A202C] dark:text-white uppercase tracking-wider">
            Alerts Over Time (24 Hours)
          </h3>
          <div className="h-44 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ALERT_ANALYTICS_DATA.alertsOverTime} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="time" stroke="#718096" fontSize={10} tickLine={false} />
                <YAxis stroke="#718096" fontSize={10} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1A202C',
                    borderColor: '#2D3748',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="warnings" name="Warnings" fill="#D97706" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="highRisk" name="High Risk" fill="#EA580C" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-[#718096] dark:text-[#A0AEC0] italic pt-1 text-right">
            Simulated alert distribution. Response metrics based on automated protocol cycles.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default AlertAnalyticsCard;
