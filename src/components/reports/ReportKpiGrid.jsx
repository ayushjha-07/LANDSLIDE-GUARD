import React from 'react';
import { ShieldCheck, AlertTriangle, Bell, CheckCircle2, Droplets, Radio } from 'lucide-react';
import Card from '../common/Card';

export const ReportKpiGrid = ({ kpiData }) => {
  const {
    averageRisk = 24,
    averageRiskStatus = 'Safe',
    peakRisk = 68,
    peakNodeId = 'Node 05',
    totalAlerts = 5,
    resolvedAlerts = 3,
    averageMoisture = 46,
    networkAvailability = 98.6
  } = kpiData || {};

  const cards = [
    {
      id: 'kpi-avg-risk',
      title: 'Average Risk',
      value: `${averageRisk} / 100`,
      subtitle: `Status: ${averageRiskStatus}`,
      statusColor: 'text-[#38A169] dark:text-[#48BB78]',
      icon: ShieldCheck,
      iconBg: 'bg-[#38A169]/10 text-[#38A169] dark:bg-[#38A169]/20 dark:text-[#48BB78]',
      badge: 'Safe Baseline'
    },
    {
      id: 'kpi-peak-risk',
      title: 'Peak Risk',
      value: `${peakRisk} / 100`,
      subtitle: `Node: ${peakNodeId}`,
      statusColor: 'text-[#EA580C] dark:text-[#F97316]',
      icon: AlertTriangle,
      iconBg: 'bg-[#EA580C]/10 text-[#EA580C] dark:bg-[#EA580C]/20 dark:text-[#F97316]',
      badge: 'Zone C High'
    },
    {
      id: 'kpi-total-alerts',
      title: 'Total Alerts',
      value: String(totalAlerts).padStart(2, '0'),
      subtitle: 'Recorded Incidents',
      statusColor: 'text-[#D97706] dark:text-[#FBBF24]',
      icon: Bell,
      iconBg: 'bg-[#D97706]/10 text-[#D97706] dark:bg-[#D97706]/20 dark:text-[#FBBF24]',
      badge: '2 Active'
    },
    {
      id: 'kpi-resolved-alerts',
      title: 'Resolved Alerts',
      value: String(resolvedAlerts).padStart(2, '0'),
      subtitle: 'Remediated Events',
      statusColor: 'text-[#2B6CB0] dark:text-[#63B3ED]',
      icon: CheckCircle2,
      iconBg: 'bg-[#2B6CB0]/10 text-[#2B6CB0] dark:bg-[#2B6CB0]/20 dark:text-[#63B3ED]',
      badge: '60% Cleared'
    },
    {
      id: 'kpi-avg-moisture',
      title: 'Average Soil Moisture',
      value: `${averageMoisture}%`,
      subtitle: 'Mean Incline Saturation',
      statusColor: 'text-[#2B6CB0] dark:text-[#63B3ED]',
      icon: Droplets,
      iconBg: 'bg-[#2B6CB0]/10 text-[#2B6CB0] dark:bg-[#2B6CB0]/20 dark:text-[#63B3ED]',
      badge: 'Field Mean'
    },
    {
      id: 'kpi-network-avail',
      title: 'Network Availability',
      value: `${networkAvailability}%`,
      subtitle: 'LoRa Packet Reliability',
      statusColor: 'text-[#38A169] dark:text-[#48BB78]',
      icon: Radio,
      iconBg: 'bg-[#38A169]/10 text-[#38A169] dark:bg-[#38A169]/20 dark:text-[#48BB78]',
      badge: 'SF7 Link'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
      {cards.map(card => {
        const IconComponent = card.icon;
        return (
          <Card key={card.id} className="flex flex-col justify-between p-3.5 sm:p-4 min-w-0">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[11px] sm:text-xs font-medium text-[#718096] dark:text-[#A0AEC0] truncate">
                  {card.title}
                </span>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${card.iconBg}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="text-xl sm:text-2xl font-bold font-heading text-[#1A202C] dark:text-white tracking-tight">
                {card.value}
              </div>

              <div className="text-[11px] text-[#718096] dark:text-[#A0AEC0] mt-1 flex items-center gap-1 truncate">
                <span className={`font-semibold ${card.statusColor}`}>{card.subtitle}</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between text-[10px] text-[#A0AEC0]">
              <span className="font-semibold text-[#718096] dark:text-[#A0AEC0]">{card.badge}</span>
              <span className="italic">Demo / Simulated</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ReportKpiGrid;
