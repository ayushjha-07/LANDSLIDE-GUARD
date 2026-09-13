import React from 'react';
import Card from '../common/Card';
import { PROTOTYPE_HARDWARE_LIST } from '../../data/mockDeviceData';

export const HardwareArchitectureCard = () => {
  return (
    <Card 
      title="Prototype Hardware Architecture" 
      subtitle="Complete physical IoT stack from multi-sensor edge probes to cloud analytics"
      className="w-full min-w-0"
    >
      <div className="mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 mb-3">
          End-to-End IoT Pipeline (Prototype Architecture)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748]">
            <div className="font-bold text-[#1A202C] dark:text-white">Environmental Sensors</div>
            <div className="text-[10px] text-[#718096] mt-0.5">Soil, Rain, Tilt, Vibration</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748]">
            <div className="font-bold text-[#1A202C] dark:text-white">ESP32 MCU</div>
            <div className="text-[10px] text-[#718096] mt-0.5">Sampling &amp; ADC Filtering</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748]">
            <div className="font-bold text-[#1A202C] dark:text-white">LoRa SX1276</div>
            <div className="text-[10px] text-[#718096] mt-0.5">868.1 MHz RF Uplink</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748]">
            <div className="font-bold text-[#1A202C] dark:text-white">LoRa Gateway</div>
            <div className="text-[10px] text-[#718096] mt-0.5">EDGE-GW-01 Concentrator</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0E131F] border border-[#E2E8F0] dark:border-[#2D3748] col-span-2 sm:col-span-1">
            <div className="font-bold text-[#1A202C] dark:text-white">Cloud / Dashboard</div>
            <div className="text-[10px] text-[#718096] mt-0.5">AI Risk &amp; Early Warning</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#718096] dark:text-slate-400 mb-3">
          Prototype Hardware Components &amp; Sensor Specifications
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PROTOTYPE_HARDWARE_LIST.map((item, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E131F]/50 border border-[#E2E8F0] dark:border-[#2D3748] text-xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-[#1A202C] dark:text-white font-heading">{item.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-forest-50 dark:bg-forest-950/60 text-forest-700 dark:text-nature-400">
                  {item.category}
                </span>
              </div>
              <div className="text-[11px] font-medium text-forest-600 dark:text-nature-300 mb-1">
                {item.role}
              </div>
              <p className="text-[11px] text-[#718096] dark:text-slate-400 leading-relaxed">
                {item.specs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HardwareArchitectureCard;
