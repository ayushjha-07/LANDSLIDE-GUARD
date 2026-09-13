import React from 'react';
import DeviceCard from './DeviceCard';

export const DeviceGrid = ({ devices = [], onViewDetails }) => {
  if (devices.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-white dark:bg-[#1A202C] border border-[#E2E8F0] dark:border-[#2D3748] shadow-soft">
        <p className="text-sm font-semibold text-[#1A202C] dark:text-white">
          No sensor nodes match your filter criteria.
        </p>
        <p className="text-xs text-[#718096] dark:text-slate-400 mt-1">
          Try clearing your search terms or resetting the filter parameters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0">
      {devices.map((device) => (
        <DeviceCard 
          key={device.id} 
          device={device} 
          onViewDetails={onViewDetails} 
        />
      ))}
    </div>
  );
};

export default DeviceGrid;
