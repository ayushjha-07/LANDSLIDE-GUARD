import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import Card from '../common/Card';
import { ShieldAlert, Info } from 'lucide-react';

export const RiskHistoryChart = ({ data = [] }) => {
  return (
    <Card className="p-4 sm:p-5 flex flex-col space-y-4 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] dark:border-[#2D3748] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#2B6CB0] dark:text-[#63B3ED]" />
            <h2 className="text-base sm:text-lg font-bold font-heading text-[#1A202C] dark:text-white">
              Risk History
            </h2>
          </div>
          <p className="text-xs text-[#718096] dark:text-[#A0AEC0] mt-0.5">
            Geotechnical landslide hazard evolution with standard threshold classification zones
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2B6CB0]"></span>
            <span className="text-[#4A5568] dark:text-[#CBD5E0]">Average Risk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C]"></span>
            <span className="text-[#4A5568] dark:text-[#CBD5E0]">Peak Risk (Node 05)</span>
          </div>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="riskHistoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2B6CB0" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2B6CB0" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="peakHistoryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EA580C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EA580C" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" opacity={0.6} />
            <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} />
            <YAxis domain={[0, 100]} stroke="#718096" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1A202C',
                borderColor: '#2D3748',
                borderRadius: '0.75rem',
                color: '#fff',
                fontSize: '12px'
              }}
              formatter={(val, name) => [
                `${val} / 100`,
                name === 'riskScore' ? 'Average Risk' : 'Peak Risk (Node 05)'
              ]}
            />
            {/* Reference threshold lines */}
            <ReferenceLine y={25} stroke="#38A169" strokeDasharray="3 3" label={{ value: 'Safe / Warning (25)', fill: '#38A169', fontSize: 10, position: 'insideTopLeft' }} />
            <ReferenceLine y={50} stroke="#D97706" strokeDasharray="3 3" label={{ value: 'Warning / High Risk (50)', fill: '#D97706', fontSize: 10, position: 'insideTopLeft' }} />
            <ReferenceLine y={75} stroke="#DC2626" strokeDasharray="3 3" label={{ value: 'High / Critical (75)', fill: '#DC2626', fontSize: 10, position: 'insideTopLeft' }} />

            <Area 
              type="monotone" 
              dataKey="node05Risk" 
              name="node05Risk"
              stroke="#EA580C" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#peakHistoryGradient)" 
            />
            <Area 
              type="monotone" 
              dataKey="riskScore" 
              name="riskScore"
              stroke="#2B6CB0" 
              strokeWidth={2.5} 
              fillOpacity={1} 
              fill="url(#riskHistoryGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#718096] dark:text-[#A0AEC0] pt-2 border-t border-[#E2E8F0] dark:border-[#2D3748]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#2B6CB0] flex-shrink-0" />
          <span>Regional slope hazard remains well within Safe baseline (24/100) outside of Zone C creep.</span>
        </div>
        <span className="italic text-[11px] self-end sm:self-auto">Simulated risk time series</span>
      </div>
    </Card>
  );
};

export default RiskHistoryChart;
