import React from 'react';
import Card from '../common/Card';
import { MapPin, Shield, Radio, Bell } from 'lucide-react';

export const MonitoringSummaryCard = ({ summary }) => {
  const {
    area = 'Mountain Slope Monitoring Zone',
    nodes = 8,
    online = 7,
    offline = 1,
    currentRisk = 'LOW',
    activeAlerts = 2,
    gateway = 'Online'
  } = summary || {};

  return (
    <Card className="p-4 sm:p-5 flex flex-col justify-between space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Monitoring Summary
          </h2>
        </div>
        <span className="text-xs font-semibold text-[#38A169] dark:text-[#48BB78] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#38A169] animate-ping" />
          Active Guard
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Monitoring Area:</span>
          <span className="font-semibold text-[#1A202C] dark:text-white">{area}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Total Nodes:</span>
          <span className="font-mono font-bold text-[#1A202C] dark:text-white">{nodes}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Online Nodes:</span>
          <span className="font-mono font-bold text-[#38A169] dark:text-[#48BB78]">{online}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Offline Nodes:</span>
          <span className="font-mono font-bold text-[#DC2626] dark:text-[#F87171]">{offline} (Node 06)</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Current Overall Risk:</span>
          <span className="font-bold text-[#38A169] dark:text-[#48BB78]">{currentRisk}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Active Alerts:</span>
          <span className="font-mono font-bold text-[#EA580C]">{activeAlerts}</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F7FAFC] dark:bg-[#0E131F]/60">
          <span className="text-[#718096] dark:text-[#A0AEC0]">Central Gateway:</span>
          <span className="font-bold text-[#2B6CB0] dark:text-[#63B3ED]">{gateway}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-[11px] text-[#718096] dark:text-[#A0AEC0] italic">
        Real-time telemetry heartbeat: Sub-3s synchronization
      </div>
    </Card>
  );
};

export default MonitoringSummaryCard;
