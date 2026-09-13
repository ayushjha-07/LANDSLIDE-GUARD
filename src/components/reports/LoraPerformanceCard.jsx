import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import Card from '../common/Card';
import { Radio, Signal, CheckCircle2, AlertCircle } from 'lucide-react';
import { LORA_SIGNAL_QUALITY_24H } from '../../data/mockHistoricalData';
import { COMMUNICATION_STATS, GATEWAY_INFO } from '../../data/mockDeviceData';

export const LoraPerformanceCard = () => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
          <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
            LoRa Communication Performance
          </h2>
        </div>
        <span className="text-xs text-[#718096] dark:text-[#A0AEC0]">
          Gateway: {GATEWAY_INFO.id} ({GATEWAY_INFO.status})
        </span>
      </div>

      {/* 5 KPI Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Packet Success</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#38A169] dark:text-[#48BB78] mt-0.5 block">
            {COMMUNICATION_STATS.packetSuccess}%
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Average RSSI</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white mt-0.5 block">
            {COMMUNICATION_STATS.avgRssi} dBm
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Average SNR</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white mt-0.5 block">
            {COMMUNICATION_STATS.avgSnr} dB
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748]">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Connected Nodes</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#2B6CB0] dark:text-[#63B3ED] mt-0.5 block">
            7 / 8
          </span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7FAFC] dark:bg-[#0E131F]/60 border border-[#E2E8F0] dark:border-[#2D3748] col-span-2 sm:col-span-1">
          <span className="text-[11px] text-[#718096] dark:text-[#A0AEC0] block">Dropped Packets</span>
          <span className="text-base sm:text-lg font-bold font-heading text-[#EA580C] dark:text-[#F97316] mt-0.5 block">
            {COMMUNICATION_STATS.dropped}
          </span>
        </div>
      </div>

      {/* 24-Hour Signal Quality Chart */}
      <div className="space-y-1.5">
        <span className="text-xs font-semibold text-[#1A202C] dark:text-white uppercase tracking-wider block">
          Signal Quality — 24 Hours (Average RSSI in dBm)
        </span>
        <div className="h-56 sm:h-60 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={LORA_SIGNAL_QUALITY_24H} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="loraRssiGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2B6CB0" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#2B6CB0" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
              <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} />
              <YAxis domain={[-90, -60]} stroke="#718096" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A202C',
                  borderColor: '#2D3748',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
                formatter={(val) => [`${val} dBm`, 'RSSI']}
              />
              <ReferenceLine y={-75} stroke="#38A169" strokeDasharray="3 3" label={{ value: 'Strong Link (-75 dBm)', fill: '#38A169', fontSize: 10 }} />
              <Area 
                type="monotone" 
                dataKey="rssi" 
                stroke="#2B6CB0" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#loraRssiGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748] flex items-center justify-between text-xs text-[#718096] dark:text-[#A0AEC0]">
        <span>Spreading Factor: SF7 | Bandwidth: 125 kHz</span>
        <span className="italic text-[11px]">Simulated LoRa data</span>
      </div>
    </Card>
  );
};

export default LoraPerformanceCard;
