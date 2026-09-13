import React from 'react';
import { Radio, Activity, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import Card from '../common/Card';
import { GATEWAY_INFO, COMMUNICATION_STATS } from '../../data/mockDeviceData';

export const GatewayOverviewCard = () => {
  return (
    <Card className="w-full min-w-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Gateway Identity & Hardware Status (7 cols) */}
        <div className="lg:col-span-7 space-y-4 min-w-0">
          <div className="flex items-start justify-between gap-3 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-forest-50 dark:bg-forest-950/60 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-600 dark:text-nature-400 shadow-sm flex-shrink-0">
                <Radio className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold font-heading text-[#1A202C] dark:text-white truncate">
                    LoRa Gateway
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-xs font-mono text-forest-700 dark:text-nature-400 mt-0.5 truncate">
                  Gateway ID: {GATEWAY_INFO.id} &bull; {GATEWAY_INFO.location}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] dark:text-slate-400 block truncate">
                Connected Nodes
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-[#1A202C] dark:text-white">
                {GATEWAY_INFO.connectedNodes}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] dark:text-slate-400 block truncate">
                Signal Quality
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-forest-600 dark:text-nature-400">
                {GATEWAY_INFO.signalQuality}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] dark:text-slate-400 block truncate">
                Uptime
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                {GATEWAY_INFO.uptime}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#718096] dark:text-slate-400 block truncate">
                Last Comm
              </span>
              <span className="text-base sm:text-lg font-bold font-mono text-[#1A202C] dark:text-white">
                {GATEWAY_INFO.lastCommunication}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-[#718096] dark:text-slate-400">
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Freq: {GATEWAY_INFO.frequency}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">SF: {GATEWAY_INFO.spreadingFactor}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">BW: {GATEWAY_INFO.bandwidth}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">TX: {GATEWAY_INFO.txPower}</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">Gain: {GATEWAY_INFO.antennaGain}</span>
          </div>
        </div>

        {/* Right Column: Communication Statistics (5 cols) */}
        <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-[#F7FAFC] dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] space-y-3 min-w-0">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] dark:border-[#2D3748]/60 pb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-forest-600 dark:text-nature-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A202C] dark:text-white">
                Communication Statistics
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold font-mono">
              {COMMUNICATION_STATS.packetSuccess}% Success
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[#718096] dark:text-slate-400 text-[11px] block flex items-center gap-1">
                <ArrowDownLeft className="w-3 h-3 text-emerald-500" /> Packets Received
              </span>
              <span className="text-base font-bold font-mono text-[#1A202C] dark:text-white">
                {COMMUNICATION_STATS.packetsReceived.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[#718096] dark:text-slate-400 text-[11px] block flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-forest-500" /> Packets Sent
              </span>
              <span className="text-base font-bold font-mono text-[#1A202C] dark:text-white">
                {COMMUNICATION_STATS.packetsSent.toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[#718096] dark:text-slate-400 text-[11px] block">Dropped / Retried</span>
              <span className="text-base font-bold font-mono text-red-600 dark:text-red-400">
                {COMMUNICATION_STATS.dropped}
              </span>
            </div>
            <div>
              <span className="text-[#718096] dark:text-slate-400 text-[11px] block">Average RSSI / SNR</span>
              <span className="text-base font-bold font-mono text-[#1A202C] dark:text-white">
                {COMMUNICATION_STATS.avgRssi} dBm <span className="text-xs text-[#718096] font-normal">({COMMUNICATION_STATS.avgSnr} dB)</span>
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#718096] dark:text-slate-400 italic pt-1 border-t border-[#E2E8F0] dark:border-[#2D3748]/60">
            {COMMUNICATION_STATS.label}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default GatewayOverviewCard;
