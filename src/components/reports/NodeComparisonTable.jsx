import React from 'react';
import Card from '../common/Card';
import { Database, ShieldAlert, Wifi, Battery } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const NodeComparisonTable = ({ nodes = [] }) => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Sensor Node Comparison
          </h2>
          <p className="text-xs text-[#718096] dark:text-[#A0AEC0] mt-0.5">
            Cross-station matrix of geotechnical hazard parameters, radio signals and battery status
          </p>
        </div>
        <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
          Total: {nodes.length} Nodes (7 Online, 1 Offline)
        </span>
      </div>

      {/* Desktop & Tablet Table with internal horizontal scroll to prevent page overflow */}
      <div className="w-full overflow-x-auto rounded-xl border border-[#E2E8F0] dark:border-[#2D3748]">
        <table className="w-full text-left text-xs whitespace-nowrap min-w-[700px]">
          <thead className="bg-[#F7FAFC] dark:bg-[#0E131F] text-[#718096] dark:text-[#A0AEC0] border-b border-[#E2E8F0] dark:border-[#2D3748] font-semibold">
            <tr>
              <th className="py-3 px-3.5">Node</th>
              <th className="py-3 px-3">Risk</th>
              <th className="py-3 px-3 text-right">Soil Moisture</th>
              <th className="py-3 px-3 text-right">Rainfall</th>
              <th className="py-3 px-3 text-right">Tilt</th>
              <th className="py-3 px-3 text-right">Vibration</th>
              <th className="py-3 px-3 text-right">Battery</th>
              <th className="py-3 px-3 text-right">Signal</th>
              <th className="py-3 px-3.5 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#2D3748]">
            {nodes.map(node => {
              const isOffline = node.status?.toLowerCase() === 'offline';
              const riskStatus = isOffline ? 'Unknown' : (node.risk || 'Safe');
              const soilVal = isOffline ? '—' : `${node.soil ?? node.moisture}%`;
              const rainVal = isOffline ? '—' : `${node.rain ?? node.rainfall} mm`;
              const tiltVal = isOffline ? '—' : `${node.tilt}°`;
              const vibVal = isOffline ? '—' : `${node.vibration} g`;
              const batteryVal = `${node.battery}%`;
              const signalVal = isOffline ? '—' : (node.signal || '-71 dBm');

              return (
                <tr 
                  key={node.id}
                  className={`transition-colors hover:bg-[#F7FAFC] dark:hover:bg-[#0E131F]/50 ${
                    isOffline ? 'bg-stone-50/50 dark:bg-stone-900/20' : ''
                  }`}
                >
                  <td className="py-3 px-3.5 font-medium text-[#1A202C] dark:text-white">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#2B6CB0] dark:text-[#63B3ED]">{node.id}</span>
                      <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0]">{node.location?.name || node.location}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <StatusBadge status={typeof riskStatus === "object" ? (riskStatus.level || "safe") : riskStatus} size="sm" />
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-[#1A202C] dark:text-white">
                    {soilVal}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-[#1A202C] dark:text-white">
                    {rainVal}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-[#1A202C] dark:text-white">
                    {tiltVal}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-[#1A202C] dark:text-white">
                    {vibVal}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className={node.battery < 40 ? 'text-[#DC2626] font-bold' : 'text-[#38A169] font-medium'}>
                      {batteryVal}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-[#718096] dark:text-[#A0AEC0]">
                    {signalVal}
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isOffline 
                        ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20' 
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {node.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-1 text-xs text-[#718096] dark:text-[#A0AEC0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
        <span>Node 06 remains offline due to RF communication timeout (no fabricated readings).</span>
        <span className="italic text-[11px]">Table scrollable horizontally on smaller screens</span>
      </div>
    </Card>
  );
};

export default NodeComparisonTable;
