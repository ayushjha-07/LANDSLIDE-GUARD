import React from 'react';
import Card from '../common/Card';
import { AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const NodeRiskRankingCard = ({ rankedNodes = [] }) => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#EA580C] dark:text-[#F97316]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            Highest-Risk Nodes
          </h2>
        </div>
        <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
          Ranked by Severity
        </span>
      </div>

      <div className="space-y-2.5">
        {rankedNodes.map((node, index) => {
          const isTop1 = index === 0;
          const isTop2 = index === 1;
          const isOffline = node.status?.toLowerCase() === 'offline';

          return (
            <div
              key={node.id}
              className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                isTop1 
                  ? 'bg-orange-500/10 border-orange-500/30 text-[#1A202C] dark:text-white' 
                  : isTop2 
                  ? 'bg-amber-500/10 border-amber-500/30 text-[#1A202C] dark:text-white' 
                  : 'bg-[#F7FAFC] dark:bg-[#0E131F]/60 border-[#E2E8F0] dark:border-[#2D3748]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                  isTop1 
                    ? 'bg-[#EA580C] text-white' 
                    : isTop2 
                    ? 'bg-[#D97706] text-white' 
                    : 'bg-[#E2E8F0] dark:bg-[#2D3748] text-[#718096] dark:text-[#CBD5E0]'
                }`}>
                  {index + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#1A202C] dark:text-white">{node.id}</span>
                    <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0]">({node.location?.name || node.location})</span>
                  </div>
                  <span className="text-[10px] text-[#718096] dark:text-[#A0AEC0]">
                    {isOffline ? 'Offline — No telemetry' : `Moisture: ${node.soil ?? node.moisture}% | Tilt: ${node.tilt}°`}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs sm:text-sm font-bold font-mono block">
                    {isOffline ? '— / 100' : `${node.riskScore || 18} / 100`}
                  </span>
                  <StatusBadge status={isOffline ? 'offline' : (node.risk?.level || node.risk || 'safe')} size="sm" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] text-xs text-[#718096] dark:text-[#A0AEC0] flex items-center justify-between">
        <span>Node 05 exhibits peak risk due to 29mm precipitation surge.</span>
        <span className="italic text-[11px]">Dynamic shared risk state</span>
      </div>
    </Card>
  );
};

export default NodeRiskRankingCard;
