import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';
import Card from '../common/Card';
import { LORA_NETWORK_DATA } from '../../data/dashboardData';

export const LoraNetworkCard = () => {
  return (
    <Card 
      title="LoRa Communication" 
      subtitle="Sub-GHz RF telemetry link integrity"
      className="min-w-0 flex flex-col justify-between"
      action={
        <span className="text-[11px] font-mono text-forest-600 dark:text-nature-400 font-bold bg-forest-50 dark:bg-forest-950 px-2 py-0.5 rounded">
          {LORA_NETWORK_DATA.frequency}
        </span>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-stone-50 dark:bg-forest-950/60 border border-stone-200/70 dark:border-forest-800/60">
          <div>
            <span className="text-[10px] text-stone-400 block">Gateway</span>
            <strong className="text-stone-900 dark:text-white font-mono text-xs">{LORA_NETWORK_DATA.gateway}</strong>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block">Status</span>
            <span className="text-nature-600 dark:text-nature-400 font-bold text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-nature-500" /> Online
            </span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block">Nodes Connected</span>
            <strong className="text-stone-900 dark:text-white font-mono text-xs">{LORA_NETWORK_DATA.connectedNodes}</strong>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block">Success Rate</span>
            <strong className="text-nature-600 dark:text-nature-400 font-mono text-xs">{LORA_NETWORK_DATA.packetSuccess}</strong>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs px-1">
          <span>Total Packets: <strong className="font-mono text-stone-800 dark:text-stone-200">{LORA_NETWORK_DATA.packetsReceived}</strong></span>
          <span>RF Signal: <strong className="text-nature-600 dark:text-nature-400">{LORA_NETWORK_DATA.signal}</strong></span>
        </div>

        <div className="h-28 w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={LORA_NETWORK_DATA.qualityTrend}>
              <Line type="monotone" dataKey="rate" stroke="#52b788" strokeWidth={2} dot={{ r: 2 }} name="Packet Success (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="pt-2 border-t border-stone-100 dark:border-forest-900/50 flex items-center justify-between text-[11px] text-stone-400">
          <span>Spreading Factor: SF7 &bull; Bandwidth: 125 kHz</span>
          <span className="font-mono text-amber-500">Simulated Network Data</span>
        </div>
      </div>
    </Card>
  );
};

export default LoraNetworkCard;
