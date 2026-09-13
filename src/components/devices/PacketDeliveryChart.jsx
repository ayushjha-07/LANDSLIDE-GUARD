import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import Card from '../common/Card';
import { PACKET_DELIVERY_SERIES } from '../../data/mockDeviceData';

export const PacketDeliveryChart = () => {
  return (
    <Card 
      title="Packet Delivery" 
      subtitle="Packets received, transmitted and dropped over the last 24 hours"
      action={
        <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
          Last 24 Hours
        </span>
      }
      className="w-full min-w-0"
    >
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={PACKET_DELIVERY_SERIES} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="time" stroke="#718096" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#718096" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(26, 32, 44, 0.95)', 
                borderColor: '#2D3748', 
                borderRadius: '0.75rem',
                fontSize: '12px',
                color: '#fff'
              }} 
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="received" name="Packets Received" fill="#2B6CB0" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="sent" name="Packets Sent" fill="#38BDF8" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="dropped" name="Dropped" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PacketDeliveryChart;
