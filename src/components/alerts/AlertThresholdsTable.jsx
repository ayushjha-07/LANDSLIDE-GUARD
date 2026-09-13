import React from 'react';
import Card from '../common/Card';
import { ALERT_THRESHOLDS } from '../../utils/riskCalculator';

export const AlertThresholdsTable = () => {
  return (
    <Card 
      title="Alert Thresholds" 
      subtitle="Centralized geotechnical classification limits"
      className="p-4 sm:p-5"
    >
      <div className="pt-1 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-50 dark:bg-forest-900/60 text-stone-500 dark:text-stone-400 font-mono uppercase text-[10px] tracking-wider border-b border-stone-200/80 dark:border-forest-800/80">
            <tr>
              <th scope="col" className="py-2.5 px-3">Risk Level</th>
              <th scope="col" className="py-2.5 px-3 text-right">Score</th>
              <th scope="col" className="py-2.5 px-3">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-forest-800/50 bg-white dark:bg-forest-950/40 font-mono">
            {ALERT_THRESHOLDS.map(th => (
              <tr key={th.level} className="hover:bg-stone-50/60 dark:hover:bg-forest-900/20 transition-colors">
                <td className="py-2.5 px-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${th.badge}`}>
                    {th.level}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-stone-900 dark:text-white whitespace-nowrap">
                  {th.score}
                </td>
                <td className="py-2.5 px-3 font-sans text-[11px] text-stone-600 dark:text-stone-300">
                  {th.meaning}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-2.5 italic">
        Synchronized with AI Risk Engine algorithm in <code>src/utils/riskCalculator.js</code>.
      </p>
    </Card>
  );
};

export default AlertThresholdsTable;
