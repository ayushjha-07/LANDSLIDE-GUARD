import React from 'react';
import { Radio } from 'lucide-react';
import Card from '../common/Card';

export const NetworkTopologyCard = ({ devices = [] }) => {
  return (
    <Card 
      title="LoRa Network Topology" 
      subtitle="Point-to-multipoint RF topology routing 8 sensor stations into central gateway"
      action={
        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-[#718096] dark:text-slate-400">
          Illustrative LoRa topology
        </span>
      }
      className="w-full min-w-0"
    >
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-[#0E131F]/70 border border-[#E2E8F0] dark:border-[#2D3748] relative overflow-hidden">
        <div className="relative w-full max-w-2xl mx-auto py-6">
          <div className="grid grid-cols-3 sm:grid-cols-5 items-center gap-4 text-center">
            {/* Left Column: Nodes 01, 02, 03, 04 */}
            <div className="space-y-3">
              {['Node 01', 'Node 02', 'Node 03', 'Node 04'].map((id) => {
                const node = devices.find(d => d.id === id) || { status: 'Online' };
                const isOnline = node.status?.toLowerCase() === 'online';
                return (
                  <div 
                    key={id} 
                    className={"p-2.5 rounded-xl border text-xs transition-all shadow-soft " + (
                      isOnline 
                        ? 'bg-white dark:bg-[#1A202C] border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white' 
                        : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900/60 text-red-600'
                    )}
                  >
                    <div className="font-mono font-bold">{id}</div>
                    <div className="text-[10px] text-[#718096] dark:text-slate-400">{isOnline ? 'Active Uplink' : 'Signal Lost'}</div>
                  </div>
                );
              })}
            </div>

            {/* Left Connecting Beams */}
            <div className="hidden sm:flex flex-col justify-around h-full py-4 text-forest-500/60 dark:text-nature-400/60 font-bold">
              <span className="text-xl">&rarr;</span>
              <span className="text-xl">&rarr;</span>
              <span className="text-xl">&rarr;</span>
              <span className="text-xl">&rarr;</span>
            </div>

            {/* Central Gateway */}
            <div className="p-4 rounded-3xl bg-white dark:bg-[#1A202C] border-2 border-forest-500 dark:border-nature-400 shadow-xl flex flex-col items-center justify-center space-y-2 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-forest-600 text-white flex items-center justify-center shadow-md">
                <Radio className="w-7 h-7 animate-pulse" />
              </div>
              <div className="font-bold font-heading text-sm sm:text-base text-[#1A202C] dark:text-white">
                EDGE-GW-01
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                ● Gateway Online
              </span>
              <span className="text-[10px] font-mono text-[#718096] dark:text-slate-400">
                868.1 MHz ISM
              </span>
            </div>

            {/* Right Connecting Beams */}
            <div className="hidden sm:flex flex-col justify-around h-full py-4 text-forest-500/60 dark:text-nature-400/60 font-bold">
              <span className="text-xl">&larr;</span>
              <span className="text-xl text-red-500 font-bold">&times;</span>
              <span className="text-xl">&larr;</span>
              <span className="text-xl">&larr;</span>
            </div>

            {/* Right Column: Nodes 05, 06, 07, 08 */}
            <div className="space-y-3">
              {['Node 05', 'Node 06', 'Node 07', 'Node 08'].map((id) => {
                const node = devices.find(d => d.id === id) || { status: id === 'Node 06' ? 'Offline' : 'Online' };
                const isOnline = node.status?.toLowerCase() === 'online';
                return (
                  <div 
                    key={id} 
                    className={"p-2.5 rounded-xl border text-xs transition-all shadow-soft " + (
                      isOnline 
                        ? 'bg-white dark:bg-[#1A202C] border-[#E2E8F0] dark:border-[#2D3748] text-[#1A202C] dark:text-white' 
                        : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900/60 text-red-700 dark:text-red-400'
                    )}
                  >
                    <div className="font-mono font-bold flex items-center justify-center gap-1">
                      {id}
                      {!isOnline && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </div>
                    <div className="text-[10px] text-[#718096] dark:text-slate-400">{isOnline ? 'Active Uplink' : 'Connection Lost'}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#718096] dark:text-slate-400 text-center italic mt-2">
          Node 06 displays a disconnected link due to RF packet loss on 868.1 MHz. Other 7 stations maintain direct star topology uplinks.
        </p>
      </div>
    </Card>
  );
};

export default NetworkTopologyCard;
